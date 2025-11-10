# Standard Operating Procedures (SOP) Runbook

This comprehensive runbook provides step-by-step procedures for managing the Forhem PBC Admin Panel, including daily operations, incident response, maintenance, and troubleshooting.

## Table of Contents

1. [Daily Operations](#daily-operations)
2. [Incident Response](#incident-response)
3. [System Maintenance](#system-maintenance)
4. [User Management](#user-management)
5. [Backup and Recovery](#backup-and-recovery)
6. [Security Procedures](#security-procedures)
7. [Monitoring and Alerting](#monitoring-and-alerting)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Escalation Procedures](#escalation-procedures)
10. [Compliance and Auditing](#compliance-and-auditing)

## Daily Operations

### Morning Checklist (9:00 AM)

#### 1. System Health Check
```bash
# Check all system health endpoints
curl -s http://localhost:3000/api/health | jq .
curl -s http://localhost:3000/api/ready | jq .
curl -s http://localhost:3000/api/live | jq .
```

**Expected Results:**
- All endpoints should return `{"status": "healthy"}` or equivalent
- Response time < 2 seconds
- No error messages

#### 2. Dashboard Review
1. **Login to Admin Panel**
   - URL: `https://admin.forhem.com`
   - Verify authentication works
   - Check for login errors

2. **Review Overview Dashboard**
   - Check node status (should show healthy nodes)
   - Review active alerts count
   - Verify system metrics are within normal ranges

3. **Check Critical Alerts**
   - Filter for "critical" severity alerts
   - Acknowledge any new critical alerts
   - Create incident tickets for unresolved issues

#### 3. Log Review
```bash
# Check application logs for errors
tail -100 /var/log/forhem/application.log | grep -i error

# Check system logs
journalctl -u forhem-app --since "1 hour ago" | grep -i error

# Check database logs
docker logs forhem-db 2>&1 | grep -i error | tail -20
```

#### 4. Performance Check
1. **Monitor Response Times**
   - Navigate to Telemetry → Performance
   - Check response time trends
   - Look for unusual spikes or degradation

2. **Resource Utilization**
   - CPU usage should be < 80%
   - Memory usage should be < 85%
   - Disk usage should be < 90%

### Mid-Day Check (1:00 PM)

#### 1. Active Alert Review
- Review all active alerts
- Update resolution status
- Escalate unresolved critical alerts

#### 2. User Activity Review
- Check for unusual login patterns
- Review admin access logs
- Verify no unauthorized access attempts

#### 3. System Performance
- Review performance metrics
- Check for memory leaks
- Monitor database query performance

### End-of-Day Checklist (5:00 PM)

#### 1. Final Status Update
- Document all resolved incidents
- Update any ongoing issues
- Prepare handover notes for next shift

#### 2. Backup Verification
- Confirm daily backups completed successfully
- Verify backup integrity
- Check backup storage availability

#### 3. Security Review
- Review failed login attempts
- Check for security alerts
- Update security incident log if needed

## Incident Response

### Severity Levels

| Severity | Description | Response Time | Escalation |
|----------|-------------|---------------|------------|
| P1 - Critical | System down, major service impact | 15 minutes | Immediate management |
| P2 - High | Significant degradation, partial outage | 1 hour | 4 hours or P1 |
| P3 - Medium | Minor issues, limited impact | 4 hours | 24 hours or P2 |
| P4 - Low | Cosmetic issues, no impact | 24 hours | 72 hours |

### Incident Response Procedure

#### Phase 1: Detection and Assessment (0-15 minutes)

1. **Initial Detection**
   - Alert received via monitoring system
   - User report received
   - Automated monitoring detection

2. **Immediate Assessment**
   ```bash
   # Quick system status check
   curl -f http://localhost:3000/api/health || echo "Health check failed"

   # Check service status
   systemctl status forhem-app
   docker ps | grep forhem
   ```

3. **Severity Classification**
   - Use severity matrix above
   - Determine impact scope
   - Estimate resolution time

4. **Initial Communication**
   - Send incident alert to team
   - Update status page if needed
   - Document initial findings

#### Phase 2: Investigation (15-60 minutes)

1. **Gather Information**
   ```bash
   # Check recent deployments
   git log --oneline -10

   # Check system metrics
   top -n 1 | head -5
   free -h
   df -h

   # Check application logs
   tail -200 /var/log/forhem/application.log | grep -A5 -B5 "$(date '+%Y-%m-%d %H')"
   ```

2. **Identify Root Cause**
   - Correlate events with symptoms
   - Check configuration changes
   - Review recent deployments

3. **Document Findings**
   - Update incident ticket
   - Record all observations
   - Note reproduction steps

#### Phase 3: Resolution (Variable Time)

1. **Implement Fix**
   - Apply configuration changes
   - Rollback recent deployment if needed
   - Restart services

2. **Verify Resolution**
   ```bash
   # Test critical functionality
   curl -s http://localhost:3000/api/health | jq .

   # Check service functionality
   curl -s http://localhost:3000/api/admin/overview

   # Monitor for 5 minutes
   watch -n 30 'curl -s http://localhost:3000/api/health'
   ```

3. **Monitor for Recurrence**
   - Watch system metrics
   - Check error logs
   - Monitor user reports

#### Phase 4: Post-Incident (1-24 hours)

1. **Create Incident Report**
   - Timeline of events
   - Root cause analysis
   - Resolution steps
   - Prevention measures

2. **System Updates**
   - Update monitoring if needed
   - Improve alerting
   - Update runbooks

3. **Team Review**
   - Conduct post-mortem
   - Identify improvement opportunities
   - Update procedures

### Common Incident Scenarios

#### Scenario 1: Application Not Responding

**Symptoms:**
- Health check failing
- Users cannot access admin panel
- High response times

**Quick Fix Steps:**
```bash
# Check application status
systemctl status forhem-app

# Restart application if needed
systemctl restart forhem-app

# Check database connectivity
curl -s http://localhost:3000/api/health | jq .
```

**Escalation:** If restart doesn't work within 5 minutes

#### Scenario 2: Database Connection Issues

**Symptoms:**
- Database connection errors in logs
- Slow page loads
- Data not updating

**Quick Fix Steps:**
```bash
# Check database status
docker ps | grep forhem-db
docker logs forhem-db 2>&1 | tail -20

# Restart database if needed
docker restart forhem-db

# Check connection pool
curl -s http://localhost:3000/api/health | jq .database
```

**Escalation:** If database doesn't recover within 10 minutes

#### Scenario 3: High CPU/Memory Usage

**Symptoms:**
- Slow response times
- System resource alerts
- Performance degradation

**Quick Fix Steps:**
```bash
# Identify high-resource processes
top -n 1 | head -10

# Check application logs for errors
tail -100 /var/log/forhem/application.log | grep -i error

# Restart application if memory leak suspected
systemctl restart forhem-app
```

**Escalation:** If resources remain high after restart

## System Maintenance

### Planned Maintenance Windows

#### Weekly Maintenance (Sundays 2:00 AM - 4:00 AM)

1. **System Backup**
   ```bash
   # Create database backup
   docker exec forhem-db pg_dump -U postgres forhem_db > /backups/weekly_$(date +%Y%m%d).sql

   # Backup application files
   tar -czf /backups/app_$(date +%Y%m%d).tar.gz /opt/forhem/
   ```

2. **System Updates**
   ```bash
   # Update system packages
   apt update && apt upgrade -y

   # Update Docker containers
   docker-compose pull
   docker-compose up -d
   ```

3. **Log Rotation**
   ```bash
   # Rotate application logs
   logrotate -f /etc/logrotate.d/forhem

   # Clean old logs (>30 days)
   find /var/log/forhem -name "*.log" -mtime +30 -delete
   ```

4. **Performance Check**
   ```bash
   # Run performance tests
   npm run test:e2e:performance

   # Check system metrics
   sar -u 1 5
   ```

#### Monthly Maintenance (First Sunday of month)

1. **Security Updates**
   ```bash
   # Apply security patches
   apt list --upgradable | grep -i security
   apt upgrade -y

   # Scan for vulnerabilities
   npm audit fix
   ```

2. **Database Maintenance**
   ```bash
   # Optimize database
   docker exec forhem-db psql -U postgres -d forhem_db -c "VACUUM ANALYZE;"

   # Check database size
   docker exec forhem-db psql -U postgres -d forhem_db -c "SELECT pg_size_pretty(pg_database_size('forhem_db'));"
   ```

3. **Certificate Renewal Check**
   ```bash
   # Check SSL certificate expiry
   openssl x509 -in /etc/ssl/certs/forhem.crt -noout -enddate

   # Check Let's Encrypt certificates
   certbot certificates
   ```

### Maintenance Procedures

#### Pre-Maintenance Checklist

1. **Notify Stakeholders**
   - Send maintenance notification 24 hours in advance
   - Update status page
   - Schedule maintenance window

2. **System Backup**
   ```bash
   # Create full system backup
   ./scripts/create-emergency-backup.sh

   # Verify backup integrity
   ./scripts/verify-backup.sh
   ```

3. **Prepare Rollback Plan**
   - Document rollback procedures
   - Test rollback in staging
   - Prepare emergency contacts

#### During Maintenance

1. **Take System Offline**
   ```bash
   # Enable maintenance mode
   curl -X POST http://localhost:3000/api/admin/maintenance -d '{"enabled": true}'

   # Stop application services
   systemctl stop forhem-app
   docker-compose down
   ```

2. **Perform Maintenance**
   - Apply updates
   - Make configuration changes
   - Test changes in isolation

3. **System Verification**
   ```bash
   # Test health endpoints
   curl -s http://localhost:3000/api/health | jq .

   # Run smoke tests
   npm run test:e2e:smoke
   ```

4. **Bring System Online**
   ```bash
   # Start services
   docker-compose up -d
   systemctl start forhem-app

   # Disable maintenance mode
   curl -X POST http://localhost:3000/api/admin/maintenance -d '{"enabled": false}'
   ```

#### Post-Maintenance

1. **Monitor System**
   - Watch for errors for 1 hour
   - Check performance metrics
   - Verify all functionality

2. **Update Documentation**
   - Document changes made
   - Update runbooks
   - Record lessons learned

3. **Communicate Completion**
   - Send completion notification
   - Update status page
   - Document any issues

## User Management

### User Onboarding

#### New User Account Creation

1. **Receive Request**
   - Manager submits user access request
   - Verify business justification
   - Determine appropriate role

2. **Create User Account**
   ```bash
   # Create user in database
   docker exec forhem-db psql -U postgres -d forhem_db -c "
   INSERT INTO users (email, full_name, role, tenant_id, created_at)
   VALUES ('newuser@company.com', 'New User', 'analyst', 'tenant_123', NOW());
   "
   ```

3. **Configure Access**
   - Assign appropriate role
   - Set up initial permissions
   - Configure notification preferences

4. **Send Welcome Email**
   - Include login URL
   - Provide temporary password
   - Include documentation links

5. **Track Onboarding**
   - Log account creation
   - Schedule access review
   - Monitor initial usage

#### User Offboarding

1. **Initiate Process**
   - Receive termination notification
   - Note effective date
   - Identify access needs for transition

2. **Revoke Access**
   ```bash
   # Disable user account
   docker exec forhem-db psql -U postgres -d forhem_db -c "
   UPDATE users SET active = false, updated_at = NOW()
   WHERE email = 'formeruser@company.com';
   "
   ```

3. **Transfer Responsibilities**
   - Reassign owned resources
   - Update contact information
   - Transfer alerts and notifications

4. **Archive Data**
   - Export user data if required
   - Archive account information
   - Document access removal

### Role Management

#### Role Assignment

1. **Assess Requirements**
   - Review job responsibilities
   - Determine minimum required permissions
   - Get manager approval

2. **Assign Role**
   ```bash
   # Update user role
   docker exec forhem-db psql -U postgres -d forhem_db -c "
   UPDATE users SET role = 'ops_manager', updated_at = NOW()
   WHERE email = 'user@company.com';
   "
   ```

3. **Document Change**
   - Record role assignment reason
   - Note effective date
   - Schedule review

#### Role Review Process

1. **Quarterly Review**
   - Review all user roles
   - Validate business need
   - Identify unnecessary permissions

2. **Access Certification**
   - Manager reviews team access
   - Certify appropriate permissions
   - Document certifications

3. **Automated Review**
   - Check for unused accounts
   - Review privileged access
   - Generate compliance reports

## Backup and Recovery

### Backup Strategy

#### Daily Backups (2:00 AM)

```bash
#!/bin/bash
# Daily backup script

DATE=$(date +%Y%m%d)
BACKUP_DIR="/backups/daily"

# Create database backup
docker exec forhem-db pg_dump -U postgres forhem_db > $BACKUP_DIR/db_$DATE.sql

# Create application backup
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /opt/forhem/

# Upload to cloud storage
aws s3 cp $BACKUP_DIR/db_$DATE.sql s3://forhem-backups/database/
aws s3 cp $BACKUP_DIR/app_$DATE.tar.gz s3://forhem-backups/application/

# Clean local backups (keep 7 days)
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

# Verify backup integrity
./scripts/verify-backup.sh $BACKUP_DIR/db_$DATE.sql
```

#### Weekly Full Backups (Sundays)

```bash
#!/bin/bash
# Weekly full backup script

DATE=$(date +%Y%m%d)
BACKUP_DIR="/backups/weekly"

# Create full system backup
./scripts/create-emergency-backup.sh $BACKUP_DIR/full_$DATE

# Test backup restoration
./scripts/test-restore.sh $BACKUP_DIR/full_$DATE

# Send backup status notification
./scripts/notify-backup-status.sh success
```

### Recovery Procedures

#### Database Recovery

1. **Assess Recovery Need**
   - Determine recovery point objective (RPO)
   - Identify affected data
   - Estimate recovery time

2. **Prepare for Recovery**
   ```bash
   # Stop application
   systemctl stop forhem-app

   # Backup current state (just in case)
   docker exec forhem-db pg_dump -U postgres forhem_db > /backups/emergency_$(date +%Y%m%d_%H%M%S).sql
   ```

3. **Restore Database**
   ```bash
   # Restore from backup
   docker exec -i forhem-db psql -U postgres forhem_db < /backups/db_20231201.sql

   # Verify data integrity
   docker exec forhem-db psql -U postgres -d forhem_db -c "SELECT COUNT(*) FROM users;"
   ```

4. **Restart Services**
   ```bash
   # Start application
   systemctl start forhem-app

   # Verify functionality
   curl -s http://localhost:3000/api/health | jq .
   ```

#### Application Recovery

1. **Code Recovery**
   ```bash
   # Restore from Git
   git checkout <working-commit>

   # Restore configuration files
   tar -xzf /backups/app_20231201.tar.gz -C /
   ```

2. **Configuration Recovery**
   ```bash
   # Restore environment files
   cp /backups/config/.env.production /opt/forhem/.env.production

   # Verify configuration
   ./scripts/verify-config.sh
   ```

#### Disaster Recovery

1. **Declare Disaster**
   - Assess damage scope
   - Activate disaster recovery plan
   - Notify stakeholders

2. **Recovery Execution**
   ```bash
   # Spin up disaster recovery environment
   ./scripts/activate-dr-environment.sh

   # Restore from latest backup
   ./scripts/restore-from-backup.sh latest

   # Verify systems
   npm run test:e2e:ci
   ```

3. **Failback Planning**
   - Document recovery steps
   - Plan return to primary
   - Schedule maintenance window

## Security Procedures

### Access Security

#### Password Management

1. **Password Requirements**
   - Minimum 12 characters
   - Include uppercase, lowercase, numbers, symbols
   - No dictionary words
   - 90-day expiration

2. **Password Reset Procedure**
   ```bash
   # Generate secure temporary password
   openssl rand -base64 32

   # Update user password
   docker exec forhem-db psql -U postgres -d forhem_db -c "
   UPDATE users SET
     password_hash = crypt('new_password', gen_salt('bf')),
     password_reset_required = true,
     updated_at = NOW()
   WHERE email = 'user@company.com';
   "
   ```

#### Multi-Factor Authentication

1. **MFA Enforcement**
   - Required for all admin roles
   - Optional for standard users
   - Backup codes available

2. **MFA Setup Procedure**
   - User authenticates with password
   - Set up authenticator app
   - Verify backup codes
   - Enable MFA requirement

### Security Monitoring

#### Daily Security Checks

1. **Failed Login Review**
   ```bash
   # Check for failed login attempts
   grep "Failed login attempt" /var/log/forhem/auth.log | tail -20

   # Check for IP-based attacks
   awk '{print $1}' /var/log/forhem/auth.log | sort | uniq -c | sort -nr | head -10
   ```

2. **Privileged Access Review**
   ```bash
   # Review admin access logs
   grep "admin_access" /var/log/forhem/audit.log | tail -50

   # Check for suspicious activity
   grep "DELETE\|DROP\|ALTER" /var/log/forhem/audit.log | tail -20
   ```

#### Incident Response

1. **Security Incident Classification**
   - Low: Suspicious activity, no confirmed breach
   - Medium: Confirmed unauthorized access
   - High: Data breach or system compromise
   - Critical: Widespread compromise or data loss

2. **Response Procedures**
   - Isolate affected systems
   - Preserve evidence
   - Notify security team
   - Document timeline

## Monitoring and Alerting

### Alert Configuration

#### Critical Alerts (Immediate Response)

1. **System Down**
   - Health check fails
   - Application not responding
   - Database connection lost

2. **Security Incidents**
   - Multiple failed logins
   - Privilege escalation attempts
   - Unauthorized access attempts

3. **Performance Issues**
   - Response time > 5 seconds
   - CPU usage > 90%
   - Memory usage > 95%

#### Warning Alerts (Response within 1 hour)

1. **Resource Usage**
   - CPU usage > 80%
   - Memory usage > 85%
   - Disk usage > 80%

2. **Error Rates**
   - Error rate > 5%
   - Increasing error trends
   - Repeated error patterns

### Monitoring Dashboards

#### System Health Dashboard

1. **Key Metrics**
   - Application response time
   - Error rate
   - Active users
   - System resources

2. **Alert Status**
   - Active alerts count
   - Alert severity distribution
   - Resolution time tracking

#### Security Dashboard

1. **Security Metrics**
   - Failed login attempts
   - Blocked IPs
   - Privileged access events
   - Security incidents

## Troubleshooting Guide

### Common Issues

#### Application Not Starting

**Symptoms:**
- Application won't start
- Startup errors in logs
- Port conflicts

**Troubleshooting Steps:**
```bash
# Check application status
systemctl status forhem-app

# Check for port conflicts
netstat -tulpn | grep :3000

# Check configuration
/opt/forhem/.env.production

# Check logs for errors
journalctl -u forhem-app -f
```

**Solution:**
- Fix configuration errors
- Resolve port conflicts
- Restart application

#### Database Connection Issues

**Symptoms:**
- Database connection errors
- Slow queries
- Connection timeouts

**Troubleshooting Steps:**
```bash
# Check database status
docker ps | grep forhem-db

# Test database connectivity
docker exec forhem-db pg_isready

# Check connection pool
curl -s http://localhost:3000/api/health | jq .database
```

**Solution:**
- Restart database
- Check connection limits
- Optimize queries

#### Performance Issues

**Symptoms:**
- Slow response times
- High resource usage
- User complaints

**Troubleshooting Steps:**
```bash
# Check system resources
top
free -h
df -h

# Check application performance
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3000/api/health

# Check database performance
docker exec forhem-db psql -U postgres -d forhem_db -c "
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY total_time DESC LIMIT 10;
"
```

**Solution:**
- Optimize database queries
- Scale resources
- Cache frequently accessed data

### Diagnostic Commands

#### System Diagnostics

```bash
# Full system health check
./scripts/system-health-check.sh

# Application diagnostics
./scripts/app-diagnostics.sh

# Database diagnostics
./scripts/db-diagnostics.sh
```

#### Log Analysis

```bash
# Error log analysis
grep -i error /var/log/forhem/application.log | tail -50

# Performance log analysis
grep "slow query" /var/log/forhem/application.log | tail -50

# Security log analysis
grep "auth\|login\|access" /var/log/forhem/audit.log | tail -50
```

## Escalation Procedures

### Escalation Matrix

| Issue Type | Primary Contact | Escalation Contact | Response Time |
|------------|-----------------|-------------------|---------------|
| System Outage | Operations Manager | CTO | 15 minutes |
| Security Incident | Security Lead | CEO | 30 minutes |
| Data Loss | DBA | CTO | 15 minutes |
| Performance Issue | Operations Manager | Engineering Lead | 1 hour |
| User Access | HR Manager | IT Director | 4 hours |

### Escalation Triggers

1. **Immediate Escalation**
   - System down > 15 minutes
   - Data breach confirmed
   - Regulatory compliance issue
   - Customer impact > 100 users

2. **Standard Escalation**
   - Issue unresolved after 2 hours
   - Performance degradation > 50%
   - Multiple similar incidents
   - User complaints increasing

### Escalation Process

1. **Initial Assessment**
   - Evaluate issue severity
   - Determine impact scope
   - Check escalation criteria

2. **Escalate Appropriately**
   - Contact designated person
   - Provide complete context
   - Share all available data

3. **Document Escalation**
   - Log escalation decision
   - Record timeline
   - Track resolution

## Compliance and Auditing

### Compliance Requirements

#### GDPR Compliance

1. **Data Protection**
   - Encrypt sensitive data
   - Implement data access controls
   - Maintain audit trails

2. **User Rights**
   - Right to access data
   - Right to delete data
   - Right to data portability

#### SOC 2 Compliance

1. **Security Controls**
   - Access controls
   - Encryption standards
   - Incident response procedures

2. **Availability Controls**
   - Backup procedures
   - Disaster recovery
   - Performance monitoring

### Audit Procedures

#### Internal Audits

1. **Monthly Access Reviews**
   - Review user access rights
   - Validate role assignments
   - Check for orphaned accounts

2. **Quarterly Security Audits**
   - Review security incidents
   - Validate security controls
   - Update risk assessments

#### External Audits

1. **Annual Compliance Audit**
   - Full system review
   - Documentation review
   - Control testing

2. **Penetration Testing**
   - Quarterly security testing
   - Vulnerability scanning
   - Remediation tracking

### Audit Trail Requirements

1. **Complete Logging**
   - All user actions logged
   - System changes tracked
   - Security events recorded

2. **Log Retention**
   - Keep logs for 7 years
   - Ensure log integrity
   - Regular log backups

This runbook should be reviewed and updated quarterly to ensure procedures remain current and effective.