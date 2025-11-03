# Change Management & Rollback Procedures

## Overview

This document outlines the change management process and rollback procedures for TemplateAppV2 to ensure safe, controlled deployments with minimal risk and quick recovery capabilities.

## Change Management Process

### 1. Change Freeze Policy

**Phase 1 Emergency Period (0-72 hours)**
- Only P0 (Critical) fixes allowed
- All other changes must wait until Phase 2
- Emergency changes require:
  - Explicit approval from @security-owner and @architecture-owner
  - Separate emergency PR with `emergency` label
  - Pre-deployment checklist completion
  - Post-deployment monitoring for 2 hours

**Normal Operations (After Phase 1)**
- All changes follow standard process
- No restrictions on priority levels
- Regular deployment windows apply

### 2. Change Categories

| Category | Approval Required | Testing Required | Rollback Plan | Timeline |
|----------|-------------------|------------------|---------------|----------|
| P0 - Critical | Security + Architecture | Full E2E | Mandatory | Immediate |
| P1 - High | Domain Owner | Integration + E2E | Mandatory | Next deploy window |
| P2 - Medium | Domain Owner | Unit + Integration | Recommended | Regular schedule |
| P3 - Low | Self Review | Unit tests | Optional | Regular schedule |

### 3. Deployment Windows

- **Production**: Tuesday & Thursday, 10:00 AM - 2:00 PM PST
- **Staging**: Daily, 9:00 AM - 5:00 PM PST
- **Emergency**: Any time with approval

## Rollback Procedures

### 1. Pre-Deployment Checklist

Before any deployment, verify:
- [ ] Database backup completed and verified
- [ ] Current deployment state documented
- [ ] Rollback commands tested in staging
- [ ] Environment variables backed up
- [ ] Feature flags documented
- [ ] Migration scripts reversible (if applicable)
- [ ] Monitoring and alerting configured
- [ ] Rollback communication plan prepared

### 2. Rollback Triggers

**Immediate Rollback (Within 5 minutes)**
- Error rate > 5% for any endpoint
- Authentication system failure
- Payment processing errors
- Data corruption detected
- Security vulnerability exposed

**Assessed Rollback (Within 30 minutes)**
- Performance degradation > 50%
- Critical user flows broken
- Third-party integration failures
- Compliance violations detected

### 3. Rollback Execution

#### Database Changes
```bash
# If migration was applied:
supabase db rollback <migration-version>

# If data was modified:
supabase db restore --from-backup <backup-id>
```

#### Code Changes
```bash
# Rollback to previous commit
git revert <commit-hash>

# Or reset to previous tag
git reset --hard <tag-name>
git push --force
```

#### Environment Variables
```bash
# Restore from backup
cp .env.backup .env

# Or re-deploy from secrets manager
aws secretsmanager get-secret-value --secret-id templateappv2/prod
```

### 4. Rollback Communication

**Internal Communication**
1. Create #incident channel in Slack
2. Post rollback announcement with:
   - Reason for rollback
   - Impact assessment
   - Recovery timeline
   - Investigation plan

**External Communication**
1. Prepare status page update
2. Draft user notification if impact > 30 minutes
3. Coordinate with support team

## Rollback Plan Template

### PR Rollback Plan Checklist

**Code Changes**
- [ ] Git revert command tested: `git revert <commit-hash>`
- [ ] No database schema changes required
- [ ] No new dependencies added
- [ ] Backward compatibility maintained

**Database Changes**
- [ ] Migration reversible: Yes/No
- [ ] If No, backup before deployment: Yes/No
- [ ] Restore command: `supabase db restore <backup-id>`
- [ ] Data migration scripts reversible: Yes/No

**Environment Variables**
- [ ] New env vars: [list]
- [ ] Existing env vars modified: [list]
- [ ] Rotation procedure documented: Yes/No
- [ ] Backup command: `cp .env .env.backup-$(date +%Y%m%d-%H%M)`

**Configuration Changes**
- [ ] New config files: [list]
- [ ] External service changes: [list]
- [ ] Feature flag status: [list]

**Recovery Steps**
1. **Immediate Actions**:
   ```bash
   # Stop deployment
   git push --delete origin feature-branch

   # Rollback code
   git revert <commit-hash>
   git push origin main

   # Restore database if needed
   supabase db restore <backup-id>
   ```

2. **Verification Steps**:
   - [ ] Error rates back to normal
   - [ ] All critical endpoints responding
   - [ ] Authentication working
   - [ ] Payment processing functional
   - [ ] Data integrity verified

3. **Post-Rollback Actions**:
   - [ ] Root cause analysis initiated
   - [ ] Updated incident documentation
   - [ ] Process improvements documented
   - [ ] Stakeholders notified

## Testing Rollbacks

### Staging Environment Testing
1. Deploy changes to staging
2. Simulate failure scenarios
3. Practice rollback procedures
4. Verify system stability post-rollback

### Rollback Drills
- Monthly rollback drills for P0/P1 changes
- Quarterly full disaster recovery simulation
- Annual failover to backup region (if applicable)

## Monitoring and Alerting

### Rollback-Specific Alerts
- **Rollback initiated**: PagerDuty to on-call engineer
- **Rollback completed**: Slack notification to team
- **Rollback failed**: Critical alert to all engineers

### Post-Rollback Monitoring
- Monitor for 2 hours after rollback
- Check all critical user flows
- Verify data consistency
- Confirm third-party integrations

## Documentation Requirements

### Pre-Deployment
- Rollback plan included in PR description
- Risk assessment documented
- Dependencies identified

### Post-Deployment
- Deployment summary updated
- Rollback capability verified
- Lessons learned documented

## Approval Matrix

| Change Type | Approver | Rollback Authority |
|-------------|----------|-------------------|
| P0 Emergency | Security + Architecture | On-call Engineer |
| P1 High | Domain Owner | Team Lead |
| P2 Medium | Domain Owner | Self |
| P3 Low | Self | Self |

## Contact Information

**Emergency Rollback**
- Primary: On-call Engineer (PagerDuty)
- Secondary: Tech Lead (Slack)
- Management: CTO (Call)

**Non-Emergency**
- Team Channel: #engineering
- Management: #leadership