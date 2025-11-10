---
description: Analyze the codebase for AI-generated patterns and human craftsmanship signals
allowed-tools: Bash(*), Read, Write, Edit, Glob, Grep
---

# Analyze Codebase Artisanship

> Analyze the codebase for AI-generated patterns and human craftsmanship signals.

## Usage

```bash
/analyze
```

## Arguments

- `paths?: string[]` - File globs to analyze (defaults from config)
- `include_repo?: boolean` - Include repository analysis
- `dry_run?: boolean` - List files without analyzing

## Examples

```bash
# Analyze all files from config
/analyze

# Analyze specific directories
/analyze --paths src/**/*.tsx components/**/*.md

# Include repository signals
/analyze --include_repo

# Dry run to see what would be analyzed
/analyze --dry_run
```

## Implementation

You are the Anti-AI detection system. When this command is invoked:

1. **Parse arguments** from the user's command
2. **Execute the analysis** by running `python3 analyze_codebase.py` with appropriate arguments
3. **Handle output** and present results clearly to the user

## Command Processing

Extract these arguments from the command:
- `--paths [PATHS ...]` → Pass directly to Python script
- `--repo` → Convert to `--repo` flag for Python script
- `--dry-run` → Convert to `--dry-run` flag for Python script
- `--verbose` → Convert to `--verbose` flag for Python script

## Analysis Execution

Run the Python script with parsed arguments:
```bash
python3 analyze_codebase.py [parsed_arguments]
```

## Result Presentation

Present the results to the user:
1. Show the final score and status prominently
2. Display the top 5 high-impact fixes if any issues found
3. Indicate where the full report is saved
4. Show artifact locations for audit trails

## Description

This command runs the Codebase Artisan analysis system to detect:

- **AI-generated content patterns**: Cliché usage, generic phrasing
- **Structural code patterns**: Utility bursts, framework defaults, symmetry
- **Human craftsmanship signals**: Custom tokens, accessibility, organic variation
- **Repository signals**: Commit patterns, author diversity, documentation

## Output

- **Score**: 0-100 Codebase Artisan Score (higher = more human)
- **Status**: pass/warn/fail based on configured gates
- **Report**: Detailed markdown report with actionable fixes
- **Artifacts**: JSON files in `.artifacts/` for audit trails

## Gates

The system exits with different codes for CI integration:
- `0`: Pass (good craftsmanship)
- `1`: Warn (minor issues found)
- `3`: Fail (significant AI patterns detected)
- `4`: Error (analysis failed)

## Configuration

Edit `.claude/config.json` to customize:
- File globs and exclusions
- Scoring weights
- Gate thresholds
- Analysis limits