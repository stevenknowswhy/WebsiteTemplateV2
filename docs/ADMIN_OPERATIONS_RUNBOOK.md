# Admin Panel Operations Runbook
## Standard Operating Procedures (SOPs) for Forhem PBC Admin Panel v1.0

### 📋 Overview

This runbook provides comprehensive standard operating procedures for managing the Forhem PBC Admin Panel. It covers daily operations, incident response, user management, system maintenance, and troubleshooting procedures.

### 🚨 Emergency Contacts

| Role | Contact | Response Time |
|------|---------|---------------|
| System Administrator | admin@forhem.com | 15 minutes |
| Security Lead | security@forhem.com | 30 minutes |
| DevOps Engineer | devops@forhem.com | 1 hour |
| Support Manager | support@forhem.com | 2 hours |

### 🕐 Daily Operations Checklist

#### Morning Checks (9:00 AM)

**System Health Verification**
- [ ] Check admin panel dashboard for system status
- [ ] Verify all critical services are operational
- [ ] Review overnight alerts and acknowledge resolved issues
- [ ] Check backup completion status
- [ ] Review system resource utilization

**Security Review**
- [ ] Review failed login attempts
- [ ] Check for security alerts from telemetry
- [ ] Verify user access patterns are normal
- [ ] Review API rate limiting status

#### Mid-day Checks (1:00 PM)

**Performance Monitoring**
- [ ] Review response times for critical endpoints
- [ ] Check database performance metrics
- [ ] Monitor active user sessions
- [ ] Review error rates and trends

#### End-of-Day Checks (5:00 PM)

**Daily Summary**
- [ ] Generate daily operations report
- [ ] Document any incidents or issues
- [ ] Review pending user requests
- [ ] Update change log if applicable

### 👥 User Management Procedures

#### New User Onboarding

**Prerequisites**
- Manager approval received
- User role determined based on RBAC matrix
- Required background checks completed

**Steps**
1. **Create User Account**
   - Navigate to `/admin/users`
   - Click "Create New User"
   - Fill in required information:
     - Full name
     - Email address
     - Department
     - Role (based on RBAC matrix)
   - Set temporary password
   - Assign appropriate tenant

2. **Configure Access Permissions**
   - Review role-based permissions
   - Add any additional access if justified
   - Document any exceptions

3. **Send Onboarding Email**
   - Include login credentials
   - Provide link to admin panel
   - Attach user guide
   - Schedule onboarding session

4. **Monitor Initial Access**
   - Track first login
   - Verify successful authentication
   - Follow up if no login within 48 hours

#### User Offboarding

**Immediate Actions (Within 1 hour)**
1. Suspend user account
2. Revoke all active sessions
3. Change password to random value
4. Remove from any shared resources
5. Update group memberships

**Follow-up Actions (Within 24 hours)**
1. Archive user data
2. Transfer ownership of resources
3. Update documentation
4. Remove from mailing lists
5. Document access removal

**Final Actions (Within 7 days)**
1. Delete user account (unless legal hold)
2. Clean up any remaining access
3. Update audit logs
4. Confirm complete removal

#### Role Changes

**Process**
1. Receive role change request with justification
2. Verify manager approval
3. Document reason for change
4. Update user role in system
5. Notify user of changes
6. Monitor access patterns post-change
7. Update documentation

### 🔒 Security Procedures

#### Incident Response

**Level 1: Minor Incident (Response Time: 1 hour)**
- Single user account compromised
- Low-priority security alert
- Minor configuration issue

**Response Steps**
1. Isolate affected account/system
2. Investigate root cause
3. Implement immediate fix
4. Document incident
5. Monitor for recurrence

**Level 2: Moderate Incident (Response Time: 30 minutes)**
- Multiple user accounts affected
- Service degradation
- Suspicious activity detected

**Response Steps**
1. Activate incident response team
2. Assess scope and impact
3. Implement containment measures
4. Communicate with stakeholders
5. Begin remediation
6. Document timeline and actions

**Level 3: Critical Incident (Response Time: 15 minutes)**
- System-wide outage
- Data breach suspected
- Critical security vulnerability

**Response Steps**
1. **Immediate Response**
   - Activate emergency response protocol
   - Contact all critical personnel
   - Implement emergency containment

2. **Assessment (First 30 minutes)**
   - Determine incident scope
   - Assess data impact
   - Identify affected systems

3. **Communication (First hour)**
   - Notify leadership team
   - Prepare public statements if needed
   - Contact legal/compliance teams

4. **Remediation (Ongoing)**
   - Implement fixes
   - Restore services
   - Monitor for recurrence

5. **Post-Incident (Within 7 days)**
   - Conduct root cause analysis
   - Update procedures
   - Implement preventive measures

#### Security Monitoring

**Daily Tasks**
- Review security event logs
- Check for unusual access patterns
- Monitor failed authentication attempts
- Review privilege escalation requests

**Weekly Tasks**
- Conduct security audit review
- Update security policies
- Review threat intelligence
- Test security controls

**Monthly Tasks**
- Comprehensive security assessment
- Update incident response plans
- Security training for staff
- Review access control matrices

### 🖥️ System Maintenance

#### Scheduled Maintenance

**Weekly Maintenance (Sundays 2:00-4:00 AM UTC)**
- System updates and patches
- Database optimization
- Log rotation and cleanup
- Backup verification

**Monthly Maintenance (First Sunday of month)**
- Security patching
- Performance tuning
- Capacity planning review
- Documentation updates

**Quarterly Maintenance**
- Major version updates
- Security audits
- Disaster recovery testing
- Architecture review

#### Backup Procedures

**Daily Backups**
- Automated database backups
- Configuration backups
- Log file backups
- Verification of backup integrity

**Weekly Backups**
- Full system snapshots
- Off-site backup replication
- Backup restoration testing
- Backup retention policy review

### 📊 Monitoring and Alerting

#### Key Metrics to Monitor

**System Performance**
- CPU utilization (< 80% target)
- Memory usage (< 85% target)
- Disk space (< 90% threshold)
- Network latency (< 200ms target)

**Application Performance**
- Response time (< 2 seconds target)
- Error rate (< 1% target)
- Throughput requirements
- User session counts

**Security Metrics**
- Failed login attempts
- Unauthorized access attempts
- Privilege escalation requests
- Data access anomalies

#### Alert Configuration

**Critical Alerts (Immediate notification)**
- System downtime
- Security breach detected
- Data corruption suspected
- Backup failures

**Warning Alerts (Email notification)**
- High resource utilization
- Performance degradation
- Unusual access patterns
- Configuration changes

**Info Alerts (Daily digest)**
- Routine maintenance completed
- System status updates
- Performance summaries
- Security scan results

### 🔧 Troubleshooting Guide

#### Common Issues

**User Cannot Login**
1. Verify account status (not suspended)
2. Check password expiration
3. Verify role assignment
4. Check network connectivity
5. Clear browser cache/cookies
6. Try alternative browser
7. Check authentication service status

**Slow Performance**
1. Check system resource utilization
2. Review database query performance
3. Check network latency
4. Review recent changes
5. Check for scheduled tasks
6. Monitor error rates

**Data Not Displaying**
1. Verify user permissions
2. Check data source connections
3. Review database status
4. Check API endpoints
5. Verify data filters
6. Review audit logs

**Alerts Not Working**
1. Check notification settings
2. Verify alert configuration
3. Test notification channels
4. Check alert rules
5. Review system logs
6. Verify escalation paths

#### Diagnostic Commands

**System Health Check**
```bash
# Check service status
systemctl status forhem-admin

# Check resource usage
top -p $(pgrep forhem)

# Check database connectivity
psql -h localhost -U admin -d forhem_prod -c "SELECT 1;"

# Check API endpoints
curl -f http://localhost:3001/api/health
```

**Log Analysis**
```bash
# Check application logs
tail -f /var/log/forhem/admin.log

# Check error logs
grep ERROR /var/log/forhem/admin.log | tail -20

# Check access logs
tail -f /var/log/nginx/access.log

# Check authentication logs
tail -f /var/log/auth.log | grep forhem
```

### 📋 Change Management

#### Change Request Process

**Standard Changes (Low Risk)**
1. Submit change request
2. Peer review
3. Schedule implementation
4. Implement change
5. Verify functionality
6. Document completion

**Significant Changes (Medium Risk)**
1. Submit detailed change request
2. Technical review
3. Business approval
4. User communication
5. Implementation with rollback plan
6. Testing and verification
7. Post-implementation review

**Emergency Changes (High Risk)**
1. Immediate implementation
2. Concurrent documentation
3. Post-implementation review
4. Root cause analysis
5. Process improvement

#### Change Documentation

**Required Information**
- Change description and justification
- Risk assessment and mitigation
- Implementation timeline
- Rollback procedure
- Testing requirements
- Communication plan
- Approval signatures

### 📚 Training and Documentation

#### Administrator Training

**New Administrator Training (Week 1)**
- System overview and architecture
- User management procedures
- Security protocols
- Daily operations
- Emergency procedures
- Hands-on practice sessions

**Ongoing Training (Monthly)**
- Security awareness
- New feature updates
- Procedure refreshers
- Best practices
- Incident response drills

#### Documentation Maintenance

**Living Documents**
- This runbook (monthly review)
- RBAC matrix (quarterly review)
- System architecture (as-needed)
- API documentation (with releases)
- User guides (with major updates)

### 🎯 Service Level Agreements (SLAs)

**System Availability**
- Uptime: 99.9% (excluding scheduled maintenance)
- Maintenance window: Sundays 2:00-4:00 AM UTC
- Emergency response: 15 minutes for critical issues

**Performance Targets**
- Page load time: < 2 seconds
- API response time: < 500ms
- Database query time: < 1 second
- Concurrent users: 500+ supported

**Support Response Times**
- Critical: 15 minutes
- High: 1 hour
- Medium: 4 hours
- Low: 24 hours

### 📊 Reporting

**Daily Reports**
- System status summary
- Security events
- User activity summary
- Performance metrics

**Weekly Reports**
- Trend analysis
- Capacity utilization
- Security posture assessment
- Change summary

**Monthly Reports**
- Executive summary
- Performance analysis
- Security audit results
- Improvement recommendations

### 🔄 Continuous Improvement

**Review Processes**
- Monthly procedure reviews
- Quarterly incident analysis
- Annual system assessment
- Continuous feedback collection

**Improvement Implementation**
- Document lessons learned
- Update procedures based on incidents
- Implement automation opportunities
- Enhance monitoring capabilities

---

## 📞 Emergency Procedures Quick Reference

### System Down
1. Check service status: `systemctl status forhem-admin`
2. Restart services: `systemctl restart forhem-admin`
3. Check logs: `tail -f /var/log/forhem/admin.log`
4. Contact on-call engineer if unresolved

### Security Incident
1. Isolate affected systems
2. Activate incident response team
3. Preserve evidence
4. Document everything
5. Follow communication protocol

### Data Loss
1. Stop all writes to affected systems
2. Identify scope of impact
3. Initiate recovery from backups
4. Verify data integrity
5. Communicate with stakeholders

---

**Document Version**: 1.0
**Last Updated**: November 8, 2025
**Next Review**: December 8, 2025
**Approved By**: System Administration Team

*This runbook should be reviewed monthly and updated as needed. All administrators should be familiar with these procedures and participate in regular training.*