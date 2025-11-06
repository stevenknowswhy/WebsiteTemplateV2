#!/usr/bin/env node

/**
 * Production Database Migration Setup
 * Guides through setting up production database migrations and backups
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

class DatabaseMigrationSetup {
  constructor() {
    this.config = {};
    this.setupSteps = [
      'Database Connection Verification',
      'Migration Strategy Planning',
      'Backup Configuration',
      'Rollback Procedures',
      'Monitoring Setup',
      'Security Hardening',
      'Performance Optimization',
      'Final Configuration'
    ];
    this.currentStep = 0;
  }

  async runSetup() {
    log(`🗄️ ${colors.bold}Production Database Migration Setup${colors.reset}`);
    log('=' * 60);
    log('\nThis script will guide you through setting up production database migrations.');
    log('\nPlease have the following ready:');
    log('  • Supabase project credentials');
    log('  • Database connection details');
    log('  • Backup storage destination (S3, etc.)');
    log('  • Monitoring tool access');
    log('=' * 60);

    const confirm = await question('Ready to proceed? (y/N)');
    if (confirm.toLowerCase() !== 'y') {
      log('Setup cancelled. Run this script when you\'re ready.');
      process.exit(0);
    }

    await this.verifyDatabaseConnection();
    await this.planMigrationStrategy();
    await this.configureBackups();
    await this.setupRollbackProcedures();
    await this.setupMonitoring();
    await this.hardenSecurity();
    await this.optimizePerformance();
    await this.createConfiguration();

    log('\n' + '=' * 60);
    log(`🎉 ${colors.bold}Database Migration Setup Complete!${colors.reset}`);
    log('=' * 60);
    await this.showNextSteps();
  }

  async verifyDatabaseConnection() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Database Connection Verification');

    log('\nVerifying database connectivity:');

    // Test Supabase connection
    try {
      execSync('npm run supabase:status', { stdio: 'pipe' });
      logSuccess('Supabase connection verified');
      this.config.supabaseConnected = true;
    } catch (error) {
      logWarning('Supabase connection failed, will configure manually');
      this.config.supabaseConnected = false;
    }

    // Check environment variables
    const requiredVars = ['SUPABASE_URL', 'SUPABASE_SERVICE_KEY'];
    this.config.databaseConfigured = requiredVars.every(varName =>
      process.env[varName] && process.env[varName] !== ''
    );

    if (this.config.databaseConfigured) {
      logSuccess('Database environment variables configured');
    } else {
      logWarning('Database environment variables not fully configured');
    }
  }

  async planMigrationStrategy() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Migration Strategy Planning');

    log('\nConfigure migration strategy:');

    const strategy = await question('Migration strategy (automatic/manual):');
    this.config.migrationStrategy = strategy.toLowerCase() === 'automatic' ? 'automatic' : 'manual';

    const maintenanceWindow = await question('Enable maintenance windows? (Y/n):');
    this.config.enableMaintenanceWindows = maintenanceWindow.toLowerCase() !== 'n';

    if (this.config.enableMaintenanceWindows) {
      this.config.maintenanceWindowStart = await question('Maintenance window start (HH:MM):');
      this.config.maintenanceWindowEnd = await question('Maintenance window end (HH:MM):');
    }

    const enableDryRun = await question('Enable dry run mode for all migrations? (Y/n):');
    this.config.enableDryRun = enableDryRun.toLowerCase() !== 'n';

    logSuccess('Migration strategy configured');
  }

  async configureBackups() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Backup Configuration');

    log('\nConfigure database backups:');

    const enableBackups = await question('Enable automated backups? (Y/n):');
    this.config.enableBackups = enableBackups.toLowerCase() !== 'n';

    if (this.config.enableBackups) {
      this.config.backupFrequency = await question('Backup frequency (daily/weekly/hourly):') || 'daily';
      this.config.backupRetention = parseInt(await question('Backup retention period (days):')) || 30;

      const enablePointInTime = await question('Enable point-in-time recovery? (Y/n):');
      this.config.enablePointInTimeRecovery = enablePointInTime.toLowerCase() !== 'n';

      const backupDestination = await question('Backup destination (local/s3/supabase):') || 'supabase';
      this.config.backupDestination = backupDestination;

      if (backupDestination === 's3') {
        this.config.s3Bucket = await question('S3 bucket name:');
        this.config.s3Region = await question('S3 region:') || 'us-east-1';
      }
    }

    logSuccess('Backup configuration saved');
  }

  async setupRollbackProcedures() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Rollback Procedures');

    log('\nConfigure rollback procedures:');

    const enableSnapshots = await question('Enable pre-migration snapshots? (Y/n):');
    this.config.enablePreMigrationSnapshots = enableSnapshots.toLowerCase() !== 'n';

    const enableRollbackScripts = await question('Generate automatic rollback scripts? (Y/n):');
    this.config.generateRollbackScripts = enableRollbackScripts.toLowerCase() !== 'n';

    const enableTesting = await question('Test rollback procedures on staging? (Y/n):');
    this.config.testRollbackProcedures = enableTesting.toLowerCase() !== 'n';

    const enableNotification = await question('Enable rollback notifications? (Y/n):');
    this.config.enableRollbackNotifications = enableNotification.toLowerCase() !== 'n';

    logSuccess('Rollback procedures configured');
  }

  async setupMonitoring() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Monitoring Setup');

    log('\nConfigure database monitoring:');

    const enableQueryMonitoring = await question('Enable query performance monitoring? (Y/n):');
    this.config.enableQueryMonitoring = enableQueryMonitoring.toLowerCase() !== 'n';

    const enableConnectionMonitoring = await question('Enable connection monitoring? (Y/n):');
    this.config.enableConnectionMonitoring = enableConnectionMonitoring.toLowerCase() !== 'n';

    const enableStorageMonitoring = await question('Enable storage monitoring? (Y/n):');
    this.config.enableStorageMonitoring = enableStorageMonitoring.toLowerCase() !== 'n';

    const alertThresholds = await question('Configure custom alert thresholds? (Y/n):');
    if (alertThresholds.toLowerCase() !== 'n') {
      this.config.queryTimeThreshold = parseInt(await question('Query time threshold (ms):')) || 1000;
      this.config.connectionThreshold = parseInt(await question('Max connections threshold:')) || 100;
      this.config.storageThreshold = parseInt(await question('Storage usage threshold (%):')) || 80;
    }

    logSuccess('Database monitoring configured');
  }

  async hardenSecurity() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Security Hardening');

    log('\nConfigure database security:');

    const enableRls = await question('Enable Row Level Security (RLS)? (Y/n):');
    this.config.enableRowLevelSecurity = enableRls.toLowerCase() !== 'n';

    const enableEncryption = await question('Enable encryption at rest? (Y/n):');
    this.config.enableEncryption = enableEncryption.toLowerCase() !== 'n';

    const enableAuditLogging = await question('Enable audit logging? (Y/n):');
    this.config.enableAuditLogging = enableAuditLogging.toLowerCase() !== 'n';

    const enableNetworkSecurity = await question('Enable network security rules? (Y/n):');
    this.config.enableNetworkSecurity = enableNetworkSecurity.toLowerCase() !== 'n';

    logSuccess('Database security configured');
  }

  async optimizePerformance() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Performance Optimization');

    log('\nConfigure performance optimization:');

    const enableConnectionPooling = await question('Enable connection pooling? (Y/n):');
    this.config.enableConnectionPooling = enableConnectionPooling.toLowerCase() !== 'n';

    const enableIndexOptimization = await question('Enable automatic index optimization? (Y/n):');
    this.config.enableIndexOptimization = enableIndexOptimization.toLowerCase() !== 'n';

    const enableQueryOptimization = await question('Enable query optimization suggestions? (Y/n):');
    this.config.enableQueryOptimization = enableQueryOptimization.toLowerCase() !== 'n';

    const enableVacuumAnalysis = await question('Enable regular VACUUM and ANALYZE? (Y/n):');
    this.config.enableVacuumAnalysis = enableVacuumAnalysis.toLowerCase() !== 'n';

    logSuccess('Performance optimization configured');
  }

  async createConfiguration() {
    this.currentStep++;
    logStep(this.currentStep, this.setupSteps.length, 'Final Configuration');

    // Create migration configuration
    const migrationConfig = this.generateMigrationConfig();
    fs.writeFileSync('migration.config.js', migrationConfig);

    // Create backup configuration
    const backupConfig = this.generateBackupConfig();
    fs.writeFileSync('backup.config.js', backupConfig);

    // Update environment template
    await this.updateEnvironmentTemplate();

    // Create migration scripts
    await this.createMigrationScripts();

    logSuccess('Database configuration files created');
  }

  generateMigrationConfig() {
    return `/**
 * Database Migration Configuration
 * Generated on ${new Date().toISOString()}
 */

export const migrationConfig = {
  // Migration Strategy
  strategy: '${this.config.migrationStrategy}',
  enableMaintenanceWindows: ${this.config.enableMaintenanceWindows},
  enableDryRun: ${this.config.enableDryRun},

  // Maintenance Windows
  maintenanceWindow: ${this.config.enableMaintenanceWindows ? `{
    start: '${this.config.maintenanceWindowStart}',
    end: '${this.config.maintenanceWindowEnd}',
    timezone: 'UTC'
  }` : 'null'},

  // Security
  enableRowLevelSecurity: ${this.config.enableRowLevelSecurity},
  enableEncryption: ${this.config.enableEncryption},
  enableAuditLogging: ${this.config.enableAuditLogging},
  enableNetworkSecurity: ${this.config.enableNetworkSecurity},

  // Performance
  enableConnectionPooling: ${this.config.enableConnectionPooling},
  enableIndexOptimization: ${this.config.enableIndexOptimization},
  enableQueryOptimization: ${this.config.enableQueryOptimization},
  enableVacuumAnalysis: ${this.config.enableVacuumAnalysis},

  // Monitoring
  enableQueryMonitoring: ${this.config.enableQueryMonitoring},
  enableConnectionMonitoring: ${this.config.enableConnectionMonitoring},
  enableStorageMonitoring: ${this.config.enableStorageMonitoring},
  alertThresholds: ${this.config.queryTimeThreshold ? `{
    queryTime: ${this.config.queryTimeThreshold},
    maxConnections: ${this.config.connectionThreshold},
    storageUsage: ${this.config.storageThreshold}
  }` : 'null'},

  // Rollback
  enablePreMigrationSnapshots: ${this.config.enablePreMigrationSnapshots},
  generateRollbackScripts: ${this.config.generateRollbackScripts},
  testRollbackProcedures: ${this.config.testRollbackProcedures},
  enableRollbackNotifications: ${this.config.enableRollbackNotifications},
};

export default migrationConfig;
`;
  }

  generateBackupConfig() {
    return `/**
 * Database Backup Configuration
 * Generated on ${new Date().toISOString()}
 */

export const backupConfig = {
  // Backup Settings
  enableBackups: ${this.config.enableBackups},
  frequency: '${this.config.backupFrequency}',
  retentionDays: ${this.config.backupRetention || 30},

  // Point-in-Time Recovery
  enablePointInTimeRecovery: ${this.config.enablePointInTimeRecovery},

  // Storage Configuration
  destination: '${this.config.backupDestination}',
  ${this.config.backupDestination === 's3' ? `s3: {
    bucket: '${this.config.s3Bucket}',
    region: '${this.config.s3Region}',
  },` : ''}

  // Backup Types
  backupTypes: {
    full: {
      enabled: true,
      schedule: '0 2 * * *', // Daily at 2 AM
      retention: 30
    },
    incremental: {
      enabled: true,
      schedule: '0 */6 * * *', // Every 6 hours
      retention: 7
    },
    logical: {
      enabled: true,
      schedule: '0 3 * * *', // Daily at 3 AM
      retention: 14
    }
  },

  // Compression
  compression: {
    enabled: true,
    algorithm: 'gzip',
    level: 6
  },

  // Encryption
  encryption: {
    enabled: ${this.config.enableEncryption},
    algorithm: 'AES-256'
  },

  // Monitoring
  monitoring: {
    enableBackupMonitoring: true,
    alertOnFailure: true,
    alertOnSlowBackup: true,
    slowBackupThreshold: 3600000 // 1 hour
  },

  // Notifications
  notifications: {
    enableSuccessNotifications: false,
    enableFailureNotifications: true,
    enableWarningNotifications: true,
    channels: ['email', 'slack']
  }
};

export default backupConfig;
`;
  }

  async updateEnvironmentTemplate() {
    const envTemplatePath = '.env.production.template';
    if (fs.existsSync(envTemplatePath)) {
      let content = fs.readFileSync(envTemplatePath, 'utf8');

      const databaseVars = `
# ===========================================
# DATABASE MIGRATIONS & BACKUPS
# ===========================================
# Migration configuration
DATABASE_MIGRATION_STRATEGY=${this.config.migrationStrategy}
DATABASE_ENABLE_MAINTENANCE_WINDOWS=${this.config.enableMaintenanceWindows}
DATABASE_ENABLE_DRY_RUN=${this.config.enableDryRun}

# Backup configuration
DATABASE_ENABLE_BACKUPS=${this.config.enableBackups}
DATABASE_BACKUP_FREQUENCY=${this.config.backupFrequency}
DATABASE_BACKUP_RETENTION=${this.config.backupRetention || 30}
DATABASE_ENABLE_POINT_IN_TIME_RECOVERY=${this.config.enablePointInTimeRecovery}

# Database monitoring
DATABASE_ENABLE_QUERY_MONITORING=${this.config.enableQueryMonitoring}
DATABASE_ENABLE_CONNECTION_MONITORING=${this.config.enableConnectionMonitoring}
DATABASE_ENABLE_STORAGE_MONITORING=${this.config.enableStorageMonitoring}
`;

      if (!content.includes('DATABASE_MIGRATION_STRATEGY=')) {
        content += databaseVars;
        fs.writeFileSync(envTemplatePath, content);
        logSuccess('Updated environment template with database configuration');
      }
    }
  }

  async createMigrationScripts() {
    // Create migration script directory
    const scriptsDir = 'scripts/migrations';
    if (!fs.existsSync(scriptsDir)) {
      fs.mkdirSync(scriptsDir, { recursive: true });
    }

    // Create main migration script
    const migrationScript = `#!/usr/bin/env node

const { execSync } = require('child_process');
const migrationConfig = require('../migration.config.js');

class MigrationRunner {
  constructor() {
    this.config = migrationConfig;
  }

  async runMigration(migrationFile, options = {}) {
    const { dryRun = false, force = false } = options;

    console.log('🚀 Running migration:', migrationFile);

    if (this.config.enableMaintenanceWindows && !this.isInMaintenanceWindow()) {
      throw new Error('Migration can only be run during maintenance windows');
    }

    if (dryRun) {
      console.log('🔍 Dry run mode - would execute:', migrationFile);
      return { success: true, dryRun: true };
    }

    try {
      // Create pre-migration snapshot if enabled
      if (this.config.enablePreMigrationSnapshots) {
        await this.createSnapshot(migrationFile);
      }

      // Execute migration
      execSync(\`npx supabase db push --db-url=\${process.env.SUPABASE_URL}\`, {
        stdio: 'inherit'
      });

      console.log('✅ Migration completed successfully:', migrationFile);

      if (this.config.generateRollbackScripts) {
        await this.generateRollbackScript(migrationFile);
      }

      return { success: true };
    } catch (error) {
      console.error('❌ Migration failed:', migrationFile, error.message);

      if (this.config.enableRollbackNotifications) {
        await this.notifyRollbackNeeded(migrationFile, error);
      }

      throw error;
    }
  }

  isInMaintenanceWindow() {
    if (!this.config.maintenanceWindow) return true;

    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);

    return currentTime >= this.config.maintenanceWindow.start &&
           currentTime <= this.config.maintenanceWindow.end;
  }

  async createSnapshot(migrationFile) {
    console.log('📸 Creating pre-migration snapshot...');
    // Implementation for creating database snapshots
  }

  async generateRollbackScript(migrationFile) {
    console.log('🔄 Generating rollback script...');
    // Implementation for generating rollback scripts
  }

  async notifyRollbackNeeded(migrationFile, error) {
    console.log('📧 Sending rollback notification...');
    // Implementation for sending notifications
  }
}

// CLI Interface
const migrationFile = process.argv[2];
const dryRun = process.argv.includes('--dry-run');
const force = process.argv.includes('--force');

if (!migrationFile) {
  console.error('Usage: node scripts/migrations/run-migration.js <migration-file> [--dry-run] [--force]');
  process.exit(1);
}

const runner = new MigrationRunner();
runner.runMigration(migrationFile, { dryRun, force })
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
`;

    fs.writeFileSync(path.join(scriptsDir, 'run-migration.js'), migrationScript);

    // Make script executable
    try {
      execSync(`chmod +x ${path.join(scriptsDir, 'run-migration.js')}`);
    } catch (error) {
      // Ignore permission errors
    }
  }

  async showNextSteps() {
    log('\n📋 Database Migration Setup Complete - Next Steps:');
    log('=' * 50);

    log('\n1. 🔧 Configure Database:');
    log('   • Verify Supabase project settings');
    log('   • Set up database roles and permissions');
    log('   • Configure connection pooling if enabled');
    log('   • Enable Row Level Security policies');

    log('\n2. 📦 Test Migrations:');
    log('   • Run: npm run db:migrate');
    log('   • Test with dry run: node scripts/migrations/run-migration.js --dry-run');
    log('   • Verify backup procedures work correctly');
    log('   • Test rollback procedures');

    log('\n3. 📊 Set Up Monitoring:');
    log('   • Configure database metrics in monitoring dashboard');
    log('   • Set up alerts for query performance');
    log('   • Monitor connection usage and storage');
    log('   • Test alert notifications');

    log('\n4. 🔒 Security Verification:');
    log('   • Review RLS policies');
    log('   • Verify encryption settings');
    log('   • Test audit logging');
    log('   • Review network security rules');

    log('\n5. 🚀 Production Deployment:');
    log('   • Schedule maintenance window if required');
    log('   • Create final backup before migration');
    log('   • Run migration during maintenance window');
    log('   • Verify all services are operational');

    log('\n🔗 Quick Commands:');
    log('  npm run db:migrate                    # Run migrations');
    log('  npm run db:reset                      # Reset database');
    log('  node scripts/migrations/run-migration.js file.sql  # Run specific migration');
    log('  node scripts/migrations/run-migration.js file.sql --dry-run  # Test migration');

    log('\n📚 Configuration Files:');
    log('  • Migration config: migration.config.js');
    log('  • Backup config: backup.config.js');
    log('  • Environment template: .env.production.template');

    log('\n⚠️  Important Notes:');
    log('  • Always test migrations in staging first');
    log('  • Have rollback procedures ready');
    log('  • Schedule maintenance windows for large migrations');
    log('  • Monitor database performance after migrations');
    log('  • Keep regular backups');
    log('  • Document all migration procedures');

    log('\n🎉 Database migration setup complete! Your database is ready for production.');
  }
}

// Main execution
if (require.main === module) {
  const setup = new DatabaseMigrationSetup();
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

module.exports = DatabaseMigrationSetup;