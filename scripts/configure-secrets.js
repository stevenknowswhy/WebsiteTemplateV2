#!/usr/bin/env node

/**
 * Secrets Configuration Guide
 * Shows exactly where to configure each secret for different platforms
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

function logSection(title) {
  log(`\n${colors.bold}=== ${title} ===${colors.reset}`);
}

function logPlatform(name, url) {
  log(`\n${colors.cyan}📱 ${name}${colors.reset}`);
  log(`URL: ${colors.blue}${url}${colors.reset}`);
}

class SecretsConfiguration {
  constructor() {
    this.secrets = this.getSecretsList();
    this.platforms = ['GitHub', 'Vercel', 'Supabase', 'Local Development'];
  }

  getSecretsList() {
    return {
      // Supabase Secrets
      SUPABASE_ANON_KEY: {
        description: 'Supabase anonymous key for client-side access',
        required: true,
        platform: 'supabase',
        sensitivity: 'high',
        format: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      },
      SUPABASE_SERVICE_KEY: {
        description: 'Supabase service role key for server-side operations',
        required: true,
        platform: 'supabase',
        sensitivity: 'high',
        format: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      },
      SUPABASE_URL: {
        description: 'Supabase project URL',
        required: true,
        platform: 'supabase',
        sensitivity: 'medium',
        format: 'https://your-project.supabase.co'
      },

      // Stripe Secrets
      STRIPE_PUBLISHABLE_KEY: {
        description: 'Stripe publishable key for client-side usage',
        required: true,
        platform: 'stripe',
        sensitivity: 'high',
        format: 'pk_test_... or pk_live_...'
      },
      STRIPE_SECRET_KEY: {
        description: 'Stripe secret key for server-side operations',
        required: true,
        platform: 'stripe',
        sensitivity: 'high',
        format: 'sk_test_... or sk_live_...'
      },
      STRIPE_WEBHOOK_SECRET: {
        description: 'Stripe webhook secret for verifying webhook events',
        required: true,
        platform: 'stripe',
        sensitivity: 'high',
        format: 'whsec_...'
      },

      // Authentication & Security
      NEXTAUTH_SECRET: {
        description: 'Secret key for NextAuth.js session encryption',
        required: true,
        platform: 'generate',
        sensitivity: 'high',
        format: '32-character base64 string'
      },
      NEXTAUTH_URL: {
        description: 'Base URL for NextAuth.js (auto-detected in production)',
        required: false,
        platform: 'vercel',
        sensitivity: 'low',
        format: 'https://your-domain.com'
      },

      // Monitoring & Error Tracking
      SENTRY_DSN: {
        description: 'Sentry Data Source Name for error tracking',
        required: false,
        platform: 'sentry',
        sensitivity: 'medium',
        format: 'https://your-dsn@sentry.io/project-id'
      },
      LOGFLARE_API_KEY: {
        description: 'Logflare API key for structured logging',
        required: false,
        platform: 'logflare',
        sensitivity: 'medium',
        format: 'your-logflare-api-key'
      },

      // Analytics
      NEXT_PUBLIC_GA_MEASUREMENT_ID: {
        description: 'Google Analytics 4 measurement ID',
        required: false,
        platform: 'google',
        sensitivity: 'low',
        format: 'G-XXXXXXXXXX'
      },
      NEXT_PUBLIC_POSTHOG_KEY: {
        description: 'PostHog API key for product analytics',
        required: false,
        platform: 'posthog',
        sensitivity: 'low',
        format: 'phc_...'
      },

      // External Services
      UPSTASH_REDIS_URL: {
        description: 'Upstash Redis URL for rate limiting',
        required: true,
        platform: 'upstash',
        sensitivity: 'high',
        format: 'redis://:...'
      },
      UPSTASH_REDIS_TOKEN: {
        description: 'Upstash Redis authentication token',
        required: true,
        platform: 'upstash',
        sensitivity: 'high',
        format: 'your-redis-token'
      },

      // Email & Notifications
      RESEND_API_KEY: {
        description: 'Resend API key for email services',
        required: false,
        platform: 'resend',
        sensitivity: 'high',
        format: 're_...'
      },
      SLACK_WEBHOOK: {
        description: 'Slack webhook URL for deployment notifications',
        required: false,
        platform: 'slack',
        sensitivity: 'low',
        format: 'https://hooks.slack.com/services/...'
      },

      // Deployment
      VERCEL_TOKEN: {
        description: 'Vercel API token for deployment automation',
        required: true,
        platform: 'vercel',
        sensitivity: 'high',
        format: 'your-vercel-api-token'
      },
      VERCEL_ORG_ID: {
        description: 'Vercel organization ID',
        required: true,
        platform: 'vercel',
        sensitivity: 'medium',
        format: 'your-vercel-org-id'
      },
      VERCEL_PROJECT_ID: {
        description: 'Vercel project ID',
        required: true,
        platform: 'vercel',
        sensitivity: 'medium',
        format: 'your-vercel-project-id'
      },

      // Security Scanning
      SNYK_TOKEN: {
        description: 'Snyk token for security vulnerability scanning',
        required: false,
        platform: 'snyk',
        sensitivity: 'high',
        format: 'your-snyk-api-token'
      },

      // Storage (Optional)
      AWS_ACCESS_KEY_ID: {
        description: 'AWS access key ID for S3 file uploads',
        required: false,
        platform: 'aws',
        sensitivity: 'high',
        format: 'AKIA...'
      },
      AWS_SECRET_ACCESS_KEY: {
        description: 'AWS secret access key for S3 file uploads',
        required: false,
        platform: 'aws',
        sensitivity: 'high',
        format: 'your-aws-secret-key'
      }
    };
  }

  generateGitHubActionsConfig() {
    logSection('GitHub Actions Secrets Configuration');

    logPlatform('GitHub', 'https://github.com');

    log('\n📍 Navigate to:');
    log('  1. Your repository → Settings → Secrets and variables → Actions');
    log('  2. Click "New repository secret"');

    log('\n📋 Required Secrets for CI/CD:');
    logSection('Required for GitHub Actions');

    const requiredSecrets = Object.entries(this.secrets)
      .filter(([_, config]) => config.required && ['github', 'vercel'].includes(config.platform))
      .sort((a, b) => a[0].localeCompare(b[0]));

    requiredSecrets.forEach(([key, config]) => {
      log(`\n${colors.green}🔑 ${key}${colors.reset}`);
      log(`   Description: ${config.description}`);
      log(`   Format: ${config.format}`);
      log(`   Sensitivity: ${config.sensitivity.toUpperCase()}`);
      log(`   ${colors.yellow}⚠️  Required for: ${this.getRequiredFor(key)}${colors.reset}`);
    });

    log('\n📝 Optional Secrets (enhance functionality):');
    const optionalSecrets = Object.entries(this.secrets)
      .filter(([_, config]) => !config.required && ['github', 'vercel'].includes(config.platform))
      .sort((a, b) => a[0].localeCompare(b[0]));

    optionalSecrets.forEach(([key, config]) => {
      log(`\n${colors.yellow}🔑 ${key}${colors.reset}`);
      log(`   Description: ${config.description}`);
      log(`   Format: ${config.format}`);
      log(`   Sensitivity: ${config.sensitivity.toUpperCase()}`);
    });

    log('\n🚀 Quick Setup Commands:');
    log('  gh secret set STRIPE_SECRET_KEY --body "your-stripe-secret-key"');
    log('  gh secret set SUPABASE_ANON_KEY --body "your-supabase-anon-key"');
    log('  gh secret set SUPABASE_SERVICE_KEY --body "your-supabase-service-key"');
    log('  gh secret set VERCEL_TOKEN --body "your-vercel-token"');
  }

  generateVercelConfig() {
    logSection('Vercel Environment Variables Configuration');

    logPlatform('Vercel', 'https://vercel.com');

    log('\n📍 Navigate to:');
    log('  1. Your project → Settings → Environment Variables');
    log('  2. Select the appropriate environment (Production, Preview, Development)');

    log('\n📋 Production Environment Variables:');
    const productionVars = Object.entries(this.secrets)
      .filter(([key, _]) => key.startsWith('NEXT_PUBLIC_') || key.includes('SECRET'))
      .sort((a, b) => a[0].localeCompare(b[0]));

    productionVars.forEach(([key, config]) => {
      const envType = key.startsWith('NEXT_PUBLIC_') ? 'Public' : 'Secret';
      const color = envType === 'Public' ? 'green' : 'yellow';
      log(`\n${color}${envType.toUpperCase()}${colors.reset}: ${key}`);
      log(`   Description: ${config.description}`);
      log(`   Environment: Production`);
      if (envType === 'Secret') {
        log(`   ${colors.yellow}⚠️  Will be encrypted and not exposed to clients${colors.reset}`);
      }
    });

    log('\n📋 Preview/Development Environment Variables:');
    log('  • Set up separate variables for each environment');
    log('  • Use different keys for testing (e.g., Stripe test keys)');
    log('  • Enable debug features in development');

    log('\n⚙️  Environment Groups:');
    log('  Production: Live production settings');
    log('  Preview: Pull request and branch deployments');
    log('  Development: Local development overrides');
  }

  generateSupabaseConfig() {
    logSection('Supabase Configuration');

    logPlatform('Supabase', 'https://app.supabase.com');

    log('\n📍 Navigate to:');
    log('  1. Your project → Settings → API');
    log('  2. Find Project Reference section');

    log('\n📋 Required Settings:');

    log('\n1. Project Configuration:');
    log('   Project URL: Add to .env as NEXT_PUBLIC_SUPABASE_URL');
    log('   Project Reference: Copy for connection strings');

    log('\n2. API Keys:');
    log('   anon/public key: Add to .env as SUPABASE_ANON_KEY');
    log('   service_role key: Add to .env as SUPABASE_SERVICE_KEY');

    log('\n3. Database Settings:');
    log('   Connection string: For direct database connections');
    log('   Pool configuration: For production load');

    log('\n4. Authentication Settings:');
    log('   Site URL: Your application domain');
    log('   Redirect URLs: OAuth callback URLs');
    log('   JWT settings: Token expiration and claims');

    log('\n⚠️  Security Notes:');
    log('  • Never expose service_role key to client-side code');
    log('  • Use Row Level Security for data access control');
    log('  • Enable Multi-factor Authentication for admin users');
    log('  • Regularly rotate API keys');
    log('  • Use JWT with appropriate expiration times');
  }

  generateLocalDevelopmentConfig() {
    logSection('Local Development Configuration');

    log('\n📁 Create local environment files:');

    const localEnvContent = `# Local Development Environment
# Override production values for development
NODE_ENV=development
NEXT_PUBLIC_ENVIRONMENT=development

# Enable development tools
NEXT_PUBLIC_ENABLE_DEBUG=true
NEXT_PUBLIC_ENABLE_DEV_TOOLS=true

# Use test/staging keys
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Development monitoring (optional)
SENTRY_DSN= # Optional: use separate Sentry project for dev
NEXT_PUBLIC_POSTHOG_KEY= # Optional: use separate PostHog project for dev

# Local database (if using local Supabase)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
SUPABASE_ANON_KEY=local-dev-anon-key
SUPABASE_SERVICE_KEY=local-dev-service-key

# Redis for local rate limiting (optional)
UPSTASH_REDIS_URL=redis://localhost:6379
`;

    log('\nCreate .env.local with this content:');
    log(colors.cyan + localEnvContent + colors.reset);

    log('\n🔧 Development Setup Steps:');
    log('  1. Copy .env.template to .env.local');
    log('  2. Fill in your development keys');
    log('  3. Start local Supabase: npm run supabase:start');
    log('  4. Run development server: npm run dev');
    log('  5. Database migrations: npm run db:migrate');

    log('\n⚠️  Security Best Practices for Development:');
    log('  • Never commit .env.local to version control');
    log('  • Use separate projects for testing and production');
    log('  • Enable debug features only in development');
    log('  • Mock sensitive services when possible');
    log('  • Use local database for development');
  }

  generateSecretsChecklist() {
    logSection('Secrets Configuration Checklist');

    const secretsByPriority = {
      critical: [],
      high: [],
      medium: [],
      low: []
    };

    Object.entries(this.secrets).forEach(([key, config]) => {
      if (config.sensitivity === 'high') {
        if (config.required) {
          secretsByPriority.critical.push(key);
        } else {
          secretsByPriority.high.push(key);
        }
      } else if (config.sensitivity === 'medium') {
        secretsByPriority.medium.push(key);
      } else {
        secretsByPriority.low.push(key);
      }
    });

    log('\n🔴 CRITICAL SECRETS (Must be configured for production):');
    secretsByPriority.critical.forEach(secret => {
      log(`  ❌ ${secret}`);
    });

    log('\n🟠 HIGH SECRETS (Strongly recommended):');
    secretsByPriority.high.forEach(secret => {
      log(`  ⚠️  ${secret}`);
    });

    log('\n🟡 MEDIUM SECRETS (Recommended):');
    secretsByPriority.medium.forEach(secret => {
      log(`  ℹ️  ${secret}`);
    });

    log('\n🟢 LOW SECRETS (Optional):');
    secretsByPriority.low.forEach(secret => {
      log(`  📝 ${secret}`);
    });

    log('\n📊 Configuration Progress:');
    const total = Object.keys(this.secrets).length;
    const required = Object.values(this.secrets).filter(s => s.required).length;
    log(`  Total secrets: ${total}`);
    log(`  Required for basic functionality: ${required}`);
    log(`  Recommended for production: ${required + secretsByPriority.high.length}`);
    log(`  Full enterprise setup: ${total}`);
  }

  getRequiredFor(key) {
    const requirements = {
      VERCEL_TOKEN: 'Automated deployments via GitHub Actions',
      SUPABASE_ANON_KEY: 'Database connectivity and authentication',
      SUPABASE_SERVICE_KEY: 'Server-side database operations',
      STRIPE_SECRET_KEY: 'Payment processing',
      STRIPE_WEBHOOK_SECRET: 'Webhook verification',
      NEXTAUTH_SECRET: 'Authentication session security',
      UPSTASH_REDIS_URL: 'Rate limiting protection',
      UPSTASH_REDIS_TOKEN: 'Rate limiting authentication'
    };
    return requirements[key] || 'Production functionality';
  }

  generateSetupScript() {
    log('\n📜 Automated Setup Script:');
    log('Use node scripts/setup-production.js for guided configuration');

    const quickCommands = `
🚀 Quick Setup Commands:

# 1. Install dependencies
npm install

# 2. Run guided setup
node scripts/setup-production.js

# 3. Set up GitHub secrets
gh auth login
gh secret set STRIPE_SECRET_KEY --body "your-stripe-secret-key"
gh secret set SUPABASE_ANON_KEY --body "your-supabase-anon-key"
gh secret set SUPABASE_SERVICE_KEY --body "your-supabase-service-key"
gh secret set VERCEL_TOKEN --body "your-vercel-token"

# 4. Set up Vercel environment
vercel env add STRIPE_SECRET_KEY --environment=production
vercel env add SUPABASE_ANON_KEY --environment=production
vercel env add SUPABASE_SERVICE_KEY --environment=production

# 5. Run deployment checklist
node scripts/deployment-checklist.js

# 6. Deploy to production
git push origin main
`;

    log(colors.cyan + quickCommands + colors.reset);
  }

  showAllPlatforms() {
    log(`🔐 ${colors.bold}Complete Secrets Configuration Guide${colors.reset}`);
    log('=' * 80);

    this.generateSecretsChecklist();
    this.generateGitHubActionsConfig();
    this.generateVercelConfig();
    this.generateSupabaseConfig();
    this.generateLocalDevelopmentConfig();
    this.generateSetupScript();

    log('\n' + '=' * 80);
    log(`📚 ${colors.bold}Additional Resources:${colors.reset}`);
    log('\n📄 Documentation:');
    log('  • Environment variables: .env.production.template');
    log('  • Deployment guide: scripts/deployment-checklist.js');
    log('  • Setup script: scripts/setup-production.js');

    log('\n🔗 External Links:');
    log('  • Supabase: https://supabase.com/docs');
    log('  • Stripe: https://stripe.com/docs');
    log('  • Vercel: https://vercel.com/docs');
    log('  • GitHub Actions: https://docs.github.com/actions');
    log('  • Sentry: https://docs.sentry.io');
    log('  • Upstash: https://upstash.com/docs');

    log('\n⚠️  Security Best Practices:');
    log('  • Use environment-specific keys (test vs production)');
    log('  • Regularly rotate all secrets and API keys');
    log('  • Use the principle of least privilege for key permissions');
    log('  • Monitor usage and set up alerts for suspicious activity');
    log('  • Implement proper key revocation procedures');
    log('  • Keep backup of secrets in secure, offline storage');

    log('\n🎉 Ready for Production!');
    log('Once you\'ve configured all critical secrets, your application is ready for deployment.');
  }
}

// Main execution
if (require.main === module) {
  const config = new SecretsConfiguration();
  const platform = process.argv[2];

  switch (platform) {
    case 'github':
      config.generateGitHubActionsConfig();
      break;
    case 'vercel':
      config.generateVercelConfig();
      break;
    case 'supabase':
      config.generateSupabaseConfig();
      break;
    case 'local':
      config.generateLocalDevelopmentConfig();
      break;
    case 'checklist':
      config.generateSecretsChecklist();
      break;
    default:
      config.showAllPlatforms();
  }
}

module.exports = SecretsConfiguration;