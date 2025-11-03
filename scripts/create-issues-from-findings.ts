#!/usr/bin/env node

/**
 * Create GitHub issues from Findings.md
 *
 * Usage: GH_TOKEN=your_github_token node scripts/create-issues-from-findings.ts
 *
 * Environment variables:
 * - GH_TOKEN: GitHub personal access token with repo:write access
 * - GITHUB_REPOSITORY: Repository in format "owner/repo" (defaults to current repo)
 */

import fs from 'node:fs';
import { execSync } from 'node:child_process';

interface Finding {
  id: string;
  domain: string;
  severity: string;
  description: string;
  evidence: string;
  impact: string;
  fixIdea: string;
  confidence: string;
  estimatedHours: string;
  status: string;
}

function parseFindings(): Finding[] {
  const content = fs.readFileSync('issues/Findings.md', 'utf8');
  const lines = content.split('\n');
  const findings: Finding[] = [];

  let currentFinding: Partial<Finding> = {};

  for (const line of lines) {
    // Match issue headers: ## [SEVERITY] Domain Issue: [Title]
    const headerMatch = line.match(/^### \[([A-Z]+)-(\d+)\]: (.+)$/);
    if (headerMatch) {
      if (currentFinding.id) {
        findings.push(currentFinding as Finding);
      }

      currentFinding = {
        id: `${headerMatch[1]}-${headerMatch[2]}`,
        domain: mapToDomain(headerMatch[1]),
        severity: '',
        description: headerMatch[3],
        evidence: '',
        impact: '',
        fixIdea: '',
        confidence: '',
        estimatedHours: '',
        status: 'TODO'
      };
      continue;
    }

    // Match field patterns: - **Field**: Value
    const fieldMatch = line.match(/^- \*\*([^*]+)\*\*: (.+)$/);
    if (fieldMatch && currentFinding.id) {
      const [, field, value] = fieldMatch;
      switch (field.toLowerCase()) {
        case 'severity':
          currentFinding.severity = value.match(/P(\d)/)?.[0] || 'P3';
          break;
        case 'evidence':
          currentFinding.evidence = value;
          break;
        case 'impact':
          currentFinding.impact = value;
          break;
        case 'fix idea':
          currentFinding.fixIdea = value;
          break;
        case 'confidence':
          currentFinding.confidence = value;
          break;
        case 'est. hours':
          currentFinding.estimatedHours = value;
          break;
      }
    }
  }

  // Don't forget the last finding
  if (currentFinding.id) {
    findings.push(currentFinding as Finding);
  }

  return findings;
}

function mapToDomain(prefix: string): string {
  const domainMap: { [key: string]: string } = {
    'SEC': 'security',
    'PRV': 'privacy',
    'ACC': 'accessibility',
    'ARCH': 'architecture',
    'PERF': 'performance',
    'DEP': 'dependencies',
    'DEAD': 'dead-code',
    'UX': 'ux-ui'
  };
  return domainMap[prefix] || 'other';
}

function getSeverityLevel(severity: string): string {
  return {
    'P0': 'P0 - Critical',
    'P1': 'P1 - High',
    'P2': 'P2 - Medium',
    'P3': 'P3 - Low'
  }[severity] || 'P3 - Low';
}

function getDomainLabels(domain: string): string[] {
  const labels = [domain];

  // Add severity label
  if (['security', 'privacy', 'accessibility', 'architecture'].includes(domain)) {
    labels.push('triage');
  }

  return labels;
}

function generateIssueBody(finding: Finding): string {
  return `## Finding ID
${finding.id}

## Severity
${getSeverityLevel(finding.severity)}

## Domain
${finding.domain}

## Description
### Problem
${finding.description}

### Evidence
${finding.evidence}

### Impact
${finding.impact}

## Solution
### Implementation Plan
${finding.fixIdea}

### Estimated Hours
${finding.estimatedHours}

### Confidence
${finding.confidence}

## Verification Steps
1. [ ] Test the implemented fix
2. [ ] Verify security/privacy/accessibility requirements are met
3. [ ] Run automated tests and ensure they pass
4. [ ] Manual testing of affected functionality

## Files to Modify
*To be determined during implementation*

## Dependencies
*To be determined during implementation*

---
*This issue was auto-generated from the codebase review findings document.*`;
}

function createGitHubIssue(finding: Finding): void {
  const repo = process.env.GITHUB_REPOSITORY || getCurrentRepository();
  const title = `[${finding.id}] ${finding.description}`;
  const body = generateIssueBody(finding).replace(/"/g, '\\"'); // Escape quotes
  const labels = getDomainLabels(finding.domain).map(l => `--label "${l}"`).join(' ');

  const cmd = `gh issue create --title "${title}" --body "${body}" ${labels}`;

  console.log(`Creating issue for ${finding.id}...`);
  console.log(`Command: ${cmd}`);

  try {
    const output = execSync(cmd, {
      encoding: 'utf8',
      stdio: 'pipe'
    });

    console.log(`✅ Created issue for ${finding.id}: ${output.trim()}`);

    // Update the traceability CSV
    updateTraceabilityCsv(finding.id, output.trim());

  } catch (error) {
    console.error(`❌ Failed to create issue for ${finding.id}:`, error.message);
  }
}

function getCurrentRepository(): string {
  try {
    const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    const match = remoteUrl.match(/github\.com[:/]([^/]+\/[^/.]+)\.git/);
    if (match) {
      return match[1];
    }
  } catch (error) {
    console.warn('Could not determine repository from git remote:', error.message);
  }

  throw new Error('Could not determine repository. Set GITHUB_REPOSITORY environment variable.');
}

function updateTraceabilityCsv(issueId: string, issueUrl: string): void {
  const csvPath = 'issues/traceability.csv';
  let content = '';

  if (fs.existsSync(csvPath)) {
    content = fs.readFileSync(csvPath, 'utf8');
  }

  const lines = content.split('\n');
  const headerLine = lines[0];
  const dataLines = lines.slice(1);

  const updatedLines = dataLines.map(line => {
    const cols = line.split(',');
    if (cols[0] === issueId) {
      cols[4] = issueUrl; // Update pr_link column with issue URL
      cols[5] = new Date().toISOString().split('T')[0]; // Update last_updated
    }
    return cols.join(',');
  });

  const updatedContent = [headerLine, ...updatedLines].join('\n');
  fs.writeFileSync(csvPath, updatedContent);

  console.log(`📝 Updated traceability.csv for ${issueId}`);
}

function main(): void {
  console.log('🚀 Starting GitHub issue creation from findings...\n');

  // Check for GitHub CLI
  try {
    execSync('gh --version', { stdio: 'pipe' });
  } catch (error) {
    console.error('❌ GitHub CLI not found. Please install it with:');
    console.error('   curl -fsSL https://cli.github.com/packages/github-cli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/github-cli-archive-keyring.gpg');
    console.error('   echo "deb [arch=amd64 signed-by=/usr/share/keyrings/github-cli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null');
    console.error('   sudo apt update');
    console.error('   sudo apt install gh');
    console.error('\nThen authenticate with: gh auth login');
    process.exit(1);
  }

  // Check for GitHub token
  if (!process.env.GH_TOKEN) {
    console.error('❌ GH_TOKEN environment variable not set.');
    console.error('   Create a personal access token at: https://github.com/settings/tokens');
    console.error('   Required scopes: repo');
    console.error('   Then run: GH_TOKEN=your_token node scripts/create-issues-from-findings.ts');
    process.exit(1);
  }

  // Parse findings
  const findings = parseFindings();
  console.log(`📋 Found ${findings.length} issues to create\n`);

  // Create issues
  let created = 0;
  for (const finding of findings) {
    if (finding.status === 'TODO') {
      createGitHubIssue(finding);
      created++;
    }
  }

  console.log(`\n✅ Created ${created} GitHub issues from findings document`);
  console.log('📊 Check the GitHub project board to organize issues');
  console.log('📝 The traceability.csv has been updated with issue URLs');
}

// Handle errors gracefully
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

if (require.main === module) {
  main();
}