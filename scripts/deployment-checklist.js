#!/usr/bin/env node

/**
 * Comprehensive Deployment Checklist
 * Ensures all quality gates pass before deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkSection(title) {
  log(`\n${colors.bold}=== ${title} ===${colors.reset}`);
}

function checkItem(description, checkFn) {
  try {
    const result = checkFn();
    if (result) {
      log(`✅ ${description}`, 'green');
      return true;
    } else {
      log(`❌ ${description}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ ${description} - ${error.message}`, 'red');
    return false;
  }
}

function checkWarning(description, checkFn) {
  try {
    const result = checkFn();
    if (result) {
      log(`⚠️  ${description}`, 'yellow');
      return true;
    } else {
      log(`✅ ${description}`, 'green');
      return false;
    }
  } catch (error) {
    log(`⚠️  ${description} - ${error.message}`, 'yellow');
    return true;
  }
}

// Run deployment checklist
async function runDeploymentChecklist() {
  log(`${colors.bold}🚀 Deployment Checklist for DataBuildDirect${colors.reset}`);
  log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  log(`Branch: ${getCurrentBranch()}`);
  log(`Last commit: ${getLastCommit()}`);

  let totalChecks = 0;
  let passedChecks = 0;
  let warningCount = 0;

  // 1. Code Quality Checks
  checkSection('📝 Code Quality');

  totalChecks++; if (checkItem('TypeScript compilation passes', () => {
    execSync('npm run type-check', { stdio: 'pipe' });
    return true;
  })) passedChecks++;

  totalChecks++; if (checkItem('ESLint checks pass', () => {
    execSync('npm run lint', { stdio: 'pipe' });
    return true;
  })) passedChecks++;

  totalChecks++; if (checkItem('Prettier formatting is consistent', () => {
    execSync('npm run format:check', { stdio: 'pipe' });
    return true;
  })) passedChecks++;

  // 2. Security Checks
  checkSection('🔒 Security');

  totalChecks++; if (checkItem('No known vulnerabilities in dependencies', () => {
    const result = execSync('npm audit --audit-level=moderate --json', { encoding: 'utf8' });
    const audit = JSON.parse(result);
    return audit.metadata.vulnerabilities.low === 0 &&
           audit.metadata.vulnerabilities.moderate === 0 &&
           audit.metadata.vulnerabilities.high === 0 &&
           audit.metadata.vulnerabilities.critical === 0;
  })) passedChecks++;

  totalChecks++; if (checkWarning('Secrets check (.env files committed)', () => {
    const envFiles = ['.env', '.env.local', '.env.production'];
    return envFiles.some(file => {
      try {
        fs.accessSync(file);
        return true;
      } catch {
        return false;
      }
    });
  })) warningCount++;

  // 3. Testing Requirements
  checkSection('🧪 Testing');

  totalChecks++; if (checkItem('Unit tests pass with coverage', () => {
    execSync('npm run test:coverage', { stdio: 'pipe' });
    return true;
  })) passedChecks++;

  totalChecks++; if (checkItem('E2E tests pass', () => {
    execSync('npm run test:e2e:ci', { stdio: 'pipe' });
    return true;
  })) passedChecks++;

  totalChecks++; if (checkItem('Accessibility tests pass', () => {
    execSync('npm run test:accessibility', { stdio: 'pipe' });
    return true;
  })) passedChecks++;

  // 4. Build & Performance
  checkSection('⚡ Build & Performance');

  totalChecks++; if (checkItem('Production build succeeds', () => {
    execSync('NEXT_PUBLIC_ENVIRONMENT=production npm run build', { stdio: 'pipe' });
    return true;
  })) passedChecks++;

  totalChecks++; if (checkWarning('Bundle size check', () => {
    const buildDir = path.join(__dirname, '..', '.next');
    const stats = JSON.parse(fs.readFileSync(path.join(buildDir, 'stats.json'), 'utf8'));
    return stats.totalSize > 1000000; // Warn if over 1MB
  })) warningCount++;

  // 5. Database & Migrations
  checkSection('🗄️  Database');

  totalChecks++; if (checkItem('Database migrations are up to date', () => {
    execSync('npm run supabase:status', { stdio: 'pipe' });
    return true;
  })) passedChecks++;

  // 6. Environment Configuration
  checkSection('⚙️  Environment');

  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_KEY',
    'STRIPE_PUBLISHABLE_KEY',
    'STRIPE_SECRET_KEY'
  ];

  requiredEnvVars.forEach(varName => {
    totalChecks++; if (checkItem(`Environment variable ${varName} is set`, () => {
      return process.env[varName] && process.env[varName] !== '';
    })) passedChecks++;
  });

  // 7. Monitoring & Observability
  checkSection('📊 Monitoring');

  totalChecks++; if (checkWarning('Sentry DSN configured', () => {
    return !process.env.SENTRY_DSN || process.env.SENTRY_DSN === '';
  })) warningCount++;

  // 8. Documentation
  checkSection('📚 Documentation');

  totalChecks++; if (checkWarning('CHANGELOG updated', () => {
    const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md');
    try {
      const changelog = fs.readFileSync(changelogPath, 'utf8');
      return !changelog.includes('## [Unreleased]');
    } catch {
      return true;
    }
  })) warningCount++;

  // 9. Compliance & Legal
  checkSection('⚖️  Compliance');

  totalChecks++; if (checkItem('Privacy policy exists', () => {
    const privacyPath = path.join(__dirname, '..', 'app', 'privacy', 'page.tsx');
    return fs.existsSync(privacyPath);
  })) passedChecks++;

  totalChecks++; if (checkItem('Terms of service exists', () => {
    const termsPath = path.join(__dirname, '..', 'app', 'terms', 'page.tsx');
    return fs.existsSync(termsPath);
  })) passedChecks++;

  // 10. Deployment Readiness
  checkSection('🚀 Deployment Readiness');

  totalChecks++; if (checkItem('No uncommitted changes', () => {
    try {
      execSync('git diff-index --quiet HEAD --', { stdio: 'pipe' });
      return true;
    } catch {
      return false;
    }
  })) passedChecks++;

  totalChecks++; if (checkItem('On correct branch', () => {
    const branch = getCurrentBranch();
    return ['main', 'master', 'develop'].includes(branch);
  })) passedChecks++;

  // Summary
  log('\n' + '='.repeat(50));
  log(`${colors.bold}📋 DEPLOYMENT CHECKLIST SUMMARY${colors.reset}`);
  log('=' * 50);
  log(`Total Checks: ${totalChecks}`);
  log(`Passed: ${colors.green}${passedChecks}${colors.reset}`);
  log(`Warnings: ${colors.yellow}${warningCount}${colors.reset}`);
  log(`Failed: ${colors.red}${totalChecks - passedChecks}${colors.reset}`);
  log(`Success Rate: ${((passedChecks / totalChecks) * 100).toFixed(1)}%`);
  log('=' * 50);

  if (totalChecks - passedChecks === 0) {
    if (warningCount === 0) {
      log('\n🎉 All checks passed! Ready for deployment!', 'green');
      return 0;
    } else {
      log('\n⚠️  All critical checks passed, but some warnings detected. Review before deployment.', 'yellow');
      return 1;
    }
  } else {
    log('\n❌ Critical issues found. Fix before deployment.', 'red');
    log(`\nRun the following to fix common issues:`, 'yellow');
    log('  npm run lint:fix    # Fix linting issues');
    log('  npm run format     # Format code');
    log('  npm test           # Run tests');
    log('  npm audit fix      # Fix security issues');
    return 1;
  }
}

function getCurrentBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
}

function getLastCommit() {
  try {
    return execSync('git log -1 --pretty=format:"%h %s"', { encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
}

// Main execution
if (require.main === module) {
  runDeploymentChecklist()
    .then(exitCode => {
      process.exit(exitCode);
    })
    .catch(error => {
      log(`\n💥 Deployment checklist failed with error: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = { runDeploymentChecklist };