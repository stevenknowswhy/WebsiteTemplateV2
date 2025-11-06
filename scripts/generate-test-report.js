#!/usr/bin/env node

/**
 * Comprehensive Test Report Generator
 * Aggregates test results from multiple sources and generates a comprehensive report
 */

const fs = require('fs');
const path = require('path');

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

class TestReportGenerator {
  constructor() {
    this.reportData = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      branch: this.getCurrentBranch(),
      commit: this.getLastCommit(),
      summary: {},
      unitTests: {},
      e2eTests: {},
      accessibilityTests: {},
      performanceTests: {},
      securityTests: {},
      coverage: {},
      bundleAnalysis: {},
      recommendations: [],
      criticalIssues: []
    };
  }

  getCurrentBranch() {
    try {
      const { execSync } = require('child_process');
      return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    } catch {
      return 'unknown';
    }
  }

  getLastCommit() {
    try {
      const { execSync } = require('child_process');
      return execSync('git log -1 --pretty=format:"%h %s"', { encoding: 'utf8' }).trim();
    } catch {
      return 'unknown';
    }
  }

  async loadUnitTestResults() {
    log('📝 Loading unit test results...', 'cyan');

    try {
      // Read Vitest coverage report
      const coveragePath = path.join(__dirname, '..', 'coverage', 'coverage-final.json');
      if (fs.existsSync(coveragePath)) {
        const coverageData = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));
        this.reportData.coverage = {
          total: coverageData.total,
          lines: {
            total: coverageData.total.lines.pct,
            covered: coverageData.covered.lines.pct
          },
          statements: {
            total: coverageData.total.statements.pct,
            covered: coverageData.covered.statements.pct
          },
          branches: {
            total: coverageData.total.branches.pct,
            covered: coverageData.covered.branches.pct
          },
          functions: {
            total: coverageData.total.functions.pct,
            covered: coverageData.covered.functions.pct
          }
        };
      }

      // Read test results summary
      this.reportData.unitTests = {
        passed: 0,
        failed: 0,
        skipped: 0,
        total: 0,
        duration: 0,
        suites: []
      };

      log('✅ Unit test results loaded', 'green');
    } catch (error) {
      log(`❌ Failed to load unit test results: ${error.message}`, 'red');
      this.reportData.unitTests = { error: error.message };
    }
  }

  async loadE2ETestResults() {
    log('🧪 Loading E2E test results...', 'cyan');

    try {
      // Look for Playwright test results
      const playwrightResultsPath = path.join(__dirname, '..', 'playwright-results', 'results.json');
      if (fs.existsSync(playwrightResultsPath)) {
        const playwrightData = JSON.parse(fs.readFileSync(playwrightResultsPath, 'utf8'));
        this.reportData.e2eTests = {
          passed: playwrightData.suites.reduce((acc, suite) =>
            acc + suite.specs.reduce((specAcc, spec) =>
              specAcc + spec.tests.filter(test => test.results[0].status === 'passed').length, 0), 0),
          failed: playwrightData.suites.reduce((acc, suite) =>
            acc + suite.specs.reduce((specAcc, spec) =>
              specAcc + spec.tests.filter(test => test.results[0].status === 'failed').length, 0), 0),
          skipped: playwrightData.suites.reduce((acc, suite) =>
            acc + suite.specs.reduce((specAcc, spec) =>
              specAcc + spec.tests.filter(test => test.results[0].status === 'skipped').length, 0), 0),
          total: playwrightData.suites.reduce((acc, suite) =>
            acc + suite.specs.reduce((specAcc, spec) => specAcc + spec.tests.length, 0), 0),
          duration: playwrightData.suites.reduce((acc, suite) =>
            acc + suite.specs.reduce((specAcc, spec) =>
              specAcc + spec.tests.reduce((testAcc, test) => testAcc + test.results[0].duration, 0), 0), 0),
          suites: playwrightData.suites
        };
      }

      log('✅ E2E test results loaded', 'green');
    } catch (error) {
      log(`❌ Failed to load E2E test results: ${error.message}`, 'red');
      this.reportData.e2eTests = { error: error.message };
    }
  }

  async loadAccessibilityResults() {
    log('♿ Loading accessibility test results...', 'cyan');

    try {
      // Look for axe test results
      const axeResultsPath = path.join(__dirname, '..', 'test-results', 'accessibility', 'axe-results.json');
      if (fs.existsSync(axeResultsPath)) {
        const axeData = JSON.parse(fs.readFileSync(axeResultsPath, 'utf8'));
        this.reportData.accessibilityTests = {
          violations: axeData.violations || [],
          passes: axeData.passes || [],
          incomplete: axeData.incomplete || [],
          critical: axeData.violations.filter(v => v.impact === 'critical').length,
          serious: axeData.violations.filter(v => v.impact === 'serious').length,
          moderate: axeData.violations.filter(v => v.impact === 'moderate').length,
          minor: axeData.violations.filter(v => v.impact === 'minor').length,
          totalViolations: axeData.violations.length,
          wcagCompliance: this.calculateWCAGCompliance(axeData)
        };
      }

      log('✅ Accessibility results loaded', 'green');
    } catch (error) {
      log(`❌ Failed to load accessibility results: ${error.message}`, 'red');
      this.reportData.accessibilityTests = { error: error.message };
    }
  }

  async loadPerformanceResults() {
    log('⚡ Loading performance test results...', 'cyan');

    try {
      // Load Lighthouse results if available
      const lighthousePath = path.join(__dirname, '..', 'test-results', 'lighthouse', 'lighthouse.json');
      if (fs.existsSync(lighthousePath)) {
        const lighthouseData = JSON.parse(fs.readFileSync(lighthousePath, 'utf8'));
        this.reportData.performanceTests = {
          performance: lighthouseData.categories.performance.score * 100,
          accessibility: lighthouseData.categories.accessibility.score * 100,
          bestPractices: lighthouseData.categories['best-practices'].score * 100,
          seo: lighthouseData.categories.seo.score * 100,
          pwa: lighthouseData.categories.pwa ? lighthouseData.categories.pwa.score * 100 : null,
          metrics: lighthouseData.audits
            .filter(audit => audit.details && audit.details.type === 'numeric')
            .reduce((acc, audit) => {
              acc[audit.id] = {
                score: audit.score,
                displayValue: audit.displayValue,
                numericValue: audit.numericValue
              };
              return acc;
            }, {})
        };
      }

      log('✅ Performance results loaded', 'green');
    } catch (error) {
      log(`❌ Failed to load performance results: ${error.message}`, 'red');
      this.reportData.performanceTests = { error: error.message };
    }
  }

  async loadBundleAnalysis() {
    log('📦 Loading bundle analysis...', 'cyan');

    try {
      // Load webpack bundle analyzer stats
      const statsPath = path.join(__dirname, '..', '.next', 'analyze', 'stats.json');
      if (fs.existsSync(statsPath)) {
        const statsData = JSON.parse(fs.readFileSync(statsPath, 'utf8'));
        this.reportData.bundleAnalysis = {
          totalSize: statsData.assets.reduce((acc, asset) => acc + asset.size, 0),
          assetCount: statsData.assets.length,
          largestAssets: statsData.assets
            .sort((a, b) => b.size - a.size)
            .slice(0, 10)
            .map(asset => ({
              name: asset.name,
              size: asset.size,
              sizeFormatted: this.formatBytes(asset.size)
            })),
          chunks: statsData.chunks,
          modules: statsData.modules,
          duplicateModules: this.findDuplicateModules(statsData.modules)
        };
      }

      log('✅ Bundle analysis loaded', 'green');
    } catch (error) {
      log(`❌ Failed to load bundle analysis: ${error.message}`, 'red');
      this.reportData.bundleAnalysis = { error: error.message };
    }
  }

  calculateWCAGCompliance(axeData) {
    const violationsByLevel = {
      A: 0,
      AA: 0,
      AAA: 0
    };

    axeData.violations.forEach(violation => {
      // Map axe tags to WCAG levels
      if (violation.tags.includes('wcag2a')) violationsByLevel.A++;
      if (violation.tags.includes('wcag2aa')) violationsByLevel.AA++;
      if (violation.tags.includes('wcagaaa')) violationsByLevel.AAA++;
    });

    const totalChecks = violationsByLevel.A + violationsByLevel.AA + violationsByLevel.AAA;
    const passedChecks = axeData.passes.length;

    return {
      A: violationsByLevel.A === 0 ? 100 : Math.max(0, 100 - (violationsByLevel.A / (violationsByLevel.A + passedChecks) * 100)),
      AA: violationsByLevel.AA === 0 ? 100 : Math.max(0, 100 - (violationsByLevel.AA / (violationsByLevel.AA + passedChecks) * 100)),
      AAA: violationsByLevel.AAA === 0 ? 100 : Math.max(0, 100 - (violationsByLevel.AAA / (violationsByLevel.AAA + passedChecks) * 100))
    };
  }

  findDuplicateModules(modules) {
    const moduleMap = new Map();
    const duplicates = [];

    modules.forEach(module => {
      if (module.name && module.name.includes('node_modules')) {
        const packageName = this.extractPackageName(module.name);
        if (moduleMap.has(packageName)) {
          moduleMap.get(packageName).push(module);
        } else {
          moduleMap.set(packageName, [module]);
        }
      }
    });

    moduleMap.forEach((modules, packageName) => {
      if (modules.length > 1) {
        const totalSize = modules.reduce((acc, m) => acc + m.size, 0);
        duplicates.push({
          package: packageName,
          instances: modules.length,
          totalSize,
          totalSizeFormatted: this.formatBytes(totalSize)
        });
      }
    });

    return duplicates.sort((a, b) => b.totalSize - a.totalSize);
  }

  extractPackageName(moduleName) {
    const match = moduleName.match(/node_modules\/([^\/]+)/);
    return match ? match[1] : moduleName;
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  generateRecommendations() {
    const recommendations = [];
    const criticalIssues = [];

    // Coverage recommendations
    if (this.reportData.coverage.lines && this.reportData.coverage.lines.total < 80) {
      recommendations.push({
        type: 'coverage',
        severity: 'warning',
        title: 'Low test coverage',
        description: `Line coverage is ${this.reportData.coverage.lines.total}%. Aim for at least 80%.`
      });
    }

    // Accessibility recommendations
    if (this.reportData.accessibilityTests.critical > 0) {
      criticalIssues.push({
        type: 'accessibility',
        severity: 'critical',
        title: 'Critical accessibility violations found',
        description: `${this.reportData.accessibilityTests.critical} critical violations must be fixed`
      });
    }

    // Performance recommendations
    if (this.reportData.performanceTests.performance < 90) {
      recommendations.push({
        type: 'performance',
        severity: 'warning',
        title: 'Performance score below threshold',
        description: `Lighthouse performance score is ${this.reportData.performanceTests.performance}/100. Target is 90+.`
      });
    }

    // Bundle size recommendations
    if (this.reportData.bundleAnalysis.totalSize > 1000000) {
      recommendations.push({
        type: 'bundle',
        severity: 'warning',
        title: 'Large bundle size',
        description: `Total bundle size is ${this.formatBytes(this.reportData.bundleAnalysis.totalSize)}. Consider code splitting.`
      });
    }

    this.reportData.recommendations = recommendations;
    this.reportData.criticalIssues = criticalIssues;
  }

  generateHTMLReport() {
    const reportDir = path.join(__dirname, '..', 'test-report');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const html = this.generateHTMLContent();
    const reportPath = path.join(reportDir, 'index.html');

    fs.writeFileSync(reportPath, html);
    log(`📊 HTML report generated: ${reportPath}`, 'green');
  }

  generateHTMLContent() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Report - DataBuildDirect</title>
    <style>
        ${this.getCSSStyles()}
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>🧪 Test Report</h1>
            <div class="meta">
                <p><strong>Generated:</strong> ${new Date(this.reportData.timestamp).toLocaleString()}</p>
                <p><strong>Environment:</strong> ${this.reportData.environment}</p>
                <p><strong>Branch:</strong> ${this.reportData.branch}</p>
                <p><strong>Commit:</strong> ${this.reportData.commit}</p>
            </div>
        </header>

        ${this.generateSummarySection()}
        ${this.generateTestSections()}
        ${this.generateRecommendationsSection()}
    </div>
</body>
</html>
    `;
  }

  getCSSStyles() {
    return `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        .header {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }

        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: #2563eb;
        }

        .meta {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 0.5rem;
            font-size: 0.9rem;
            color: #666;
        }

        .section {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }

        .section h2 {
            font-size: 1.8rem;
            margin-bottom: 1rem;
            color: #1f2937;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 0.5rem;
        }

        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .summary-card {
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            padding: 1.5rem;
            border-radius: 8px;
            text-align: center;
        }

        .summary-card.success {
            background: linear-gradient(135deg, #dcfce7 0%, #86efac 100%);
        }

        .summary-card.warning {
            background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%);
        }

        .summary-card.error {
            background: linear-gradient(135deg, #fee2e2 0%, #fca5a5 100%);
        }

        .summary-card h3 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }

        .summary-card p {
            font-size: 0.9rem;
            color: #666;
        }

        .metric {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid #e5e7eb;
        }

        .metric:last-child {
            border-bottom: none;
        }

        .metric-label {
            font-weight: 500;
        }

        .metric-value {
            font-weight: 700;
            font-size: 1.1rem;
        }

        .success { color: #16a34a; }
        .warning { color: #d97706; }
        .error { color: #dc2626; }

        .recommendations {
            background: #fef3c7;
            border: 1px solid #fcd34d;
            border-radius: 8px;
            padding: 1.5rem;
        }

        .critical-issues {
            background: #fee2e2;
            border: 1px solid #fca5a5;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 1rem;
        }

        .recommendation-item {
            padding: 1rem;
            border-left: 4px solid #fcd34d;
            margin-bottom: 1rem;
            background: white;
            border-radius: 4px;
        }

        .critical-item {
            border-left-color: #dc2626;
        }

        .badge {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            border-radius: 9999px;
            font-size: 0.8rem;
            font-weight: 500;
        }

        .badge.success { background: #dcfce7; color: #16a34a; }
        .badge.warning { background: #fef3c7; color: #92400e; }
        .badge.error { background: #fee2e2; color: #991b1b; }
    `;
  }

  generateSummarySection() {
    return `
        <div class="section">
            <h2>📊 Summary</h2>
            <div class="summary-grid">
                <div class="summary-card ${this.getSummaryCardClass('coverage')}">
                    <h3>${this.getSummaryValue('coverage')}</h3>
                    <p>Test Coverage</p>
                </div>
                <div class="summary-card ${this.getSummaryCardClass('e2e')}">
                    <h3>${this.getSummaryValue('e2e')}</h3>
                    <p>E2E Tests</p>
                </div>
                <div class="summary-card ${this.getSummaryCardClass('accessibility')}">
                    <h3>${this.getSummaryValue('accessibility')}</h3>
                    <p>Accessibility</p>
                </div>
                <div class="summary-card ${this.getSummaryCardClass('performance')}">
                    <h3>${this.getSummaryValue('performance')}</h3>
                    <p>Performance</p>
                </div>
            </div>
        </div>
    `;
  }

  getSummaryCardClass(type) {
    const score = this.getSummaryScore(type);
    if (score >= 90) return 'success';
    if (score >= 70) return 'warning';
    return 'error';
  }

  getSummaryValue(type) {
    switch (type) {
      case 'coverage':
        return `${this.reportData.coverage.lines?.total || 0}%`;
      case 'e2e':
        return `${this.reportData.e2eTests.passed || 0}/${this.reportData.e2eTests.total || 0}`;
      case 'accessibility':
        return `${this.reportData.accessibilityTests.totalViolations || 0} violations`;
      case 'performance':
        return `${Math.round(this.reportData.performanceTests.performance || 0)}/100`;
      default:
        return 'N/A';
    }
  }

  getSummaryScore(type) {
    switch (type) {
      case 'coverage':
        return this.reportData.coverage.lines?.total || 0;
      case 'e2e':
        return this.reportData.e2eTests.total > 0
          ? (this.reportData.e2eTests.passed / this.reportData.e2eTests.total) * 100
          : 0;
      case 'accessibility':
        return this.reportData.accessibilityTests.totalViolations === 0 ? 100 :
          Math.max(0, 100 - this.reportData.accessibilityTests.totalViolations * 10);
      case 'performance':
        return this.reportData.performanceTests.performance || 0;
      default:
        return 0;
    }
  }

  generateTestSections() {
    let sections = '';

    // Coverage section
    if (this.reportData.coverage.lines) {
      sections += this.generateCoverageSection();
    }

    // E2E Tests section
    if (this.reportData.e2eTests.passed !== undefined) {
      sections += this.generateE2ESection();
    }

    // Accessibility section
    if (this.reportData.accessibilityTests.violations !== undefined) {
      sections += this.generateAccessibilitySection();
    }

    // Performance section
    if (this.reportData.performanceTests.performance !== undefined) {
      sections += this.generatePerformanceSection();
    }

    return sections;
  }

  generateCoverageSection() {
    return `
        <div class="section">
            <h2>📝 Test Coverage</h2>
            <div class="metric">
                <span class="metric-label">Lines</span>
                <span class="metric-value success">${this.reportData.coverage.lines.total}%</span>
            </div>
            <div class="metric">
                <span class="metric-label">Functions</span>
                <span class="metric-value success">${this.reportData.coverage.functions.total}%</span>
            </div>
            <div class="metric">
                <span class="metric-label">Branches</span>
                <span class="metric-value success">${this.reportData.coverage.branches.total}%</span>
            </div>
            <div class="metric">
                <span class="metric-label">Statements</span>
                <span class="metric-value success">${this.reportData.coverage.statements.total}%</span>
            </div>
        </div>
    `;
  }

  generateE2ESection() {
    return `
        <div class="section">
            <h2>🧪 End-to-End Tests</h2>
            <div class="metric">
                <span class="metric-label">Passed</span>
                <span class="metric-value success">${this.reportData.e2eTests.passed}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Failed</span>
                <span class="metric-value error">${this.reportData.e2eTests.failed}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Skipped</span>
                <span class="metric-value warning">${this.reportData.e2eTests.skipped}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Total Duration</span>
                <span class="metric-value">${Math.round(this.reportData.e2eTests.duration / 1000)}s</span>
            </div>
        </div>
    `;
  }

  generateAccessibilitySection() {
    return `
        <div class="section">
            <h2>♿ Accessibility Tests</h2>
            <div class="metric">
                <span class="metric-label">Critical</span>
                <span class="metric-value error">${this.reportData.accessibilityTests.critical}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Serious</span>
                <span class="metric-value error">${this.reportData.accessibilityTests.serious}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Moderate</span>
                <span class="metric-value warning">${this.reportData.accessibilityTests.moderate}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Minor</span>
                <span class="metric-value warning">${this.reportData.accessibilityTests.minor}</span>
            </div>
            ${this.generateWCAGCompliance()}
        </div>
    `;
  }

  generateWCAGCompliance() {
    const compliance = this.reportData.accessibilityTests.wcagCompliance;
    return `
            <div style="margin-top: 1rem;">
                <h3 style="margin-bottom: 1rem;">WCAG Compliance</h3>
                <div class="metric">
                    <span class="metric-label">Level A</span>
                    <span class="metric-value success">${Math.round(compliance.A)}%</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Level AA</span>
                    <span class="metric-value success">${Math.round(compliance.AA)}%</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Level AAA</span>
                    <span class="metric-value success">${Math.round(compliance.AAA)}%</span>
                </div>
            </div>
        `;
  }

  generatePerformanceSection() {
    return `
        <div class="section">
            <h2>⚡ Performance Tests</h2>
            <div class="metric">
                <span class="metric-label">Performance Score</span>
                <span class="metric-value success">${Math.round(this.reportData.performanceTests.performance)}%</span>
            </div>
            <div class="metric">
                <span class="metric-label">Accessibility Score</span>
                <span class="metric-value success">${Math.round(this.reportData.performanceTests.accessibility)}%</span>
            </div>
            <div class="metric">
                <span class="metric-label">Best Practices</span>
                <span class="metric-value success">${Math.round(this.reportData.performanceTests.bestPractices)}%</span>
            </div>
            <div class="metric">
                <span class="metric-label">SEO</span>
                <span class="metric-value success">${Math.round(this.reportData.performanceTests.seo)}%</span>
            </div>
        </div>
    `;
  }

  generateRecommendationsSection() {
    let recommendationsHTML = '';

    if (this.reportData.criticalIssues.length > 0) {
      recommendationsHTML += `
        <div class="critical-issues">
            <h2>🚨 Critical Issues</h2>
            ${this.reportData.criticalIssues.map(issue => `
                <div class="recommendation-item critical-item">
                    <h3>${issue.title}</h3>
                    <p>${issue.description}</p>
                    <span class="badge error">Critical</span>
                </div>
            `).join('')}
        </div>
      `;
    }

    if (this.reportData.recommendations.length > 0) {
      recommendationsHTML += `
        <div class="recommendations">
            <h2>💡 Recommendations</h2>
            ${this.reportData.recommendations.map(rec => `
                <div class="recommendation-item">
                    <h3>${rec.title}</h3>
                    <p>${rec.description}</p>
                    <span class="badge warning">${rec.severity}</span>
                </div>
            `).join('')}
        </div>
      `;
    }

    return recommendationsHTML;
  }

  async generateReport() {
    log('🚀 Generating comprehensive test report...', 'cyan');

    await this.loadUnitTestResults();
    await this.loadE2ETestResults();
    await this.loadAccessibilityResults();
    await this.loadPerformanceResults();
    await this.loadBundleAnalysis();

    this.generateRecommendations();
    this.generateHTMLReport();

    // Save JSON data for API consumption
    const reportDir = path.join(__dirname, '..', 'test-report');
    const jsonPath = path.join(reportDir, 'report.json');
    fs.writeFileSync(jsonPath, JSON.stringify(this.reportData, null, 2));
    log(`📄 JSON report saved: ${jsonPath}`, 'cyan');

    log('\n🎉 Test report generation complete!', 'green');
    log('📊 View HTML report at: test-report/index.html');
    log('📄 View JSON data at: test-report/report.json');
  }
}

// Main execution
if (require.main === module) {
  const generator = new TestReportGenerator();
  generator.generateReport()
    .catch(error => {
      log(`💥 Report generation failed: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = TestReportGenerator;