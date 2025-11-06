#!/usr/bin/env node

/**
 * Monitoring and Alerting Setup Script
 * Guides through setting up comprehensive monitoring for production
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

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

function logStep(step, total, description) {
  console.log(`\n${colors.cyan}Step ${step}/${total}: ${description}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(`${colors.blue}${query}${colors.reset} `, resolve));
}

class MonitoringSetup {
  constructor() {
    this.config = {};
    this.setupSteps = [
      'Error Tracking (Sentry)',
      'Performance Monitoring',
      'Log Management',
      'User Analytics',
      'Health Checks',
      'Alerting Rules',
      'Dashboard Configuration',
      'Final Integration'
    ];
    this.currentStep = 0;
  }

  async runSetup() {
    log(`📊 ${colors.bold}Monitoring and Alerting Setup${colors.reset}`);
    log('=' * 60);
    log('\nThis script will guide you through setting up comprehensive monitoring.');
    log('\nPlease have the following ready:');
    log('  • Sentry account for error tracking');
    log('  • Logflare account for structured logging');
    log('  • Google Analytics account');
    log('  • PostHog account for product analytics');
    log('  • Vercel analytics access');
    log('=' * 60);

    const confirm = await question('Ready to proceed? (y/N)');
    if (confirm.toLowerCase() !== 'y') {
      log('Setup cancelled. Run this script when you\'re ready.');
      process.exit(0);
    }

    await this.setupSentry();
    await this.setupPerformanceMonitoring();
    await this.setupLogManagement();
    await this.setupUserAnalytics();
    await this.setupHealthChecks();
    await this.setupAlertingRules();
    await this.setupDashboards();
    await this.createMonitoringConfig();

    log('\n' + '=' * 60);
    log(`🎉 ${colors.bold}Monitoring Setup Complete!${colors.reset}`);
    log('=' * 60);
    await this.showNextSteps();
  }

  async setupSentry() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Error Tracking (Sentry)');

    log('\nSet up Sentry for error tracking:');
    log('  1. Go to https://sentry.io');
    log('  2. Create a new project (Next.js)');
    log('  3. Get your DSN from project settings');

    this.config.SENTRY_DSN = await question('Sentry DSN:');
    this.config.SENTRY_ENVIRONMENT = await question('Sentry Environment (production/staging):') || 'production';

    const enableSentryProfiling = await question('Enable Sentry performance profiling? (Y/n):');
    this.config.SENTRY_ENABLE_PROFILING = enableSentryProfiling.toLowerCase() !== 'n';

    logSuccess('Sentry configuration saved');
  }

  async setupPerformanceMonitoring() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Performance Monitoring');

    log('\nConfigure Core Web Vitals monitoring:');

    const enableRUM = await question('Enable Real User Monitoring? (Y/n):');
    this.config.ENABLE_RUM = enableRUM.toLowerCase() !== 'n';

    const webVitalsThresholds = await question('Use default Web Vitals thresholds? (Y/n):');

    if (webVitalsThresholds.toLowerCase() !== 'n') {
      this.config.WEB_VITALS_THRESHOLDS = {
        LCP: 2500,
        FID: 100,
        CLS: 0.1,
        FCP: 1800,
        TTFB: 800
      };
    } else {
      this.config.WEB_VITALS_THRESHOLDS = {
        LCP: parseInt(await question('LCP threshold (ms):')) || 2500,
        FID: parseInt(await question('FID threshold (ms):')) || 100,
        CLS: parseFloat(await question('CLS threshold:')) || 0.1,
        FCP: parseInt(await question('FCP threshold (ms):')) || 1800,
        TTFB: parseInt(await question('TTFB threshold (ms):')) || 800
      };
    }

    logSuccess('Performance monitoring configured');
  }

  async setupLogManagement() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Log Management');

    this.config.LOGFLARE_API_KEY = await question('Logflare API Key (optional, press Enter to skip):') || '';

    if (this.config.LOGFLARE_API_KEY) {
      this.config.LOGFLARE_SOURCE_TOKEN = await question('Logflare Source Token:');
      this.config.ENABLE_LOG_SHIPPING = true;
    } else {
      this.config.ENABLE_LOG_SHIPPING = false;
    }

    logSuccess('Log management configured');
  }

  async setupUserAnalytics() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'User Analytics');

    this.config.GOOGLE_ANALYTICS_ID = await question('Google Analytics ID (G-...):') || '';
    this.config.POSTHOG_API_KEY = await question('PostHog API Key (optional):') || '';

    if (this.config.POSTHOG_API_KEY) {
      this.config.POSTHOG_HOST = await question('PostHog Host (default: https://us.i.posthog.com):') || 'https://us.i.posthog.com';
    }

    const enableAnalyticsConsent = await question('Enable cookie consent for analytics? (Y/n):');
    this.config.ENABLE_ANALYTICS_CONSENT = enableAnalyticsConsent.toLowerCase() !== 'n';

    logSuccess('User analytics configured');
  }

  async setupHealthChecks() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Health Checks');

    log('\nConfigure health check endpoints:');

    this.config.HEALTH_CHECK_ENDPOINT = await question('Health check endpoint (default: /api/health):') || '/api/health';
    this.config.READINESS_ENDPOINT = await question('Readiness endpoint (default: /api/ready):') || '/api/ready';
    this.config.LIVENESS_ENDPOINT = await question('Liveness endpoint (default: /api/live):') || '/api/live';

    const healthCheckInterval = await question('Health check interval in seconds (default: 30):');
    this.config.HEALTH_CHECK_INTERVAL = parseInt(healthCheckInterval) || 30;

    logSuccess('Health checks configured');
  }

  async setupAlertingRules() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Alerting Rules');

    log('\nConfigure alerting thresholds:');

    this.config.ERROR_RATE_THRESHOLD = await question('Error rate threshold % (default: 5):') || 5;
    this.config.RESPONSE_TIME_THRESHOLD = await question('Response time threshold ms (default: 1000):') || 1000;
    this.config.AVAILABILITY_THRESHOLD = await question('Availability threshold % (default: 99.9):') || 99.9;

    const enablePagers = await question('Enable PagerDuty/Slack alerts? (y/N):');
    this.config.ENABLE_PAGER_ALERTS = enablePagers.toLowerCase() === 'y';

    if (this.config.ENABLE_PAGER_ALERTS) {
      this.config.SLACK_WEBHOOK_URL = await question('Slack webhook URL for alerts:');
    }

    logSuccess('Alerting rules configured');
  }

  async setupDashboards() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Dashboard Configuration');

    log('\nConfigure monitoring dashboards:');

    const enablePerformanceDashboard = await question('Enable performance dashboard? (Y/n):');
    this.config.ENABLE_PERFORMANCE_DASHBOARD = enablePerformanceDashboard.toLowerCase() !== 'n';

    const enableErrorDashboard = await question('Enable error dashboard? (Y/n):');
    this.config.ENABLE_ERROR_DASHBOARD = enableErrorDashboard.toLowerCase() !== 'n';

    const enableBusinessMetrics = await question('Enable business metrics dashboard? (Y/n):');
    this.config.ENABLE_BUSINESS_METRICS = enableBusinessMetrics.toLowerCase() !== 'n';

    logSuccess('Dashboard configuration saved');
  }

  async createMonitoringConfig() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Final Integration');

    // Create monitoring configuration file
    const monitoringConfig = this.generateMonitoringConfig();
    fs.writeFileSync('monitoring.config.js', monitoringConfig);

    // Create alerting configuration
    const alertingConfig = this.generateAlertingConfig();
    fs.writeFileSync('alerting.config.js', alertingConfig);

    // Update environment template
    await this.updateEnvironmentTemplate();

    logSuccess('Monitoring configuration files created');
  }

  generateMonitoringConfig() {
    return `/**
 * Monitoring Configuration
 * Generated on ${new Date().toISOString()}
 */

export const monitoringConfig = {
  // Error Tracking
  sentry: {
    dsn: '${this.config.SENTRY_DSN}',
    environment: '${this.config.SENTRY_ENVIRONMENT}',
    enableProfiling: ${this.config.SENTRY_ENABLE_PROFILING},
    tracesSampleRate: 1.0,
    profilesSampleRate: ${this.config.SENTRY_ENABLE_PROFILING ? '1.0' : '0.0'},
  },

  // Performance Monitoring
  performance: {
    enableRUM: ${this.config.ENABLE_RUM},
    webVitalsThresholds: ${JSON.stringify(this.config.WEB_VITALS_THRESHOLDS, null, 2)},
    sampleRate: 1.0,
  },

  // Log Management
  logging: {
    enableLogShipping: ${this.config.ENABLE_LOG_SHIPPING},
    logflareApiKey: '${this.config.LOGFLARE_API_KEY}',
    logflareSourceToken: '${this.config.LOGFLARE_SOURCE_TOKEN}',
    logLevel: 'info',
  },

  // User Analytics
  analytics: {
    googleAnalyticsId: '${this.config.GOOGLE_ANALYTICS_ID}',
    posthogApiKey: '${this.config.POSTHOG_API_KEY}',
    posthogHost: '${this.config.POSTHOG_HOST}',
    enableConsent: ${this.config.ENABLE_ANALYTICS_CONSENT},
  },

  // Health Checks
  health: {
    endpoint: '${this.config.HEALTH_CHECK_ENDPOINT}',
    readinessEndpoint: '${this.config.READINESS_ENDPOINT}',
    livenessEndpoint: '${this.config.LIVENESS_ENDPOINT}',
    interval: ${this.config.HEALTH_CHECK_INTERVAL},
  },

  // Features
  features: {
    performanceDashboard: ${this.config.ENABLE_PERFORMANCE_DASHBOARD},
    errorDashboard: ${this.config.ENABLE_ERROR_DASHBOARD},
    businessMetrics: ${this.config.ENABLE_BUSINESS_METRICS},
  },
};

export default monitoringConfig;
`;
  }

  generateAlertingConfig() {
    return `/**
 * Alerting Configuration
 * Generated on ${new Date().toISOString()}
 */

export const alertingConfig = {
  // Alert Thresholds
  thresholds: {
    errorRate: ${this.config.ERROR_RATE_THRESHOLD},
    responseTime: ${this.config.RESPONSE_TIME_THRESHOLD},
    availability: ${this.config.AVAILABILITY_THRESHOLD},
  },

  // Alert Channels
  channels: {
    slack: {
      enabled: ${this.config.ENABLE_PAGER_ALERTS},
      webhookUrl: '${this.config.SLACK_WEBHOOK_URL || ''}',
    },
    email: {
      enabled: true,
      recipients: [],
    },
    pagerDuty: {
      enabled: false,
      serviceKey: '',
    },
  },

  // Alert Rules
  rules: [
    {
      name: 'High Error Rate',
      condition: 'error_rate > thresholds.errorRate',
      severity: 'critical',
      channels: ['slack', 'email'],
    },
    {
      name: 'Slow Response Time',
      condition: 'avg_response_time > thresholds.responseTime',
      severity: 'warning',
      channels: ['slack'],
    },
    {
      name: 'Low Availability',
      condition: 'availability < thresholds.availability',
      severity: 'critical',
      channels: ['slack', 'email'],
    },
    {
      name: 'Database Connection Issues',
      condition: 'db_connection_failures > 5',
      severity: 'critical',
      channels: ['slack', 'email'],
    },
    {
      name: 'Memory Usage High',
      condition: 'memory_usage > 90',
      severity: 'warning',
      channels: ['slack'],
    },
  ],

  // Suppression Rules
  suppressions: [
    {
      name: 'Maintenance Window',
      condition: 'maintenance_mode == true',
      rules: ['*'],
    },
    {
      name: 'Development Environment',
      condition: 'environment == "development"',
      rules: ['*'],
    },
  ],
};

export default alertingConfig;
`;
  }

  async updateEnvironmentTemplate() {
    const envTemplatePath = '.env.production.template';
    if (fs.existsSync(envTemplatePath)) {
      let content = fs.readFileSync(envTemplatePath, 'utf8');

      // Add monitoring variables if not present
      const monitoringVars = `
# ===========================================
# MONITORING & ALERTING
# ===========================================
# Sentry configuration
SENTRY_DSN=${this.config.SENTRY_DSN}
SENTRY_ENVIRONMENT=${this.config.SENTRY_ENVIRONMENT}
SENTRY_ENABLE_PROFILING=${this.config.SENTRY_ENABLE_PROFILING}

# Performance monitoring
ENABLE_RUM=${this.config.ENABLE_RUM}
NEXT_PUBLIC_ENABLE_PERFORMANCE_DASHBOARD=${this.config.ENABLE_PERFORMANCE_DASHBOARD}

# Analytics configuration
GOOGLE_ANALYTICS_ID=${this.config.GOOGLE_ANALYTICS_ID}
NEXT_PUBLIC_GA_MEASUREMENT_ID=${this.config.GOOGLE_ANALYTICS_ID}
POSTHOG_API_KEY=${this.config.POSTHOG_API_KEY}
POSTHOG_HOST=${this.config.POSTHOG_HOST}
NEXT_PUBLIC_POSTHOG_KEY=${this.config.POSTHOG_API_KEY}
NEXT_PUBLIC_ENABLE_ANALYTICS_CONSENT=${this.config.ENABLE_ANALYTICS_CONSENT}

# Alerting configuration
SLACK_WEBHOOK_URL=${this.config.SLACK_WEBHOOK_URL || ''}
ENABLE_PAGER_ALERTS=${this.config.ENABLE_PAGER_ALERTS}
`;

      if (!content.includes('SENTRY_DSN=')) {
        content += monitoringVars;
        fs.writeFileSync(envTemplatePath, content);
        logSuccess('Updated environment template with monitoring variables');
      }
    }
  }

  async showNextSteps() {
    log('\n📋 Monitoring Setup Complete - Next Steps:');
    log('=' * 50);

    log('\n1. 🔧 Configure Services:');
    log('   • Set up Sentry project and verify DSN');
    log('   • Configure Logflare source token');
    log('   • Set up Google Analytics property');
    log('   • Configure PostHog project if using');

    log('\n2. 📊 Create Dashboards:');
    log('   • Sentry: Error tracking and performance');
    log('   • Logflare: Log analysis and patterns');
    log('   • Google Analytics: User behavior');
    log('   • Vercel: Application performance');
    log('   • Custom dashboards: Business metrics');

    log('\n3. 🔔 Set Up Alerts:');
    log('   • Configure Slack webhook for alerts');
    log('   • Set up email notifications');
    log('   • Configure PagerDuty if using');
    log('   • Test alert delivery');

    log('\n4. 🧪 Test Monitoring:');
    log('   • Run health checks: npm run health:check');
    log('   • Test error tracking with intentional errors');
    log('   • Verify log shipping to Logflare');
    log('   • Confirm analytics events');

    log('\n5. 📈 Configure SLOs:');
    log('   • Set up Service Level Objectives');
    log('   • Configure error budget policies');
    log('   • Set up automated scaling based on metrics');

    log('\n🔗 Quick Commands:');
    log('  npm run monitoring:status    # Check monitoring status');
    log('  npm run health:check         # Run health checks');
    log('  npm run logs:ship           # Test log shipping');
    log('  npm run analytics:verify    # Verify analytics setup');

    log('\n📚 Documentation:');
    log('  • Monitoring config: monitoring.config.js');
    log('  • Alerting config: alerting.config.js');
    log('  • Sentry dashboard: https://sentry.io');
    log('  • Logflare dashboard: https://logflare.app');

    log('\n⚠️  Important Notes:');
    log('  • Monitor alert thresholds and adjust as needed');
    log('  • Set up on-call rotation for critical alerts');
    log('  • Regularly review and update alert rules');
    log('  • Test failover procedures quarterly');
    log('  • Keep monitoring configurations in version control');

    log('\n🎉 Monitoring setup complete! Your application is now fully observable.');
  }
}

// Main execution
if (require.main === module) {
  const setup = new MonitoringSetup();
  setup.runSetup()
    .then(() => {
      rl.close();
      process.exit(0);
    })
    .catch(error => {
      logError(`Setup failed: ${error.message}`);
      process.exit(1);
    });
}

module.exports = MonitoringSetup;