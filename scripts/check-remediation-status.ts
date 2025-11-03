#!/usr/bin/env node

/**
 * Remediation Status Checker
 *
 * Usage: node scripts/check-remediation-status.ts
 *
 * This script provides a comprehensive view of remediation progress
 * across all domains and phases.
 */

import fs from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface RemediationStatus {
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
  byDomain: Record<string, DomainStatus>;
  byPhase: Record<string, PhaseStatus>;
  bySeverity: Record<string, number>;
}

interface DomainStatus {
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
  progress: number;
}

interface PhaseStatus {
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
  progress: number;
  deadline: string;
}

class RemediationStatusChecker {
  private findingsPath: string;
  private traceabilityPath: string;

  constructor() {
    this.findingsPath = path.join(process.cwd(), 'issues', 'Findings.md');
    this.traceabilityPath = path.join(process.cwd(), 'issues', 'traceability.csv');
  }

  async generateReport(): Promise<RemediationStatus> {
    console.log('📊 Generating remediation status report...\n');

    const findings = this.parseFindings();
    const traceability = this.parseTraceability();

    const status = this.calculateStatus(findings, traceability);

    this.displayReport(status);
    this.generateRecommendations(status);

    return status;
  }

  private parseFindings(): any[] {
    console.log('📋 Parsing findings document...');

    if (!fs.existsSync(this.findingsPath)) {
      throw new Error('Findings.md not found. Run remediation analysis first.');
    }

    const content = fs.readFileSync(this.findingsPath, 'utf8');
    const lines = content.split('\n');
    const findings: any[] = [];

    let currentFinding: Partial<any> = {};

    for (const line of lines) {
      const headerMatch = line.match(/^### \[([A-Z]+)-(\d+)\]: (.+)$/);
      if (headerMatch) {
        if (currentFinding.id) {
          findings.push(currentFinding);
        }

        currentFinding = {
          id: `${headerMatch[1]}-${headerMatch[2]}`,
          domain: this.mapToDomain(headerMatch[1]),
          description: headerMatch[3],
          status: 'TODO'
        };
        continue;
      }

      const fieldMatch = line.match(/^- \*\*([^*]+)\*\*: (.+)$/);
      if (fieldMatch && currentFinding.id) {
        const [, field, value] = fieldMatch;
        switch (field.toLowerCase()) {
          case 'severity':
            currentFinding.severity = value.match(/P(\d)/)?.[0] || 'P3';
            break;
          case 'status':
            currentFinding.status = value;
            break;
          case 'estimated hours':
            currentFinding.estimatedHours = value;
            break;
        }
      }
    }

    if (currentFinding.id) {
      findings.push(currentFinding);
    }

    console.log(`✅ Parsed ${findings.length} findings`);
    return findings;
  }

  private parseTraceability(): Map<string, any> {
    console.log('📊 Parsing traceability data...');

    const traceability = new Map();

    if (!fs.existsSync(this.traceabilityPath)) {
      console.warn('⚠️ Traceability CSV not found. Using default status.');
      return traceability;
    }

    const content = fs.readFileSync(this.traceabilityPath, 'utf8');
    const lines = content.split('\n').slice(1); // Skip header

    for (const line of lines) {
      if (line.trim()) {
        const cols = line.split(',');
        traceability.set(cols[0], {
          status: cols[4] || 'TODO',
          prLink: cols[5] || '',
          testIds: cols[6] || '',
          evidenceLink: cols[7] || '',
          lastUpdated: cols[9] || ''
        });
      }
    }

    console.log(`✅ Parsed ${traceability.size} traceability records`);
    return traceability;
  }

  private calculateStatus(findings: any[], traceability: Map<string, any>): RemediationStatus {
    const status: RemediationStatus = {
      total: findings.length,
      completed: 0,
      inProgress: 0,
      todo: 0,
      byDomain: {},
      byPhase: {},
      bySeverity: {}
    };

    // Initialize domain and phase tracking
    const domains = ['security', 'privacy', 'accessibility', 'architecture', 'performance', 'dependencies', 'dead-code', 'ux-ui', 'testing'];
    const phases = {
      'Phase 1': { total: 0, completed: 0, inProgress: 0, todo: 0, deadline: '72 hours' },
      'Phase 2': { total: 0, completed: 0, inProgress: 0, todo: 0, deadline: '2 weeks' },
      'Phase 3': { total: 0, completed: 0, inProgress: 0, todo: 0, deadline: '4 weeks' },
      'Phase 4': { total: 0, completed: 0, inProgress: 0, todo: 0, deadline: '3 months' }
    };

    // Initialize domain tracking
    domains.forEach(domain => {
      status.byDomain[domain] = {
        total: 0,
        completed: 0,
        inProgress: 0,
        todo: 0,
        progress: 0
      };
    });

    // Process each finding
    for (const finding of findings) {
      const traceData = traceability.get(finding.id);
      const currentStatus = traceData?.status || finding.status || 'TODO';

      // Update overall status
      if (currentStatus === 'COMPLETED') {
        status.completed++;
      } else if (currentStatus === 'IN_PROGRESS') {
        status.inProgress++;
      } else {
        status.todo++;
      }

      // Update domain status
      if (status.byDomain[finding.domain]) {
        status.byDomain[finding.domain].total++;
        if (currentStatus === 'COMPLETED') {
          status.byDomain[finding.domain].completed++;
        } else if (currentStatus === 'IN_PROGRESS') {
          status.byDomain[finding.domain].inProgress++;
        } else {
          status.byDomain[finding.domain].todo++;
        }
      }

      // Update phase status
      const phase = this.getPhaseForFinding(finding);
      if (phase) {
        phases[phase].total++;
        if (currentStatus === 'COMPLETED') {
          phases[phase].completed++;
        } else if (currentStatus === 'IN_PROGRESS') {
          phases[phase].inProgress++;
        } else {
          phases[phase].todo++;
        }
      }

      // Update severity status
      const severity = finding.severity || 'P3';
      status.bySeverity[severity] = (status.bySeverity[severity] || 0) + 1;
    }

    // Calculate progress percentages
    Object.values(status.byDomain).forEach(domain => {
      domain.progress = domain.total > 0 ? Math.round((domain.completed / domain.total) * 100) : 0;
    });

    Object.entries(phases).forEach(([phase, data]) => {
      status.byPhase[phase] = {
        ...data,
        progress: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0
      };
    });

    return status;
  }

  private getPhaseForFinding(finding: any): string {
    const severity = finding.severity || 'P3';
    const domain = finding.domain;

    // Phase 1: Critical security and accessibility issues
    if (domain === 'security' && severity === 'P0') return 'Phase 1';
    if (domain === 'accessibility' && severity === 'P0') return 'Phase 1';

    // Phase 2: High-priority issues
    if (severity === 'P1') return 'Phase 2';
    if (domain === 'security' && severity === 'P2') return 'Phase 2';
    if (domain === 'privacy' && severity === 'P1') return 'Phase 2';

    // Phase 3: Medium priority issues
    if (severity === 'P2') return 'Phase 3';
    if (domain === 'architecture' && severity === 'P1') return 'Phase 3';

    // Phase 4: Low priority and cleanup
    return 'Phase 4';
  }

  private displayReport(status: RemediationStatus): void {
    console.log('📈 REMEDIATION STATUS REPORT');
    console.log('=' .repeat(50));

    // Overall Progress
    const overallProgress = Math.round((status.completed / status.total) * 100);
    console.log(`\n🎯 OVERALL PROGRESS: ${overallProgress}%`);
    console.log(`   Total: ${status.total} issues`);
    console.log(`   Completed: ${status.completed} (${Math.round((status.completed / status.total) * 100)}%)`);
    console.log(`   In Progress: ${status.inProgress} (${Math.round((status.inProgress / status.total) * 100)}%)`);
    console.log(`   Todo: ${status.todo} (${Math.round((status.todo / status.total) * 100)}%)`);

    // Progress Bar
    this.displayProgressBar(overallProgress);

    // Status by Domain
    console.log('\n📊 STATUS BY DOMAIN:');
    console.log('-'.repeat(50));
    Object.entries(status.byDomain).forEach(([domain, data]) => {
      console.log(`${domain.padEnd(15)}: ${data.progress}% (${data.completed}/${data.total})`);
      this.displayProgressBar(data.progress, 20);
    });

    // Status by Phase
    console.log('\n🚀 STATUS BY PHASE:');
    console.log('-'.repeat(50));
    Object.entries(status.byPhase).forEach(([phase, data]) => {
      console.log(`${phase.padEnd(12)}: ${data.progress}% (${data.completed}/${data.total}) [Deadline: ${data.deadline}]`);
      this.displayProgressBar(data.progress, 20);
    });

    // Severity Distribution
    console.log('\n⚠️ SEVERITY DISTRIBUTION:');
    console.log('-'.repeat(30));
    Object.entries(status.bySeverity).forEach(([severity, count]) => {
      console.log(`${severity.padEnd(5)}: ${count} issues`);
    });

    console.log('\n' + '='.repeat(50));
  }

  private displayProgressBar(percentage: number, width: number = 40): void {
    const filled = Math.round((width * percentage) / 100);
    const empty = width - filled;

    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    console.log(`   [${bar}] ${percentage}%`);
  }

  private generateRecommendations(status: RemediationStatus): void {
    console.log('\n💡 RECOMMENDATIONS');
    console.log('-'.repeat(30));

    // Phase-specific recommendations
    if (status.byPhase['Phase 1']?.progress < 100) {
      console.log('🚨 Phase 1 (Emergency) incomplete:');
      console.log('   - Focus on P0 security issues first');
      console.log('   - Implement change freeze for other changes');
      console.log('   - Test rollback procedures immediately');
    }

    // Domain-specific recommendations
    if (status.byDomain['security']?.progress < 80) {
      console.log('🔒 Security remediation needs attention:');
      console.log('   - Prioritize remaining security issues');
      console.log('   - Conduct security audit after fixes');
    }

    // Progress recommendations
    if (status.completed / status.total < 0.5) {
      console.log('⚠️ Overall progress below 50%:');
      console.log('   - Consider allocating more resources');
      console.log('   - Focus on high-impact, low-effort items');
      console.log('   - Review and adjust timelines');
    }

    // Quality recommendations
    const inProgressRatio = status.inProgress / status.total;
    if (inProgressRatio > 0.3) {
      console.log('⚡ High number of in-progress items:');
      console.log('   - Focus on completing started work');
      console.log('   - Consider reducing work-in-progress');
      console.log('   - Review team capacity and allocation');
    }

    // Next steps
    console.log('\n📝 NEXT STEPS:');
    console.log('   1. Run: npm run remediation:create-issues');
    console.log('   2. Prioritize issues in GitHub Projects');
    console.log('   3. Work through issues by phase');
    console.log('   4. Update traceability.csv as you progress');
    console.log('   5. Run this report weekly to track progress');
  }

  private mapToDomain(prefix: string): string {
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
}

// Main execution
async function main() {
  const checker = new RemediationStatusChecker();

  try {
    await checker.generateReport();
    console.log('\n✅ Status report completed successfully!');
  } catch (error) {
    console.error('❌ Failed to generate status report:', error.message);
    process.exit(1);
  }
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

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default RemediationStatusChecker;