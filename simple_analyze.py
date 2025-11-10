#!/usr/bin/env python3
"""
Simplified Anti-AI detection analysis that works without external dependencies.
"""

import json
import os
import re
import sys
import glob
from pathlib import Path
from collections import defaultdict

# AI detection patterns
CLICHES = [
    "revolutionary", "game-changing", "cutting-edge", "state-of-the-art",
    "seamless", "robust", "innovative", "transformative", "paradigm shift",
    "synergy", "leveraging", "empower", "unlock potential", "next-generation"
]

GENERIC_PHRASES = [
    "in today's digital world", "we provide", "our solution", "best in class",
    "industry leading", "world class", "state of the art", "cutting edge technology"
]

AI_CSS_PATTERNS = [
    r"bg-blue-\d{2,3}",  # Generic blue colors
    r"rounded-full",      # Perfect circles
    r"shadow-\w+",        # Default shadows
    r"space-y-\d+",       # Uniform spacing
    r"gap-\d+",           # Uniform gaps
]

HUMAN_SIGNALS = [
    "custom-", "variant", "asymmetric", "organic", "handcrafted",
    "bespoke", "tailored", "unique", "authentic", "genuine"
]

def analyze_file(file_path):
    """Analyze a single file for AI patterns."""
    issues = []
    signals = []

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check for cliches in text files
        if file_path.endswith(('.md', '.txt', '.tsx', '.jsx')):
            for cliche in CLICHES:
                if cliche.lower() in content.lower():
                    issues.append({
                        "type": "cliche",
                        "pattern": cliche,
                        "severity": "medium",
                        "suggestion": f"Replace '{cliche}' with specific evidence or metrics"
                    })

            # Check for human signals
            for signal in HUMAN_SIGNALS:
                if signal.lower() in content.lower():
                    signals.append({
                        "type": "human_signal",
                        "pattern": signal,
                        "impact": "positive"
                    })

        # Check for AI CSS patterns in style files
        if file_path.endswith(('.css', '.scss', '.tsx', '.jsx')):
            for pattern in AI_CSS_PATTERNS:
                matches = re.findall(pattern, content)
                if matches:
                    issues.append({
                        "type": "generic_css",
                        "pattern": pattern,
                        "count": len(matches),
                        "severity": "low",
                        "suggestion": f"Consider custom tokens instead of {matches[0]}"
                    })

        # Check for generic class names
        generic_classes = re.findall(r'className="[^"]*\b(container|wrapper|section|component)\b[^"]*"', content)
        if generic_classes:
            issues.append({
                "type": "generic_naming",
                "pattern": "generic component names",
                "count": len(generic_classes),
                "severity": "low",
                "suggestion": "Use semantic, descriptive component names"
            })

    except Exception as e:
        print(f"[warn] Could not analyze {file_path}: {e}", file=sys.stderr)

    return issues, signals

def analyze_repository():
    """Analyze repository patterns."""
    repo_signals = {
        "author_entropy": 0.0,
        "commit_cadence": "unknown",
        "documentation_quality": "medium",
        "human_score": 0.0
    }

    try:
        # Check for documentation
        doc_files = ["README.md", "STYLE-GUIDE.md", "CONTRIBUTING.md", "CHANGELOG.md"]
        found_docs = [f for f in doc_files if os.path.exists(f)]
        repo_signals["documentation_quality"] = "high" if len(found_docs) >= 3 else "medium" if len(found_docs) >= 1 else "low"

        # Check for design system files
        design_files = ["DESIGN-TOKENS.md", "theme.tsx", "colors.ts"]
        if any(os.path.exists(f) for f in design_files):
            repo_signals["human_score"] += 1.0

        # Check for test files
        test_patterns = ["**/*.test.*", "**/*.spec.*", "**/__tests__/**"]
        test_count = 0
        for pattern in test_patterns:
            test_count += len(glob.glob(pattern, recursive=True))
        if test_count > 0:
            repo_signals["human_score"] += 0.5

    except Exception as e:
        print(f"[warn] Repository analysis failed: {e}", file=sys.stderr)

    return repo_signals

def calculate_score(issues, signals, repo_signals):
    """Calculate the overall AI-likeness score."""
    # Base score starts at 50 (neutral)
    score = 50.0

    # Subtract points for issues (higher score = more human)
    for issue in issues:
        if issue["severity"] == "high":
            score -= 5
        elif issue["severity"] == "medium":
            score -= 3
        elif issue["severity"] == "low":
            score -= 1

    # Add points for human signals
    score += len(signals) * 2

    # Add points for repository humanity
    score += repo_signals.get("human_score", 0) * 5

    # Clamp between 0-100
    return max(0, min(100, score))

def generate_report(files_analysis, repo_signals, overall_score):
    """Generate a markdown report."""

    # Count all issues
    all_issues = []
    all_signals = []

    for file_path, (issues, signals) in files_analysis.items():
        for issue in issues:
            issue["file"] = file_path
            all_issues.append(issue)
        for signal in signals:
            signal["file"] = file_path
            all_signals.append(signal)

    # Determine status
    if overall_score >= 80:
        status = "pass"
    elif overall_score >= 60:
        status = "warn"
    else:
        status = "fail"

    report = f"""# Codebase Artisan Report

**Score:** {overall_score:.1f}/100 ({status.upper()})

## Executive Summary

Your codebase shows {'strong' if overall_score >= 80 else 'moderate' if overall_score >= 60 else 'limited'} evidence of human craftsmanship.
{'Keep up the excellent work!' if overall_score >= 80 else 'Consider addressing the issues below to improve craftsmanship.'}

## Key Metrics

- **Files Analyzed:** {len(files_analysis)}
- **Issues Found:** {len(all_issues)}
- **Human Signals:** {len(all_signals)}
- **Documentation Quality:** {repo_signals.get('documentation_quality', 'unknown').upper()}

"""

    if all_issues:
        # Sort issues by severity
        severity_order = {"high": 0, "medium": 1, "low": 2}
        all_issues.sort(key=lambda x: severity_order.get(x["severity"], 3))

        report += "## Top Issues Found\n\n"
        for i, issue in enumerate(all_issues[:10], 1):
            report += f"### {i}. {issue['type'].replace('_', ' ').title()} in `{issue['file']}`\n"
            report += f"- **Pattern:** `{issue.get('pattern', 'N/A')}`\n"
            report += f"- **Severity:** {issue['severity'].upper()}\n"
            report += f"- **Suggestion:** {issue.get('suggestion', 'Review this pattern')}\n\n"

    if all_signals:
        report += "## Human Craftsmanship Signals ✨\n\n"
        for signal in all_signals[:10]:
            report += f"- **{signal['pattern']}** in `{signal['file']}`\n"
        report += "\n"

    report += f"""## Repository Analysis

- **Documentation:** {repo_signals.get('documentation_quality', 'unknown').title()} quality
- **Design System:** {'Present' if repo_signals.get('human_score', 0) > 0 else 'Not detected'}
- **Test Coverage:** {'Tests present' if repo_signals.get('human_score', 0) > 0.5 else 'No tests found'}

## Recommendations

1. **Replace generic phrases** with specific, evidence-based language
2. **Use custom design tokens** instead of default framework values
3. **Add more documentation** to improve knowledge sharing
4. **Implement comprehensive testing** for better code quality

## Next Steps

{'Excellent work! Continue focusing on human-centered design patterns.' if overall_score >= 80 else 'Review the issues above and implement the suggested changes to improve codebase craftsmanship.'}

---

*Report generated on {os.popen('date').read().strip()}*
"""

    return report, status

def main():
    import argparse

    parser = argparse.ArgumentParser(description="Simplified AI analysis for codebases")
    parser.add_argument("--paths", nargs="*", default=None, help="File patterns to analyze")
    parser.add_argument("--verbose", action="store_true", help="Verbose output")
    parser.add_argument("--dry-run", action="store_true", help="List files without analyzing")

    args = parser.parse_args()

    # File patterns to analyze
    if args.paths:
        file_patterns = args.paths
    else:
        file_patterns = [
            "app/**/*.{js,ts,tsx,jsx,css,scss,html,md}",
            "components/**/*.{js,ts,tsx,jsx,css,scss}",
            "*.md",
            "*.json"
        ]

    # Discover files
    files = set()
    for pattern in file_patterns:
        files.update(glob.glob(pattern, recursive=True))

    files = sorted([f for f in files if os.path.isfile(f)])

    if not files:
        print("No files found to analyze.", file=sys.stderr)
        sys.exit(1)

    if args.dry_run:
        print(f"Would analyze {len(files)} files:")
        for f in files[:10]:
            print(f"  {f}")
        if len(files) > 10:
            print(f"  ... and {len(files) - 10} more")
        return

    if args.verbose:
        print(f"Analyzing {len(files)} files...")

    # Analyze files
    files_analysis = {}
    for file_path in files:
        if args.verbose:
            print(f"  Analyzing {file_path}")
        issues, signals = analyze_file(file_path)
        if issues or signals:
            files_analysis[file_path] = (issues, signals)

    # Analyze repository
    repo_signals = analyze_repository()

    # Calculate score
    all_issues = []
    all_signals = []
    for issues, signals in files_analysis.values():
        all_issues.extend(issues)
        all_signals.extend(signals)

    overall_score = calculate_score(all_issues, all_signals, repo_signals)

    # Generate report
    report, status = generate_report(files_analysis, repo_signals, overall_score)

    # Save report
    report_file = "codebase_artisan_report.md"
    with open(report_file, "w", encoding="utf-8") as f:
        f.write(report)

    # Save artifacts
    os.makedirs(".artifacts", exist_ok=True)
    with open(".artifacts/analysis.json", "w", encoding="utf-8") as f:
        json.dump({
            "files_analysis": {k: {"issues": v[0], "signals": v[1]} for k, v in files_analysis.items()},
            "repo_signals": repo_signals,
            "score": overall_score,
            "status": status
        }, f, indent=2)

    print(f"✓ Analysis complete!")
    print(f"Score: {overall_score:.1f}/100 ({status.upper()})")
    print(f"Report saved to: {report_file}")
    print(f"Artifacts saved to: .artifacts/")

    # Exit codes for CI
    if status == "fail":
        sys.exit(3)
    elif status == "warn":
        sys.exit(1)
    else:
        sys.exit(0)

if __name__ == "__main__":
    main()