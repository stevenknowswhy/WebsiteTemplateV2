#!/usr/bin/env node

/**
 * Production Setup Script
 * Guides through setting up production environment variables and secrets
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');
const crypto = require('crypto');

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

function generateSecret(length = 32) {
  return crypto.randomBytes(length).toString('base64').slice(0, length);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(`${colors.blue}${query}${colors.reset} `, resolve));
}

class ProductionSetup {
  constructor() {
    this.config = {};
    this.setupSteps = [
      'Supabase Configuration',
      'Stripe Configuration',
      'Monitoring & Error Tracking',
      'Authentication & Security',
      'Rate Limiting Configuration',
      'Notification Services',
      'Deployment Configuration',
      'Final Configuration File'
    ];
    this.currentStep = 0;
  }

  async runSetup() {
    log(`🚀 ${colors.bold}DataBuildDirect Production Setup${colors.reset}`);
    log('=' * 60);
    log('\nThis script will guide you through setting up your production environment.');
    log('\nPlease have the following ready:');
    log('  • Supabase project credentials');
    log('  • Stripe API keys');
    log('  • Sentry DSN (for error tracking)');
    log('  • Vercel deployment token');
    log('  • Slack webhook (for notifications)');
    log('=' * 60);

    const confirm = await question('Ready to proceed? (y/N)');
    if (confirm.toLowerCase() !== 'y') {
      log('Setup cancelled. Run this script when you\'re ready.');
      process.exit(0);
    }

    await this.setupSupabase();
    await this.setupStripe();
    await this.setupMonitoring();
    await this.setupAuthentication();
    await this.setupRateLimiting();
    await this.setupNotifications();
    await this.setupDeployment();
    await this.createEnvFiles();

    log('\n' + '=' * 60);
    log(`🎉 ${colors.bold}Production Setup Complete!${colors.reset}`);
    log('=' * 60);
    await this.showNextSteps();
  }

  async setupSupabase() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Supabase Configuration');

    log('\nGet these values from your Supabase dashboard:');
    log('  1. Go to https://app.supabase.com');
    log('  2. Select your project');
    log('  3. Go to Settings → API');
    log('  4. Copy Project URL and Service Role Key');

    this.config.NEXT_PUBLIC_SUPABASE_URL = await question('Supabase Project URL:');
    this.config.SUPABASE_ANON_KEY = await question('Supabase Anon Key:');
    this.config.SUPABASE_SERVICE_KEY = await question('Supabase Service Role Key:');

    logSuccess('Supabase configuration saved');
  }

  async setupStripe() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Stripe Configuration');

    log('\nGet these values from your Stripe dashboard:');
    log('  1. Go to https://dashboard.stripe.com');
    log('  2. Go to Developers → API keys');
    log('  3. Copy publishable key and secret key');
    log('  4. Go to Webhooks → Add endpoint to get webhook secret');

    this.config.STRIPE_PUBLISHABLE_KEY = await question('Stripe Publishable Key (pk_test_...):');
    this.config.STRIPE_SECRET_KEY = await question('Stripe Secret Key (sk_test_...):');
    this.config.STRIPE_WEBHOOK_SECRET = await question('Stripe Webhook Secret (whsec_...):');

    logSuccess('Stripe configuration saved');
  }

  async setupMonitoring() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Monitoring & Error Tracking');

    this.config.SENTRY_DSN = await question('Sentry DSN (optional, press Enter to skip):') || '';
    this.config.LOGFLARE_API_KEY = await question('Logflare API Key (optional, press Enter to skip):') || '';
    this.config.NEXT_PUBLIC_GA_MEASUREMENT_ID = await question('Google Analytics ID (optional, press Enter to skip):') || '';
    this.config.NEXT_PUBLIC_POSTHOG_KEY = await question('PostHog API Key (optional, press Enter to skip):') || '';

    logSuccess('Monitoring configuration saved');
  }

  async setupAuthentication() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Authentication & Security');

    const useAutoSecret = await question('Generate NextAuth secret automatically? (Y/n):');
    this.config.NEXTAUTH_SECRET = useAutoSecret.toLowerCase() !== 'n'
      ? generateSecret()
      : await question('Enter NextAuth secret:');

    logSuccess('Authentication configuration saved');
  }

  async setupRateLimiting() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Rate Limiting Configuration');

    log('\nSet up Upstash Redis for rate limiting:');
    log('  1. Go to https://console.upstash.com/redis');
    log('  2. Create a new Redis database');
    log('  3. Copy the Redis URL and token');

    const useUpstash = await question('Use Upstash Redis for rate limiting? (Y/n):');
    if (useUpstash.toLowerCase() !== 'n') {
      this.config.UPSTASH_REDIS_URL = await question('Upstash Redis URL:');
      this.config.UPSTASH_REDIS_TOKEN = await question('Upstash Redis Token:');
    }

    logSuccess('Rate limiting configuration saved');
  }

  async setupNotifications() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Notification Services');

    this.config.SLACK_WEBHOOK = await question('Slack webhook URL (optional, press Enter to skip):') || '';
    this.config.RESEND_API_KEY = await question('Resend API Key (optional, press Enter to skip):') || '';

    logSuccess('Notification services configured');
  }

  async setupDeployment() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Deployment Configuration');

    log('\nSet up Vercel for deployment:');
    log('  1. Go to https://vercel.com/account/tokens');
    log('  2. Create a new token');
    log('  3. Go to your project settings to get Org ID and Project ID');

    this.config.VERCEL_TOKEN = await question('Vercel Token:');
    this.config.VERCEL_ORG_ID = await question('Vercel Organization ID:');
    this.config.VERCEL_PROJECT_ID = await question('Vercel Project ID:');

    this.config.SNYK_TOKEN = await question('Snyk Token (optional, press Enter to skip):') || '';

    logSuccess('Deployment configuration saved');
  }

  async createEnvFiles() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Create Environment Files');

    // Create .env.production
    const envProductionContent = this.generateEnvFile();
    fs.writeFileSync('.env.production', envProductionContent);

    // Create .env.local (local development overrides)
    const envLocalContent = `# Local development overrides
# These override .env.production for local development
NODE_ENV=development
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_ENABLE_DEBUG=true
NEXT_PUBLIC_ENABLE_DEV_TOOLS=true
`;
    fs.writeFileSync('.env.local', envLocalContent);

    // Update .env.template
    const envTemplateContent = this.generateEnvTemplate();
    fs.writeFileSync('.env.template', envTemplateContent);

    logSuccess('Environment files created:');
    log('  • .env.production - Production configuration');
    log('  • .env.local - Local development overrides');
    log('  • .env.template - Template for version control');
  }

  generateEnvFile() {
    return `# Production Environment Variables
# Generated on ${new Date().toISOString()}

# ===========================================
# SUPABASE CONFIGURATION
# ===========================================
NEXT_PUBLIC_SUPABASE_URL=${this.config.NEXT_PUBLIC_SUPABASE_URL}
SUPABASE_ANON_KEY=${this.config.SUPABASE_ANON_KEY}
SUPABASE_SERVICE_KEY=${this.config.SUPABASE_SERVICE_KEY}

# ===========================================
# STRIPE CONFIGURATION
# ===========================================
STRIPE_PUBLISHABLE_KEY=${this.config.STRIPE_PUBLISHABLE_KEY}
STRIPE_SECRET_KEY=${this.config.STRIPE_SECRET_KEY}
STRIPE_WEBHOOK_SECRET=${this.config.STRIPE_WEBHOOK_SECRET}

# ===========================================
# MONITORING & ERROR TRACKING
# ===========================================
${this.config.SENTRY_DSN ? `SENTRY_DSN=${this.config.SENTRY_DSN}` : '# SENTRY_DSN='}
${this.config.LOGFLARE_API_KEY ? `LOGFLARE_API_KEY=${this.config.LOGFLARE_API_KEY}` : '# LOGFLARE_API_KEY='}

# ===========================================
# ANALYTICS & METRICS
# ===========================================
${this.config.NEXT_PUBLIC_GA_MEASUREMENT_ID ? `NEXT_PUBLIC_GA_MEASUREMENT_ID=${this.config.NEXT_PUBLIC_GA_MEASUREMENT_ID}` : '# NEXT_PUBLIC_GA_MEASUREMENT_ID='}
${this.config.NEXT_PUBLIC_POSTHOG_KEY ? `NEXT_PUBLIC_POSTHOG_KEY=${this.config.NEXT_PUBLIC_POSTHOG_KEY}` : '# NEXT_PUBLIC_POSTHOG_KEY='}

# ===========================================
# SECURITY & AUTHENTICATION
# ===========================================
NEXTAUTH_SECRET=${this.config.NEXTAUTH_SECRET}
NEXT_PUBLIC_RATE_LIMIT_ENABLED=true

# ===========================================
# NOTIFICATION SERVICES
# ===========================================
${this.config.SLACK_WEBHOOK ? `SLACK_WEBHOOK=${this.config.SLACK_WEBHOOK}` : '# SLACK_WEBHOOK='}
${this.config.RESEND_API_KEY ? `RESEND_API_KEY=${this.config.RESEND_API_KEY}` : '# RESEND_API_KEY='}

# ===========================================
# EXTERNAL SERVICES
# ===========================================
${this.config.UPSTASH_REDIS_URL ? `UPSTASH_REDIS_URL=${this.config.UPSTASH_REDIS_URL}` : '# UPSTASH_REDIS_URL='}
${this.config.UPSTASH_REDIS_TOKEN ? `UPSTASH_REDIS_TOKEN=${this.config.UPSTASH_REDIS_TOKEN}` : '# UPSTASH_REDIS_TOKEN='}

# ===========================================
# DEPLOYMENT CONFIGURATION
# ===========================================
VERCEL_TOKEN=${this.config.VERCEL_TOKEN}
VERCEL_ORG_ID=${this.config.VERCEL_ORG_ID}
VERCEL_PROJECT_ID=${this.config.VERCEL_PROJECT_ID}
${this.config.SNYK_TOKEN ? `SNYK_TOKEN=${this.config.SNYK_TOKEN}` : '# SNYK_TOKEN='}

# ===========================================
# APPLICATION CONFIGURATION
# ===========================================
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_APP_VERSION=1.0.0

# ===========================================
# FEATURE FLAGS
# ===========================================
NEXT_PUBLIC_ENABLE_PERFORMANCE_DASHBOARD=true
NEXT_PUBLIC_ENABLE_PRIVACY_DASHBOARD=true
NEXT_PUBLIC_ENABLE_RUM=true
NEXT_PUBLIC_ENABLE_ERROR_BOUNDARIES=true
NEXT_PUBLIC_COOKIE_CONSENT_VERSION=1.0

# ===========================================
# PRIVACY & COMPLIANCE
# ===========================================
NEXT_PUBLIC_PRIVACY_POLICY_URL=/privacy
NEXT_PUBLIC_TERMS_URL=/terms
NEXT_PUBLIC_DPA_URL=/data-processing-agreement

# ===========================================
# API RATE LIMITS
# ===========================================
NEXT_PUBLIC_RATE_LIMIT_AUTH_REQUESTS_PER_MINUTE=10
NEXT_PUBLIC_RATE_LIMIT_API_REQUESTS_PER_MINUTE=100
NEXT_PUBLIC_RATE_LIMIT_CONTACT_REQUESTS_PER_HOUR=5
NEXT_PUBLIC_RATE_LIMIT_DSAR_REQUESTS_PER_HOUR=3
`;
  }

  generateEnvTemplate() {
    return `# Environment Variables Template
# Copy this file to .env.production and .env.local
# Fill in your actual values for production deployment

# ===========================================
# SUPABASE CONFIGURATION
# ===========================================
# Get these from your Supabase project settings
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key

# ===========================================
# STRIPE CONFIGURATION
# ===========================================
# Get these from your Stripe dashboard
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# ===========================================
# MONITORING & ERROR TRACKING
# ===========================================
# Sentry DSN for error tracking
SENTRY_DSN=https://your-dsn@sentry.io/project-id

# ===========================================
# ANALYTICS & METRICS
# ===========================================
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# ===========================================
# SECURITY & AUTHENTICATION
# ===========================================
# Generate this with: openssl rand -base64 32
NEXTAUTH_SECRET=your-nextauth-secret

# ===========================================
# NOTIFICATION SERVICES
# ===========================================
# Slack webhook for deployment notifications
SLACK_WEBHOOK=https://hooks.slack.com/services/...

# ===========================================
# EXTERNAL SERVICES
# ===========================================
# Vercel deployment
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-vercel-org-id
VERCEL_PROJECT_ID=your-vercel-project-id

# ===========================================
# APPLICATION CONFIGURATION
# ===========================================
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_APP_VERSION=1.0.0

# ===========================================
# FEATURE FLAGS
# ===========================================
NEXT_PUBLIC_ENABLE_PERFORMANCE_DASHBOARD=true
NEXT_PUBLIC_ENABLE_PRIVACY_DASHBOARD=true
NEXT_PUBLIC_ENABLE_RUM=true
NEXT_PUBLIC_ENABLE_ERROR_BOUNDARIES=true

# ===========================================
# PRIVACY & COMPLIANCE
# ===========================================
NEXT_PUBLIC_PRIVACY_POLICY_URL=/privacy
NEXT_PUBLIC_TERMS_URL=/terms
`;
  }

  async showNextSteps() {
    log('\n📋 Next Steps for Production Deployment:');
    log('=' * 50);

    log('\n1. 🏗️  Set up Infrastructure:');
    log('   • Create Supabase project if not already done');
    log('   • Set up Stripe account and webhooks');
    log('   • Create Sentry project for error tracking');
    log('   • Set up Vercel project and connect to repository');

    log('\n2. 🔐  Configure GitHub Secrets:');
    log('   • Go to repository → Settings → Secrets and variables → Actions');
    log('   • Add all secrets from .env.production');
    log('   • Required secrets: VERCEL_TOKEN, SUPABASE_ANON_KEY, etc.');

    log('\n3. 🗄️  Database Setup:');
    log('   • Run database migrations: npm run db:migrate');
    log('   • Set up Row Level Security policies');
    log('   • Create initial admin user if needed');

    log('\n4. 🧪  Run Final Tests:');
    log('   • Run deployment checklist: node scripts/deployment-checklist.js');
    log('   • Execute tests: npm run ci:test');
    log('   • Build application: npm run ci:build');

    log('\n5. 🚀  Deploy to Production:');
    log('   • Push to main branch to trigger deployment');
    log('   • Monitor deployment in GitHub Actions');
    log('   • Run smoke tests on production');

    log('\n6. 📊  Monitor and Maintain:');
    log('   • Set up monitoring dashboards');
    log('   • Configure alerting rules');
    log('   • Set up automated backups');
    log('   • Schedule regular security audits');

    log('\n🔗 Quick Start Commands:');
    log('  npm run setup              # Install dependencies');
    log('  node scripts/setup-production.js  # Run this setup');
    log('  npm run db:migrate           # Run database migrations');
    log('  npm run ci:test             # Run all tests');
    log('  npm run ci:build            # Build for production');
    log('  git push origin main         # Deploy to production');

    log('\n📚 Documentation:');
    log('  • Environment variables configured in .env.production');
    log('  • Deployment guide available in DEPLOYMENT.md');
    log('  • Monitoring setup in MONITORING.md');
    log('  • Security guidelines in SECURITY.md');

    log('\n⚠️  Important Notes:');
    log('  • Never commit .env.production to version control');
    log('  • Keep backup of all secrets in secure location');
    log('  • Regularly rotate secrets and API keys');
    log('  • Monitor GitHub Actions for deployment status');
    log('  • Set up proper error monitoring and alerting');

    log('\n🎉 You\'re all set for production deployment!');
  }
}

// Main execution
if (require.main === module) {
  const setup = new ProductionSetup();
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

module.exports = ProductionSetup;