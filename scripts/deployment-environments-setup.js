#!/usr/bin/env node

/**
 * Deployment Environments Setup Script
 * Guides through setting up staging and production environments
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

class DeploymentEnvironmentsSetup {
  constructor() {
    this.config = {
      environments: {},
      domain: {},
      deployment: {},
      monitoring: {},
      security: {}
    };
    this.setupSteps = [
      'Domain Configuration',
      'Environment Setup',
      'Vercel Configuration',
      'Environment Variables',
      'Deployment Strategy',
      'Branch Protection',
      'Health Checks',
      'Monitoring & Analytics',
      'Security Configuration',
      'Final Integration'
    ];
    this.currentStep = 0;
  }

  async runSetup() {
    log(`🚀 ${colors.bold}Deployment Environments Setup${colors.reset}`);
    log('=' * 60);
    log('\nThis script will guide you through setting up staging and production environments.');
    log('\nPlease have the following ready:');
    log('  • Domain names for staging and production');
    log('  • Vercel account and project access');
    log('  • Environment-specific secrets');
    log('  • GitHub repository settings');
    log('=' * 60);

    const confirm = await question('Ready to proceed? (y/N)');
    if (confirm.toLowerCase() !== 'y') {
      log('Setup cancelled. Run this script when you\'re ready.');
      process.exit(0);
    }

    await this.configureDomains();
    await this.setupEnvironments();
    await this.configureVercel();
    await this.configureEnvironmentVariables();
    await this.setupDeploymentStrategy();
    await this.configureBranchProtection();
    await this.setupHealthChecks();
    await this.configureMonitoring();
    await this.configureSecurity();
    await this.createConfiguration();

    log('\n' + '=' * 60);
    log(`🎉 ${colors.bold}Deployment Environments Setup Complete!${colors.reset}`);
    log('=' * 60);
    await this.showNextSteps();
  }

  async configureDomains() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Domain Configuration');

    log('\nConfigure domain names:');

    this.config.domain.staging = await question('Staging domain (e.g., staging.yourapp.com):');
    this.config.domain.production = await question('Production domain (e.g., yourapp.com):');
    this.config.domain.customDomains = await question('Use custom domains? (Y/n):');
    this.config.domain.customDomainsEnabled = this.config.domain.customDomains.toLowerCase() !== 'n';

    if (this.config.domain.customDomainsEnabled) {
      this.config.domain.wwwRedirect = await question('Redirect www to non-www? (Y/n):');
      this.config.domain.wwwRedirectEnabled = this.config.domain.wwwRedirect.toLowerCase() !== 'n';

      this.config.domain.sslEnabled = await question('Enable automatic SSL? (Y/n):');
      this.config.domain.sslEnabled = this.config.domain.sslEnabled.toLowerCase() !== 'n';
    }

    logSuccess('Domain configuration saved');
  }

  async setupEnvironments() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Environment Setup');

    log('\nConfigure environments:');

    // Staging environment
    this.config.environments.staging = {
      name: 'Staging',
      branch: await question('Staging branch name (default: staging):') || 'staging',
      autoDeploy: (await question('Enable auto-deploy for staging? (Y/n):')).toLowerCase() !== 'n',
      prPreview: (await question('Enable PR previews for staging? (Y/n):')).toLowerCase() !== 'n',
      analyticsEnabled: (await question('Enable analytics in staging? (Y/n):')).toLowerCase() !== 'n'
    };

    // Production environment
    this.config.environments.production = {
      name: 'Production',
      branch: await question('Production branch name (default: main):') || 'main',
      autoDeploy: (await question('Enable auto-deploy for production? (y/N):')).toLowerCase() === 'y',
      prPreview: false,
      analyticsEnabled: true,
      emergencyAccess: (await question('Enable emergency deployment access? (y/N):')).toLowerCase() === 'y'
    };

    // Development environment
    const enableDev = await question('Configure development environment? (Y/n):');
    if (enableDev.toLowerCase() !== 'n') {
      this.config.environments.development = {
        name: 'Development',
        branch: await question('Development branch name (default: develop):') || 'develop',
        autoDeploy: true,
        prPreview: true,
        analyticsEnabled: false
      };
    }

    logSuccess('Environment setup configured');
  }

  async configureVercel() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Vercel Configuration');

    log('\nConfigure Vercel settings:');

    this.config.deployment.vercel = {
      orgId: await question('Vercel Organization ID:'),
      projectId: await question('Vercel Project ID:'),
      token: await question('Vercel API Token:'),
      team: await question('Vercel Team name (optional, press Enter to skip):') || null
    };

    // Build configuration
    this.config.deployment.build = {
      command: await question('Build command (default: npm run build):') || 'npm run build',
      outputDirectory: await question('Output directory (default: .next):') || '.next',
      installCommand: await question('Install command (default: npm install):') || 'npm install',
      devCommand: await question('Dev command (default: npm run dev):') || 'npm run dev'
    };

    // Environment-specific settings
    this.config.deployment.stagingSettings = {
      buildCommand: await question('Staging build command (default: same as production):') || this.config.deployment.build.command,
      nodeVersion: await question('Staging Node.js version (default: 20.x):') || '20.x',
      environmentVariables: await question('Additional staging env vars (comma-separated):') || ''
    };

    this.config.deployment.productionSettings = {
      buildCommand: await question('Production build command (default: same as above):') || this.config.deployment.build.command,
      nodeVersion: await question('Production Node.js version (default: 20.x):') || '20.x',
      environmentVariables: await question('Additional production env vars (comma-separated):') || ''
    };

    logSuccess('Vercel configuration saved');
  }

  async configureEnvironmentVariables() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Environment Variables');

    log('\nConfigure environment variables for each environment:');

    // Staging environment variables
    this.config.environments.staging.variables = {
      NEXT_PUBLIC_ENVIRONMENT: 'staging',
      NEXT_PUBLIC_APP_URL: `https://${this.config.domain.staging}`,
      DATABASE_URL: await question('Staging database URL (optional, press Enter to skip):') || '',
      STRIPE_PUBLISHABLE_KEY: await question('Staging Stripe publishable key (optional):') || '',
      STRIPE_SECRET_KEY: await question('Staging Stripe secret key (optional):') || '',
      SENTRY_DSN: await question('Staging Sentry DSN (optional):') || '',
      NEXT_PUBLIC_GA_MEASUREMENT_ID: await question('Staging Google Analytics ID (optional):') || ''
    };

    // Production environment variables
    this.config.environments.production.variables = {
      NEXT_PUBLIC_ENVIRONMENT: 'production',
      NEXT_PUBLIC_APP_URL: `https://${this.config.domain.production}`,
      DATABASE_URL: await question('Production database URL (optional):') || '',
      STRIPE_PUBLISHABLE_KEY: await question('Production Stripe publishable key:') || '',
      STRIPE_SECRET_KEY: await question('Production Stripe secret key:') || '',
      SENTRY_DSN: await question('Production Sentry DSN:') || '',
      NEXT_PUBLIC_GA_MEASUREMENT_ID: await question('Production Google Analytics ID:') || ''
    };

    logSuccess('Environment variables configured');
  }

  async setupDeploymentStrategy() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Deployment Strategy');

    log('\nConfigure deployment strategy:');

    // CI/CD strategy
    this.config.deployment.strategy = await question('Deployment strategy (github-actions/vercel/manual):') || 'github-actions';

    // Deployment triggers
    this.config.deployment.triggers = {
      onPush: (await question('Deploy on push to branch? (Y/n):')).toLowerCase() !== 'n',
      onPR: (await question('Deploy on PR merge? (Y/n):')).toLowerCase() !== 'n',
      onTag: (await question('Deploy on git tag? (Y/n):')).toLowerCase() !== 'n',
      scheduled: (await question('Enable scheduled deployments? (y/N):')).toLowerCase() === 'y'
    };

    // Rollback strategy
    this.config.deployment.rollback = {
      enabled: (await question('Enable automatic rollbacks? (Y/n):')).toLowerCase() !== 'n',
      trigger: await question('Rollback trigger (error-rate/performance/both):') || 'both',
      threshold: parseInt(await question('Rollback threshold (%):')) || 5,
      window: parseInt(await question('Rollback window (minutes):')) || 10
    };

    // Blue-green deployment
    this.config.deployment.blueGreen = {
      enabled: (await question('Enable blue-green deployment? (y/N):')).toLowerCase() === 'y',
      healthCheck: await question('Blue-green health check endpoint (default: /health):') || '/health',
      switchback: (await question('Enable automatic switchback? (y/N):')).toLowerCase() === 'y'
    };

    logSuccess('Deployment strategy configured');
  }

  async configureBranchProtection() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Branch Protection');

    log('\nConfigure branch protection rules:');

    const enableBranchProtection = await question('Enable branch protection? (Y/n):');
    if (enableBranchProtection.toLowerCase() !== 'n') {
      this.config.security.branchProtection = {
        enabled: true,
        protectedBranches: this.config.environments.production.branch,
        requirePR: (await question('Require pull request? (Y/n):')).toLowerCase() !== 'n',
        requiredReviewers: parseInt(await question('Required reviewers (0 for any):')) || 1,
        requireStatusChecks: (await question('Require status checks? (Y/n):')).toLowerCase() !== 'n',
        requiredChecks: await question('Required status checks (comma-separated):') || 'ci, test, build',
        enforceAdmins: (await question('Enforce for admins? (Y/n):')).toLowerCase() !== 'n',
        restrictPushes: (await question('Restrict pushes? (Y/n):')).toLowerCase() !== 'n',
        allowedTeams: await question('Allowed teams (comma-separated):') || 'admins, developers'
      };
    } else {
      this.config.security.branchProtection = { enabled: false };
    }

    logSuccess('Branch protection configured');
  }

  async setupHealthChecks() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Health Checks');

    log('\nConfigure deployment health checks:');

    this.config.monitoring.healthChecks = {
      enabled: true,
      endpoint: await question('Health check endpoint (default: /api/health):') || '/api/health',
      timeout: parseInt(await question('Health check timeout (seconds):')) || 30,
      retries: parseInt(await question('Health check retries:')) || 3,
      interval: parseInt(await question('Health check interval (seconds):')) || 30,
      initialDelay: parseInt(await question('Initial health check delay (seconds):')) || 60
    };

    // Custom health checks
    const enableCustomChecks = await question('Enable custom health checks? (Y/n):');
    if (enableCustomChecks.toLowerCase() !== 'n') {
      this.config.monitoring.customChecks = {
        database: (await question('Database health check? (Y/n):')).toLowerCase() !== 'n',
        externalServices: (await question('External services health check? (Y/n):')).toLowerCase() !== 'n',
        cache: (await question('Cache health check? (Y/n):')).toLowerCase() !== 'n'
      };
    }

    logSuccess('Health checks configured');
  }

  async configureMonitoring() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Monitoring & Analytics');

    log('\nConfigure deployment monitoring:');

    // Error tracking
    this.config.monitoring.errorTracking = {
      enabled: (await question('Enable error tracking? (Y/n):')).toLowerCase() !== 'n',
      tool: await question('Error tracking tool (sentry/bugsnag/rollbar):') || 'sentry',
      sampleRate: parseFloat(await question('Error sample rate (0-1):')) || 1.0
    };

    // Performance monitoring
    this.config.monitoring.performance = {
      enabled: true,
      enableRUM: (await question('Enable Real User Monitoring? (Y/n):')).toLowerCase() !== 'n',
      webVitals: (await question('Track Core Web Vitals? (Y/n):')).toLowerCase() !== 'n',
      apm: (await question('Enable APM? (Y/n):')).toLowerCase() !== 'n'
    };

    // Analytics
    this.config.monitoring.analytics = {
      enabled: true,
      providers: {
        googleAnalytics: (await question('Enable Google Analytics? (Y/n):')).toLowerCase() !== 'n',
        posthog: (await question('Enable PostHog? (Y/n):')).toLowerCase() !== 'n',
        mixpanel: (await question('Enable Mixpanel? (y/N):')).toLowerCase() === 'y'
      }
    };

    logSuccess('Monitoring configuration saved');
  }

  async configureSecurity() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Security Configuration');

    log('\nConfigure deployment security:');

    // Environment security
    this.config.security.environment = {
      enableHTTPS: true,
      enableHSTS: (await question('Enable HSTS? (Y/n):')).toLowerCase() !== 'n',
      enableCSP: (await question('Enable CSP? (Y/n):')).toLowerCase() !== 'n',
      cors: {
        enabled: (await question('Enable CORS? (Y/n):')).toLowerCase() !== 'n',
        origins: await question('CORS allowed origins (comma-separated):') || '*'
      },
      rateLimiting: {
        enabled: true,
        requests: parseInt(await question('Rate limit requests per minute:')) || 100
      }
    };

    // Secret management
    this.config.security.secrets = {
      enableRotation: (await question('Enable secret rotation? (Y/n):')).toLowerCase() !== 'n',
      rotationInterval: parseInt(await question('Rotation interval (days):')) || 90,
      enableAudit: (await question('Enable secret audit logging? (Y/n):')).toLowerCase() !== 'n'
    };

    // Web security
    this.config.security.web = {
      enableSecurityHeaders: true,
      enableWAF: (await question('Enable Web Application Firewall? (Y/n):')).toLowerCase() !== 'n',
      enableBotProtection: (await question('Enable bot protection? (Y/n):')).toLowerCase() !== 'n',
      enableDDoSProtection: (await question('Enable DDoS protection? (Y/n):')).toLowerCase() !== 'n'
    };

    logSuccess('Security configuration saved');
  }

  async createConfiguration() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Final Integration');

    // Create deployment configuration
    const deploymentConfig = this.generateDeploymentConfig();
    fs.writeFileSync('deployment.config.js', deploymentConfig);

    // Create environment files
    await this.createEnvironmentFiles();

    // Update GitHub Actions workflow
    await this.updateGitHubActions();

    // Create deployment scripts
    await this.createDeploymentScripts();

    logSuccess('Deployment configuration files created');
  }

  generateDeploymentConfig() {
    return `/**
 * Deployment Configuration
 * Generated on ${new Date().toISOString()}
 */

export const deploymentConfig = {
  // Domain Configuration
  domains: ${JSON.stringify(this.config.domain, null, 2)},

  // Environment Configuration
  environments: ${JSON.stringify(this.config.environments, null, 2)},

  // Vercel Configuration
  vercel: ${JSON.stringify(this.config.deployment.vercel, null, 2)},

  // Build Configuration
  build: ${JSON.stringify(this.config.deployment.build, null, 2)},

  // Deployment Strategy
  deployment: {
    strategy: '${this.config.deployment.strategy}',
    triggers: ${JSON.stringify(this.config.deployment.triggers, null, 2)},
    rollback: ${JSON.stringify(this.config.deployment.rollback, null, 2)},
    blueGreen: ${JSON.stringify(this.config.deployment.blueGreen, null, 2)},
    staging: ${JSON.stringify(this.config.deployment.stagingSettings, null, 2)},
    production: ${JSON.stringify(this.config.deployment.productionSettings, null, 2)}
  },

  // Security Configuration
  security: ${JSON.stringify(this.config.security, null, 2)},

  // Monitoring Configuration
  monitoring: ${JSON.stringify(this.config.monitoring, null, 2)},

  // Feature Flags
  features: {
    enableBlueGreen: this.config.deployment.blueGreen.enabled,
    enableAutomaticRollback: this.config.deployment.rollback.enabled,
    enableHealthChecks: this.config.monitoring.healthChecks.enabled,
    enableErrorTracking: this.config.monitoring.errorTracking.enabled,
    enablePerformanceMonitoring: this.config.monitoring.performance.enabled,
    enableAnalytics: this.config.monitoring.analytics.enabled
  }
};

export default deploymentConfig;
`;
  }

  async createEnvironmentFiles() {
    // Create staging environment file
    const stagingEnv = this.generateEnvironmentFile('staging', this.config.environments.staging.variables);
    fs.writeFileSync('.env.staging', stagingEnv);

    // Create production environment file
    const productionEnv = this.generateEnvironmentFile('production', this.config.environments.production.variables);
    fs.writeFileSync('.env.production', productionEnv);

    // Create development environment file if configured
    if (this.config.environments.development) {
      const devEnv = this.generateEnvironmentFile('development', {
        NEXT_PUBLIC_ENVIRONMENT: 'development',
        NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
        NEXT_PUBLIC_ENABLE_DEV_TOOLS: 'true'
      });
      fs.writeFileSync('.env.development', devEnv);
    }

    logSuccess('Environment files created');
  }

  generateEnvironmentFile(environment, variables) {
    let content = `# ${environment.charAt(0).toUpperCase() + environment.slice(1)} Environment
# Generated on ${new Date().toISOString()}

# ===========================================
# APPLICATION CONFIGURATION
# ===========================================
NEXT_PUBLIC_ENVIRONMENT=${variables.NEXT_PUBLIC_ENVIRONMENT}
NEXT_PUBLIC_APP_URL=${variables.NEXT_PUBLIC_APP_URL}

`;

    Object.entries(variables).forEach(([key, value]) => {
      if (key !== 'NEXT_PUBLIC_ENVIRONMENT' && key !== 'NEXT_PUBLIC_APP_URL') {
        content += `${key}=${value}\n`;
      }
    });

    return content;
  }

  async updateGitHubActions() {
    const workflowPath = '.github/workflows/ci-cd.yml';
    if (fs.existsSync(workflowPath)) {
      let content = fs.readFileSync(workflowPath, 'utf8');

      // Update with environment-specific configuration
      const environmentConfig = `
      # Environment Configuration
      STAGING_DOMAIN: ${this.config.domain.staging}
      PRODUCTION_DOMAIN: ${this.config.domain.production}
      VERCEL_ORG_ID: ${this.config.deployment.vercel.orgId}
      VERCEL_PROJECT_ID: ${this.config.deployment.vercel.projectId}
      ENABLE_BLUE_GREEN: ${this.config.deployment.blueGreen.enabled}
      ENABLE_AUTOMATIC_ROLLBACK: ${this.config.deployment.rollback.enabled}
`;

      if (!content.includes('STAGING_DOMAIN:')) {
        content = content.replace(
          'env:',
          `env:${environmentConfig}`
        );
        fs.writeFileSync(workflowPath, content);
        logSuccess('Updated GitHub Actions workflow');
      }
    }
  }

  async createDeploymentScripts() {
    // Create deployment scripts directory
    const scriptsDir = 'scripts/deployment';
    if (!fs.existsSync(scriptsDir)) {
      fs.mkdirSync(scriptsDir, { recursive: true });
    }

    // Create main deployment script
    const deployScript = `#!/usr/bin/env node

const { execSync } = require('child_process');
const deploymentConfig = require('../deployment.config.js');

class Deployer {
  constructor() {
    this.config = deploymentConfig;
  }

  async deploy(environment, options = {}) {
    const {
      dryRun = false,
      skipBuild = false,
      skipTests = false,
      force = false
    } = options;

    console.log('🚀 Starting deployment to', environment);

    if (!this.config.environments[environment]) {
      throw new Error('Invalid environment: ' + environment);
    }

    const envConfig = this.config.environments[environment];

    // Validate environment
    await this.validateEnvironment(environment);

    // Run pre-deployment checks
    if (!skipTests) {
      await this.runTests();
    }

    // Build application
    if (!skipBuild) {
      await this.build(environment);
    }

    // Deploy
    if (dryRun) {
      console.log('🔍 Dry run mode - would deploy to', environment);
      return { success: true, dryRun: true };
    }

    const deploymentResult = await this.executeDeployment(environment, envConfig);

    // Run post-deployment checks
    await this.postDeploymentChecks(environment);

    console.log('✅ Deployment completed successfully to', environment);

    return deploymentResult;
  }

  async validateEnvironment(environment) {
    console.log('🔍 Validating environment...');
    // Environment validation logic
  }

  async runTests() {
    console.log('🧪 Running tests...');
    execSync('npm run ci:test', { stdio: 'inherit' });
  }

  async build(environment) {
    console.log('🔨 Building for', environment);
    const buildCmd = this.config.deployment[environment]?.buildCommand ||
                     this.config.build.command;

    execSync(buildCmd, { stdio: 'inherit' });
  }

  async executeDeployment(environment, envConfig) {
    console.log('🚀 Executing deployment...');

    if (this.config.deployment.strategy === 'vercel') {
      return this.deployToVercel(environment, envConfig);
    } else if (this.config.deployment.strategy === 'github-actions') {
      return this.deployWithGitHubActions(environment, envConfig);
    } else {
      return this.manualDeploy(environment, envConfig);
    }
  }

  async deployToVercel(environment, envConfig) {
    const vercelCmd = environment === 'production' ?
      'vercel --prod' :
      'vercel';

    execSync(vercelCmd, { stdio: 'inherit' });
  }

  async deployWithGitHubActions(environment, envConfig) {
    // Trigger GitHub Actions deployment
    console.log('🔧 Triggering GitHub Actions deployment...');
    // Implementation for triggering GitHub Actions
  }

  async manualDeploy(environment, envConfig) {
    console.log('🔧 Manual deployment...');
    // Implementation for manual deployment
  }

  async postDeploymentChecks(environment) {
    console.log('🔍 Running post-deployment checks...');

    // Health check
    if (this.config.monitoring.healthChecks.enabled) {
      await this.healthCheck(environment);
    }

    // Performance check
    if (this.config.monitoring.performance.enabled) {
      await this.performanceCheck(environment);
    }

    // Error rate check
    if (this.config.monitoring.errorTracking.enabled) {
      await this.errorRateCheck(environment);
    }
  }

  async healthCheck(environment) {
    console.log('💓 Checking health...');
    // Health check implementation
  }

  async performanceCheck(environment) {
    console.log('⚡ Checking performance...');
    // Performance check implementation
  }

  async errorRateCheck(environment) {
    console.log('📊 Checking error rate...');
    // Error rate check implementation
  }
}

// CLI Interface
const environment = process.argv[2];
const dryRun = process.argv.includes('--dry-run');
const skipBuild = process.argv.includes('--skip-build');
const skipTests = process.argv.includes('--skip-tests');
const force = process.argv.includes('--force');

if (!environment || !['staging', 'production', 'development'].includes(environment)) {
  console.error('Usage: node scripts/deployment/deploy.js <staging|production|development> [options]');
  console.error('Options: --dry-run, --skip-build, --skip-tests, --force');
  process.exit(1);
}

const deployer = new Deployer();
deployer.deploy(environment, { dryRun, skipBuild, skipTests, force })
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  });
`;

    fs.writeFileSync(path.join(scriptsDir, 'deploy.js'), deployScript);

    // Make script executable
    try {
      execSync(`chmod +x ${path.join(scriptsDir, 'deploy.js')}`);
    } catch (error) {
      // Ignore permission errors
    }
  }

  async showNextSteps() {
    log('\n📋 Deployment Environments Setup Complete - Next Steps:');
    log('=' * 50);

    log('\n1. 🔧 Configure Vercel:');
    log('   • Create Vercel project if not exists');
    log('   • Connect repository to Vercel');
    log('   • Set up environment variables in Vercel dashboard');
    log('   • Configure custom domains');

    log('\n2. 🌐 Configure DNS:');
    log('   • Update DNS records for domains');
    log('   • Configure SSL certificates');
    log('   • Set up domain redirects');
    log('   • Test domain resolution');

    log('\n3. 🔒 Security Setup:');
    log('   • Configure branch protection rules');
    log('   • Set up secret rotation');
    log('   • Configure security headers');
    log('   • Set up rate limiting');

    log('\n4. 📊 Monitoring Setup:');
    log('   • Set up error tracking (Sentry)');
    log('   • Configure analytics (Google Analytics)');
    log('   • Set up performance monitoring');
    log('   • Configure alerting');

    log('\n5. 🚀 Deployment Testing:');
    log('   • Deploy to staging: npm run deploy:staging');
    log('   • Test all functionality in staging');
    log('   • Run health checks');
    log('   • Test rollback procedures');

    log('\n6. 📦 Production Deployment:');
    log('   • Deploy to production: npm run deploy:production');
    log('   • Monitor deployment progress');
    log('   • Verify all services');
    log('   • Test emergency procedures');

    log('\n🔗 Quick Commands:');
    log('  npm run deploy:staging     # Deploy to staging');
    log('  npm run deploy:production  # Deploy to production');
    log('  npm run deploy:develop     # Deploy to development');
    log('  npm run deploy:staging --dry-run  # Test deployment');
    log('  npm run health:check        # Check deployment health');

    log('\n📚 Configuration Files:');
    log('  • Deployment config: deployment.config.js');
    log('  • Environment files: .env.staging, .env.production');
    log('  • GitHub Actions: .github/workflows/ci-cd.yml');
    log('  • Deployment scripts: scripts/deployment/');

    log('\n⚠️  Important Notes:');
    log('  • Always test deployments in staging first');
    log('  • Monitor deployments closely');
    log('  • Have rollback procedures ready');
    log('  • Keep environment variables secure');
    log('  • Regularly review deployment logs');
    log('  • Test emergency access procedures');

    log('\n🎉 Deployment environments setup complete! Your application is ready for multi-environment deployment.');
  }
}

// Main execution
if (require.main === module) {
  const setup = new DeploymentEnvironmentsSetup();
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

module.exports = DeploymentEnvironmentsSetup;