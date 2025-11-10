# Role-Based Access Control (RBAC) Matrix
## Forhem PBC Admin Panel v1.0

### 📋 Overview
This document defines the comprehensive Role-Based Access Control (RBAC) matrix for the Forhem PBC Admin Panel. It outlines permissions, responsibilities, and access levels for each user role within the multi-tenant architecture.

## Overview

The RBAC system implements the principle of least privilege, ensuring users have only the permissions necessary to perform their job functions. Roles are hierarchical, with higher-level roles inheriting permissions from lower-level roles.

## User Roles

### 1. Super Admin (super_admin)
**Description**: Highest level of access with full system control
**Users**: System owners, CTO, Lead DevOps

### 2. Tenant Admin (tenant_admin)
**Description**: Full administrative access within their tenant
**Users**: Company administrators, IT managers

### 3. Operations Manager (ops_manager)
**Description**: Manages daily operations and monitoring
**Users**: Operations team leads, system administrators

### 4. Support Agent (support_agent)
**Description**: Handles customer support and basic troubleshooting
**Users**: Customer support representatives, help desk staff

### 5. Analyst (analyst)
**Description**: Read-only access for data analysis and reporting
**Users**: Data analysts, business intelligence team

### 6. Viewer (viewer)
**Description**: Basic read-only access to dashboards
**Users**: External consultants, temporary staff

## Access Control Matrix

### Core Permissions

| Resource/Feature | Super Admin | Tenant Admin | Ops Manager | Support Agent | Analyst | Viewer |
|------------------|-------------|--------------|-------------|---------------|---------|---------|
| **Dashboard** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| View Overview | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Export Reports | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |

### Nodes Management

| Operation | Super Admin | Tenant Admin | Ops Manager | Support Agent | Analyst | Viewer |
|-----------|-------------|--------------|-------------|---------------|---------|---------|
| View Nodes List | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| View Node Details | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create Nodes | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Edit Nodes | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Delete Nodes | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Update Node Status | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| View Node Logs | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| Export Node Data | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |

### Alerts Management

| Operation | Super Admin | Tenant Admin | Ops Manager | Support Agent | Analyst | Viewer |
|-----------|-------------|--------------|-------------|---------------|---------|---------|
| View Alerts List | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| View Alert Details | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Acknowledge Alerts | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Resolve Alerts | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Create Manual Alerts | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Delete Alerts | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Configure Alert Rules | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Export Alert Data | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |

### User Management

| Operation | Super Admin | Tenant Admin | Ops Manager | Support Agent | Analyst | Viewer |
|-----------|-------------|--------------|-------------|---------------|---------|---------|
| View Users List | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| View User Details | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Create Users | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Edit User Profile | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Assign Roles | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Reset Passwords | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Suspend/Reactivate Users | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Delete Users | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Export User Data | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |

### Settings Management

| Operation | Super Admin | Tenant Admin | Ops Manager | Support Agent | Analyst | Viewer |
|-----------|-------------|--------------|-------------|---------------|---------|---------|
| View General Settings | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Edit General Settings | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Manage API Tokens | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Configure Webhooks | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| View System Status | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Manage Integrations | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Export Settings | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |

### Audit Logs

| Operation | Super Admin | Tenant Admin | Ops Manager | Support Agent | Analyst | Viewer |
|-----------|-------------|--------------|-------------|---------------|---------|---------|
| View Audit Logs | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| Search Audit Logs | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| Filter Audit Logs | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| Export Audit Logs | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| View Sensitive Logs | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Delete Audit Logs | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |

### Telemetry & Analytics

| Operation | Super Admin | Tenant Admin | Ops Manager | Support Agent | Analyst | Viewer |
|-----------|-------------|--------------|-------------|---------------|---------|---------|
| View Telemetry Dashboard | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| View Performance Metrics | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| View Security Events | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| Create Telemetry Events | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Configure Metrics Collection | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Export Telemetry Data | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| Delete Telemetry Data | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| View System Health | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

### System Administration

| Operation | Super Admin | Tenant Admin | Ops Manager | Support Agent | Analyst | Viewer |
|-----------|-------------|--------------|-------------|---------------|---------|---------|
| System Configuration | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Database Management | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Security Configuration | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Backup Management | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Maintenance Mode | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Update System | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| View System Logs | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Monitor Performance | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |

## Permission Inheritance

Roles inherit permissions from roles below them in the hierarchy:

```
Super Admin
    ↓ (inherits all)
Tenant Admin
    ↓ (inherits all)
Operations Manager
    ↓ (inherits read-only)
Support Agent
    ↓ (inherits read-only)
Analyst
    ↓ (inherits read-only)
Viewer
```

## Access Control Implementation

### Frontend Guarding

```typescript
// Example permission check
const hasPermission = (userRole: string, resource: string, action: string): boolean => {
  const permissions = RBAC_MATRIX[userRole];
  return permissions[resource]?.includes(action) || false;
};

// Usage in components
{hasPermission(user.role, 'nodes', 'create') && (
  <Button onClick={handleCreateNode}>Create Node</Button>
)}
```

### Backend Authorization

```typescript
// Example middleware
const authorize = (requiredRole: string, requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = await getCurrentUser(req);

    if (!hasPermission(user.role, requiredPermission, 'read')) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
};
```

## Security Considerations

### Principle of Least Privilege
- Users receive minimum permissions necessary for their role
- Regular audits of user permissions
- Temporary access for contractors and consultants

### Separation of Duties
- Critical operations require multiple role approval
- Audit trail for all sensitive actions
- Role rotation for high-privilege accounts

### Access Review Process
- Quarterly permission reviews
- Automated access anomaly detection
- Immediate revocation of unnecessary permissions

## Compliance Requirements

### Data Protection
- GDPR compliance for personal data access
- Role-based data minimization
- Audit logging for all data access

### Industry Standards
- SOC 2 Type II compliance considerations
- ISO 27001 access control requirements
- NIST Cybersecurity Framework alignment

## Role Assignment Guidelines

### Super Admin
- Maximum 2-3 users per organization
- Requires multi-factor authentication
- Mandatory security training
- Quarterly access review

### Tenant Admin
- Limited to tenant scope
- Cannot access other tenants' data
- Requires approval for system-wide changes

### Operations Manager
- Day-to-day operational responsibilities
- Cannot modify user roles
- Limited to operational data access

### Support Agent
- Customer-facing role only
- No system configuration access
- Time-bound elevated access for troubleshooting

### Analyst
- Read-only data access
- No modification permissions
- Export capabilities for reporting

### Viewer
- Dashboard access only
- No export capabilities
- Temporary access recommended

## Access Request Process

### New User Access
1. Manager submits access request
2. System admin reviews and approves
3. Account created with appropriate role
4. User completes onboarding training
5. Access granted and logged

### Role Changes
1. Manager submits role change request
2. Current permissions reviewed
3. New role requirements validated
4. Role updated with audit trail
5. User notified of changes

### Access Revocation
1. Immediate revocation on termination
2. Automated deprovisioning
3. Access audit conducted
4. Documentation updated
5. Confirmation of revocation

## Monitoring and Auditing

### Access Monitoring
- Real-time access logging
- Anomaly detection alerts
- Failed access attempt tracking
- Privileged access monitoring

### Audit Requirements
- Complete access history
- Change tracking
- Compliance reporting
- Regular security audits

## Emergency Access

### Break-Glass Procedure
- Emergency access for critical situations
- Multi-person approval required
- Temporary elevated privileges
- Automatic audit and review
- Time-limited access

### Lost/Stolen Credentials
- Immediate account suspension
- Password reset procedures
- Access pattern review
- Security incident reporting
- Documentation of incident

## Future Enhancements

### Planned Features
- Just-in-time access provisioning
- Attribute-based access control (ABAC)
- Risk-based authentication
- API access management
- Integration with external identity providers

### Automation
- Automated permission provisioning
- Regular access review automation
- Self-service access requests
- Intelligent permission recommendations