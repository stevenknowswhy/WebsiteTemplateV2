#!/usr/bin/env node

/**
 * Comprehensive E2E Test Runner
 * Runs different test suites with proper configuration and reporting
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// ANSI color codes for output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  log(`\n${'='.repeat(60)}`, 'cyan');
  log(`${title}`, 'bright');
  log(`${'='.repeat(60)}`, 'cyan');
}

function logTestResult(testName, passed, duration) {
  const status = passed ? '✅ PASS' : '❌ FAIL';
  const color = passed ? 'green' : 'red';
  const time = duration ? ` (${duration}ms)` : '';
  log(`  ${status} ${testName}${time}`, color);
}

function runCommand(command, options = {}) {
  const { timeout = 300000, silent = false } = options;

  log(`Running: ${command}`, 'blue');

  try {
    const startTime = Date.now();
    const output = execSync(command, {
      encoding: 'utf8',
      timeout,
      stdio: silent ? 'pipe' : 'inherit'
    });
    const duration = Date.now() - startTime;

    if (!silent) {
      logTestResult(command, true, duration);
    }

    return { success: true, output, duration };
  } catch (error) {
    const duration = error.status ? 'failed' : `${Date.now() - startTime}ms`;

    if (!silent) {
      logTestResult(command, false, duration);
    }

    return {
      success: false,
      error: error.message,
      output: error.stdout,
      duration
    };
  }
}

function ensureTestEnvironment() {
  logSection('Checking Test Environment');

  // Check if Node.js is available
  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    log(`Node.js: ${nodeVersion}`, 'green');
  } catch (error) {
    log('❌ Node.js is not installed or not in PATH', 'red');
    process.exit(1);
  }

  // Check if npm is available
  try {
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
    log(`npm: ${npmVersion}`, 'green');
  } catch (error) {
    log('❌ npm is not installed or not in PATH', 'red');
    process.exit(1);
  }

  // Check if Playwright is installed
  try {
    const playwrightVersion = execSync('npx playwright --version', { encoding: 'utf8' }).trim();
    log(`Playwright: ${playwrightVersion}`, 'green');
  } catch (error) {
    log('❌ Playwright is not installed', 'red');
    log('Run: npm install @playwright/test', 'yellow');
    process.exit(1);
  }

  // Check if browsers are installed
  try {
    execSync('npx playwright install --dry-run', { encoding: 'utf8' });
    log('✅ Playwright browsers are installed', 'green');
  } catch (error) {
    log('❌ Playwright browsers are not installed', 'red');
    log('Run: npx playwright install', 'yellow');
    process.exit(1);
  }
}

function runSmokeTests() {
  logSection('Running Smoke Tests');

  const result = runCommand('npx playwright test --project=chromium --grep @smoke', {
    timeout: 120000,
    silent: false
  });

  return result.success;
}

function runAccessibilityTests() {
  logSection('Running Accessibility Tests');

  const result = runCommand('npx playwright test --project=chromium --grep @a11y', {
    timeout: 180000,
    silent: false
  });

  return result.success;
}

function runAdminTests() {
  logSection('Running Admin Panel Tests');

  const result = runCommand('npx playwright test --project=chromium --grep @admin', {
    timeout: 240000,
    silent: false
  });

  return result.success;
}

function runPerformanceTests() {
  logSection('Running Performance Tests');

  const result = runCommand('npx playwright test --project=chromium --grep @performance', {
    timeout: 300000,
    silent: false
  });

  return result.success;
}

function runAPITests() {
  logSection('Running API Tests');

  const result = runCommand('npx playwright test --project=chromium --grep @api', {
    timeout: 180000,
    silent: false
  });

  return result.success;
}

function runResponsiveTests() {
  logSection('Running Responsive Design Tests');

  const result = runCommand('npx playwright test --project=mobile-chrome --grep @responsive', {
    timeout: 240000,
    silent: false
  });

  return result.success;
}

function runCrossBrowserTests() {
  logSection('Running Cross-Browser Tests');

  const browsers = ['firefox', 'webkit'];
  const results = [];

  for (const browser of browsers) {
    log(`Testing on ${browser}...`, 'blue');
    const result = runCommand(`npx playwright test --project=${browser} --grep "@smoke or @a11y"`, {
      timeout: 300000,
      silent: false
    });

    results.push({ browser, success: result.success });
  }

  return results;
}

function generateTestReport(results) {
  logSection('Test Report Summary');

  const totalTests = results.length;
  const passedTests = results.filter(r => r.success).length;
  const failedTests = totalTests - passedTests;

  log(`Total test suites: ${totalTests}`, 'blue');
  log(`Passed: ${passedTests}`, 'green');
  log(`Failed: ${failedTests}`, failedTests > 0 ? 'red' : 'green');

  const successRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
  log(`Success rate: ${successRate}%`, successRate === 100 ? 'green' : 'yellow');

  if (failedTests > 0) {
    log('\nFailed test suites:', 'red');
    results.filter(r => !r.success).forEach(r => {
      log(`  ❌ ${r.name}`, 'red');
    });
  }

  return { totalTests, passedTests, failedTests, successRate };
}

function main() {
  const args = process.argv.slice(2);
  const testType = args[0] || 'all';

  log('🎭 Forhem PBC E2E Test Runner', 'bright');
  log(`Running tests: ${testType}`, 'blue');

  // Ensure test environment is ready
  ensureTestEnvironment();

  const results = [];
  const startTime = Date.now();

  switch (testType) {
    case 'smoke':
      results.push({ name: 'Smoke Tests', success: runSmokeTests() });
      break;

    case 'a11y':
      results.push({ name: 'Accessibility Tests', success: runAccessibilityTests() });
      break;

    case 'admin':
      results.push({ name: 'Admin Panel Tests', success: runAdminTests() });
      break;

    case 'performance':
      results.push({ name: 'Performance Tests', success: runPerformanceTests() });
      break;

    case 'api':
      results.push({ name: 'API Tests', success: runAPITests() });
      break;

    case 'responsive':
      results.push({ name: 'Responsive Tests', success: runResponsiveTests() });
      break;

    case 'cross-browser':
      const crossBrowserResults = runCrossBrowserTests();
      results.push(...crossBrowserResults.map(r => ({
        name: `${r.browser} Tests`,
        success: r.success
      })));
      break;

    case 'ci':
      // Minimal CI test suite
      logSection('Running CI Test Suite');
      results.push({ name: 'Smoke Tests', success: runSmokeTests() });
      results.push({ name: 'Accessibility Tests', success: runAccessibilityTests() });
      results.push({ name: 'Admin Tests', success: runAdminTests() });
      results.push({ name: 'API Tests', success: runAPITests() });
      break;

    case 'all':
    default:
      // Full test suite
      results.push({ name: 'Smoke Tests', success: runSmokeTests() });
      results.push({ name: 'Accessibility Tests', success: runAccessibilityTests() });
      results.push({ name: 'Admin Panel Tests', success: runAdminTests() });
      results.push({ name: 'Performance Tests', success: runPerformanceTests() });
      results.push({ name: 'API Tests', success: runAPITests() });
      results.push({ name: 'Responsive Tests', success: runResponsiveTests() });

      // Quick cross-browser test
      const quickCrossBrowser = runCrossBrowserTests();
      results.push(...quickCrossBrowser.map(r => ({
        name: `${r.browser} Quick Tests`,
        success: r.success
      })));
      break;
  }

  const totalDuration = Date.now() - startTime;
  const report = generateTestReport(results);

  logSection(`Test Run Completed in ${Math.round(totalDuration / 1000)}s`);

  // Create test report file
  const reportData = {
    timestamp: new Date().toISOString(),
    testType,
    duration: totalDuration,
    ...report,
    results
  };

  const reportPath = path.join(process.cwd(), 'test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
  log(`📊 Detailed report saved to: ${reportPath}`, 'blue');

  // Exit with appropriate code
  const allTestsPassed = results.every(r => r.success);
  process.exit(allTestsPassed ? 0 : 1);
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  log(`❌ Uncaught exception: ${error.message}`, 'red');
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  log(`❌ Unhandled rejection at: ${promise}, reason: ${reason}`, 'red');
  process.exit(1);
});

// Run the main function
if (require.main === module) {
  main();
}

module.exports = {
  runSmokeTests,
  runAccessibilityTests,
  runAdminTests,
  runPerformanceTests,
  runAPITests,
  runResponsiveTests,
  runCrossBrowserTests
};