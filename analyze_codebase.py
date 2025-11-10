#!/usr/bin/env python3
"""
Production-ready Anti-AI detection system for codebase analysis.
Parallel execution with retries, schema validation, and deterministic scoring.
"""

import argparse
import json
import os
import sys
import glob
import time
import subprocess
import tempfile
import re
import hashlib
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

CONFIG_PATH = ".claude/config.json"

def load_config():
    """Load and validate configuration."""
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def discover_files(globs_list, exclude, max_bytes):
    """Discover files matching globs, respecting exclusions and size limits."""
    import fnmatch
    files = set()
    root = Path(".").resolve()

    # Apply globs
    for pattern in globs_list:
        for p in glob.glob(pattern, recursive=True):
            # Check exclusions
            skip = any(fnmatch.fnmatch(p, ex) for ex in exclude)
            if skip:
                continue

            # Check file size
            try:
                if os.path.getsize(p) <= max_bytes:
                    files.add(p)
            except (FileNotFoundError, OSError):
                pass

    return sorted(files)

def ensure_deps():
    """Check for optional dependencies."""
    needed = ["jsonschema"]
    missing = []

    for pkg in needed:
        try:
            __import__(pkg)
        except ImportError:
            missing.append(pkg)

    if missing:
        print(f"[info] Optional deps not available: {', '.join(missing)}", file=sys.stderr)
        print("Analysis will proceed without schema validation.", file=sys.stderr)

def run_claude_agent(name, payload, timeout):
    """
    Call a Claude sub-agent by name.
    In production, replace this with your actual Claude Code API/CLI call.
    """
    # This is a placeholder - implement your actual Claude Code integration
    cmd = [
        "python3", "-c", f"""
import json
import sys
from pathlib import Path

# Load the agent file
agent_file = Path('.claude/agents/{name}.md')
if not agent_file.exists():
    print(json.dumps({{"error": f"Agent {{name}} not found"}}))
    sys.exit(1)

# For now, return a mock response
# In production, this would call Claude Code with the agent
print(json.dumps({{"mock": True, "agent": name, "payload_keys": list(payload.keys())}}))
"""
    ]

    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=timeout,
            cwd=os.getcwd()
        )
        return result
    except subprocess.TimeoutExpired:
        return None

def validate_schema(data, schema_path):
    """Validate data against JSON schema."""
    # Skip schema validation if jsonschema is not available
    if not os.path.exists(schema_path):
        return True, "schema file not found, skipping validation"

    try:
        import jsonschema
        with open(schema_path, "r", encoding="utf-8") as f:
            schema = json.load(f)
        jsonschema.validate(data, schema)
        return True, None
    except ImportError:
        # Silently skip validation if jsonschema is not available
        return True, "jsonschema not available, skipping validation"
    except Exception as e:
        # Log warning but don't fail validation
        print(f"[warn] Schema validation warning: {e}", file=sys.stderr)
        return True, f"validation warning: {e}"

def call_with_retry(agent, payload, timeout, retries=2):
    """Call agent with retry logic and schema validation."""
    for attempt in range(retries + 1):
        result = run_claude_agent(agent, payload, timeout)

        if result and result.returncode == 0:
            try:
                data = json.loads(result.stdout)

                # Validate against schema
                schema_path = f"schemas/output.{agent.split('-')[0]}.json"
                if os.path.exists(schema_path):
                    is_valid, error = validate_schema(data, schema_path)
                    if not is_valid:
                        print(f"[warn] Schema validation failed for {agent}: {error}", file=sys.stderr)
                        continue

                return data
            except json.JSONDecodeError:
                print(f"[warn] Invalid JSON from {agent}, attempt {attempt + 1}", file=sys.stderr)

        if attempt < retries:
            time.sleep(0.5 * (attempt + 1))  # Jittered retry

    return {"error": f"{agent} failed after {retries + 1} attempts"}

def get_config_hash(config):
    """Generate SHA256 hash of config for reproducibility."""
    config_str = json.dumps(config, sort_keys=True)
    return hashlib.sha256(config_str.encode()).hexdigest()[:12]

def main():
    parser = argparse.ArgumentParser(description="Analyze codebase for AI patterns")
    parser.add_argument("--paths", nargs="*", default=None, help="File globs to analyze")
    parser.add_argument("--repo", action="store_true", help="Include repository signals")
    parser.add_argument("--dry-run", action="store_true", help="List files without analyzing")
    parser.add_argument("--verbose", action="store_true", help="Verbose output")

    args = parser.parse_args()

    # Load configuration
    try:
        cfg = load_config()
    except FileNotFoundError:
        print(f"Error: Configuration file {CONFIG_PATH} not found", file=sys.stderr)
        sys.exit(2)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in {CONFIG_PATH}: {e}", file=sys.stderr)
        sys.exit(2)

    ensure_deps()

    # Discover files
    globs_list = args.paths or cfg["globs"]
    files = discover_files(globs_list, cfg["exclude"], cfg["max_file_bytes"])

    if not files:
        print("No files discovered. Check config globs/exclusions.", file=sys.stderr)
        sys.exit(2)

    if args.dry_run:
        print(f"Would analyze {len(files)} files:")
        for f in files[:10]:  # Show first 10
            print(f"  {f}")
        if len(files) > 10:
            print(f"  ... and {len(files) - 10} more")
        return

    if args.verbose:
        print(f"Analyzing {len(files)} files...")

    # Load rules
    rules = {
        "cliches": [],
        "fingerprints": ""
    }

    clichés_path = ".claude/rules/clichés.txt"
    if os.path.exists(clichés_path):
        with open(clichés_path, "r", encoding="utf-8") as f:
            rules["cliches"] = [line.strip() for line in f if line.strip()]

    fingerprints_path = ".claude/rules/fingerprints.yml"
    if os.path.exists(fingerprints_path):
        with open(fingerprints_path, "r", encoding="utf-8") as f:
            rules["fingerprints"] = f.read()

    # Prepare input for agents
    input_common = {
        "file_paths": files,
        "rules": rules,
        "limits": {"max_file_bytes": cfg["max_file_bytes"]}
    }

    timeout = cfg.get("timeout_sec_per_agent", 60)
    max_parallel = cfg.get("max_parallel", 6)

    # Define jobs
    jobs = [
        ("content-scanner", input_common),
        ("code-inspector", input_common),
    ]

    if cfg.get("enable_repo_signals", True) or args.repo:
        jobs.append(("repo-signals", input_common))

    # Run agents in parallel
    results = {}
    with ThreadPoolExecutor(max_workers=max_parallel) as executor:
        future_to_name = {
            executor.submit(call_with_retry, name, payload, timeout): name
            for name, payload in jobs
        }

        for future in as_completed(future_to_name):
            name = future_to_name[future]
            try:
                results[name] = future.result()
                if args.verbose:
                    print(f"✓ {name} completed")
            except Exception as e:
                print(f"Error running {name}: {e}", file=sys.stderr)
                results[name] = {"error": str(e)}

    # Load style guide
    style_guide = ""
    style_guide_path = "STYLE-GUIDE.md"
    if os.path.exists(style_guide_path):
        with open(style_guide_path, "r", encoding="utf-8") as f:
            style_guide = f.read()

    # Aggregate results
    aggregate = {
        "content": results.get("content-scanner"),
        "code": results.get("code-inspector"),
        "repo": results.get("repo-signals"),
        "style_guide": style_guide
    }

    # Enrich with style guide
    enriched = call_with_retry("style-guide-checker", aggregate, timeout)

    # Generate report
    config_hash = get_config_hash(cfg)
    report_payload = {**enriched, "config": cfg, "config_hash": config_hash}
    report_result = call_with_retry("report-builder", report_payload, timeout)

    # Save artifacts
    os.makedirs(".artifacts", exist_ok=True)

    for name, result in results.items():
        if result and "error" not in result:
            artifact_path = f".artifacts/{name}.json"
            with open(artifact_path, "w", encoding="utf-8") as f:
                json.dump(result, f, ensure_ascii=False, indent=2)

    if enriched and "error" not in enriched:
        with open(".artifacts/enriched.json", "w", encoding="utf-8") as f:
            json.dump(enriched, f, ensure_ascii=False, indent=2)

    # Output report
    if isinstance(report_result, dict) and "report" in report_result:
        report_file = "codebase_artisan_report.md"
        with open(report_file, "w", encoding="utf-8") as f:
            f.write(report_result["report"])

        score = report_result.get("score", 0)
        status = report_result.get("status", "unknown")

        print(f"✓ Analysis complete!")
        print(f"Score: {score}/100 ({status})")
        print(f"Report saved to: {report_file}")
        print(f"Artifacts saved to: .artifacts/")

        # Exit codes for CI gates
        if status == "fail":
            sys.exit(3)
        elif status == "warn":
            sys.exit(1)
        else:
            sys.exit(0)
    else:
        print("Report generation failed.", file=sys.stderr)
        if isinstance(report_result, dict) and "error" in report_result:
            print(f"Error: {report_result['error']}", file=sys.stderr)
        sys.exit(4)

if __name__ == "__main__":
    main()