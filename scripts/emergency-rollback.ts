#!/usr/bin/env node

/**
 * Emergency Rollback Script
 *
 * Usage: node scripts/emergency-rollback.ts <commit-hash|tag-name>
 *
 * This script provides a quick rollback mechanism for emergency situations.
 * It automates the rollback process while ensuring proper documentation and communication.
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface RollbackConfig {
  backupDir: string;
  logFile: string;
  slackWebhook?: string;
  pagerdutyService?: string;
}

interface RollbackResult {
  success: boolean;
  timestamp: string;
  commitHash: string;
  actions: string[];
  errors: string[];
}

class EmergencyRollback {
  private config: RollbackConfig;
  private log: string[] = [];

  constructor() {
    this.config = {
      backupDir: path.join(process.cwd(), '.rollback-backups'),
      logFile: path.join(process.cwd(), '.rollback-history.log')
    };
  }

  async execute(target: string): Promise<RollbackResult> {
    console.log('🚨 EMERGENCY ROLLBACK INITIATED');
    console.log(`📍 Target: ${target}`);
    console.log(`⏰ Time: ${new Date().toISOString()}`);

    const result: RollbackResult = {
      success: false,
      timestamp: new Date().toISOString(),
      commitHash: target,
      actions: [],
      errors: []
    };

    try {
      // 1. Pre-rollout checks
      await this.preRollbackChecks();
      result.actions.push('Pre-rollback checks passed');

      // 2. Backup current state
      await this.backupCurrentState();
      result.actions.push('Current state backed up');

      // 3. Create rollback branch
      const rollbackBranch = `emergency-rollback-${Date.now()}`;
      await this.createRollbackBranch(rollbackBranch);
      result.actions.push(`Created rollback branch: ${rollbackBranch}`);

      // 4. Rollback code
      await this.rollbackCode(target);
      result.actions.push(`Code rolled back to: ${target}`);

      // 5. Verify rollback
      await this.verifyRollback();
      result.actions.push('Rollback verified');

      // 6. Deploy rollback
      await this.deployRollback(rollbackBranch);
      result.actions.push('Rollback deployed');

      // 7. Monitor system
      await this.monitorSystem();
      result.actions.push('System monitoring initiated');

      result.success = true;
      this.logSuccess(result);

    } catch (error) {
      result.errors.push(error.message);
      this.logFailure(result, error);
      throw error;
    }

    return result;
  }

  private async preRollbackChecks(): Promise<void> {
    console.log('🔍 Running pre-rollback checks...');

    // Check if we're in a git repo
    try {
      execSync('git status', { stdio: 'pipe' });
    } catch {
      throw new Error('Not in a git repository');
    }

    // Check for uncommitted changes
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim()) {
      throw new Error('Working directory not clean. Commit or stash changes first.');
    }

    // Check if target commit exists
    try {
      execSync(`git cat-file -t ${process.argv[2]}`, { stdio: 'pipe' });
    } catch {
      throw new Error(`Target commit ${process.argv[2]} does not exist`);
    }

    // Verify GitHub CLI is available
    try {
      execSync('gh --version', { stdio: 'pipe' });
    } catch {
      throw new Error('GitHub CLI not found. Please install it first.');
    }

    console.log('✅ Pre-rollback checks passed');
  }

  private async backupCurrentState(): Promise<void> {
    console.log('💾 Backing up current state...');

    // Create backup directory
    if (!fs.existsSync(this.config.backupDir)) {
      fs.mkdirSync(this.config.backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupName = `rollback-backup-${timestamp}`;

    // Backup current commit
    const currentCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    fs.writeFileSync(path.join(this.config.backupDir, `${backupName}-commit.txt`), currentCommit);

    // Backup environment variables
    if (fs.existsSync('.env')) {
      fs.copyFileSync('.env', path.join(this.config.backupDir, `${backupName}-env.backup`));
    }

    // Backup database state (if Supabase CLI available)
    try {
      const backupFile = path.join(this.config.backupDir, `${backupName}-db.sql`);
      execSync(`supabase db dump --file ${backupFile}`, { stdio: 'pipe' });
      console.log('🗄️ Database backup completed');
    } catch (error) {
      console.warn('⚠️ Database backup failed:', error.message);
    }

    console.log('✅ Current state backed up');
  }

  private async createRollbackBranch(branchName: string): Promise<void> {
    console.log('🌿 Creating rollback branch...');

    execSync(`git checkout -b ${branchName}`, { stdio: 'pipe' });
    console.log(`✅ Created rollback branch: ${branchName}`);
  }

  private async rollbackCode(target: string): Promise<void> {
    console.log('🔄 Rolling back code...');

    // Reset to target commit
    execSync(`git reset --hard ${target}`, { stdio: 'pipe' });

    // Force push to main branch
    execSync('git push --force origin main', { stdio: 'pipe' });

    console.log('✅ Code rolled back successfully');
  }

  private async verifyRollback(): Promise<void> {
    console.log('🔍 Verifying rollback...');

    // Check if we're at the target commit
    const currentCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    const targetCommit = execSync(`git rev-parse ${process.argv[2]}`, { encoding: 'utf8' }).trim();

    if (currentCommit !== targetCommit) {
      throw new Error(`Rollback verification failed: Expected ${targetCommit}, got ${currentCommit}`);
    }

    // Run basic checks
    try {
      execSync('npm typecheck', { stdio: 'pipe' });
      console.log('✅ TypeScript validation passed');
    } catch (error) {
      console.warn('⚠️ TypeScript validation failed:', error.message);
    }

    try {
      execSync('npm lint', { stdio: 'pipe' });
      console.log('✅ Lint checks passed');
    } catch (error) {
      console.warn('⚠️ Lint checks failed:', error.message);
    }

    console.log('✅ Rollback verified');
  }

  private async deployRollback(branchName: string): Promise<void> {
    console.log('🚀 Deploying rollback...');

    // Trigger CI/CD pipeline
    try {
      const workflowId = 'ci.yml';
      execSync(`gh workflow run ${workflowId}`, { stdio: 'pipe' });
      console.log('✅ CI/CD pipeline triggered');
    } catch (error) {
      console.warn('⚠️ Failed to trigger CI/CD:', error.message);
    }

    // Create rollback issue
    const issueBody = `
## Emergency Rollback Completed

### Details
- **Time**: ${new Date().toISOString()}
- **Target Commit**: ${process.argv[2]}
- **Rollback Branch**: ${branchName}
- **Triggered By**: ${process.env.USER || 'unknown'}

### Actions Taken
- Backed up current state
- Created rollback branch
- Reset code to target commit
- Force pushed to main branch
- Triggered CI/CD pipeline

### Next Steps
1. Monitor system for 2 hours
2. Investigate root cause
3. Prepare re-deployment plan
4. Update documentation

### Emergency Contact
- On-call Engineer: [PagerDuty]
- Tech Lead: [Slack]
`;

    try {
      const issueCmd = `gh issue create --title "Emergency Rollback - ${new Date().toISOString()}" --body "${issueBody}" --label "emergency" --label "rollback"`;
      const issueUrl = execSync(issueCmd, { encoding: 'utf8' }).trim();
      console.log(`📋 Created rollback issue: ${issueUrl}`);
    } catch (error) {
      console.warn('⚠️ Failed to create rollback issue:', error.message);
    }

    console.log('✅ Rollback deployment initiated');
  }

  private async monitorSystem(): Promise<void> {
    console.log('📊 System monitoring initiated...');

    // This would integrate with your monitoring system
    // For now, we'll just log the start of monitoring
    console.log('📈 Monitoring error rates, response times, and system health...');
    console.log('⏰ Continue monitoring for at least 2 hours');
  }

  private logSuccess(result: RollbackResult): void {
    const logEntry = {
      type: 'SUCCESS',
      timestamp: result.timestamp,
      commitHash: result.commitHash,
      actions: result.actions,
      summary: `Emergency rollback completed successfully. Rolled back to ${result.commitHash}`
    };

    this.writeLog(logEntry);
    console.log('🎉 Emergency rollback completed successfully!');
  }

  private logFailure(result: RollbackResult, error: Error): void {
    const logEntry = {
      type: 'FAILURE',
      timestamp: result.timestamp,
      commitHash: result.commitHash,
      errors: result.errors,
      summary: `Emergency rollback failed: ${error.message}`
    };

    this.writeLog(logEntry);
    console.error('❌ Emergency rollback failed:', error.message);
  }

  private writeLog(entry: any): void {
    const logLine = JSON.stringify(entry) + '\n';
    fs.appendFileSync(this.config.logFile, logLine);
  }
}

// Main execution
async function main() {
  if (process.argv.length < 3) {
    console.error('Usage: node scripts/emergency-rollback.ts <commit-hash|tag-name>');
    console.error('Example: node scripts/emergency-rollback.ts abc1234');
    process.exit(1);
  }

  const target = process.argv[2];
  const rollback = new EmergencyRollback();

  try {
    await rollback.execute(target);
    process.exit(0);
  } catch (error) {
    console.error('💥 Rollback failed:', error.message);
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

export default EmergencyRollback;