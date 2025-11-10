/**
 * Client-side Permission Guard Component
 * Controls UI element visibility based on user permissions and roles
 */

'use client';

import { useAdminAuth } from '@/lib/auth/admin-auth-client';
import type { AdminRole } from '@/lib/auth/admin-auth';
import { ADMIN_FEATURES, isFeatureEnabledForRole } from '@/lib/admin/permission-guards-client';

interface PermissionGuardProps {
  children: React.ReactNode;
  role?: AdminRole;
  roleLevel?: AdminRole;
  permission?: string;
  feature?: keyof typeof ADMIN_FEATURES;
  fallback?: React.ReactNode;
  className?: string;
}

/**
 * Component that conditionally renders children based on user permissions
 */
export function PermissionGuard({
  children,
  role,
  roleLevel,
  permission,
  feature,
  fallback = null,
  className,
}: PermissionGuardProps) {
  const { user, loading, hasPermission: checkPermission, hasRole, hasRoleLevel: checkRoleLevel } = useAdminAuth();

  // Show loading state while auth is being determined
  if (loading) {
    return <div className={className}>Loading...</div>;
  }

  // No user - deny access
  if (!user || !user.tenantContext) {
    return <>{fallback}</>;
  }

  let hasAccess = true;

  // Check specific role requirement
  if (role && !hasRole(role)) {
    hasAccess = false;
  }

  // Check role level requirement
  if (roleLevel && !checkRoleLevel(roleLevel)) {
    hasAccess = false;
  }

  // Check specific permission requirement
  if (permission && !checkPermission(permission)) {
    hasAccess = false;
  }

  // Check feature flag
  if (feature) {
    if (!isFeatureEnabledForRole(feature, user.tenantContext.role)) {
      hasAccess = false;
    }
  }

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <div className={className}>{children}</div>;
}

/**
 * Higher-order component for protecting entire components
 */
export function withPermissionGuard<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    role?: AdminRole;
    roleLevel?: AdminRole;
    permission?: string;
    feature?: keyof typeof ADMIN_FEATURES;
    fallback?: React.ReactNode;
  }
) {
  return function GuardedComponent(props: P) {
    return (
      <PermissionGuard {...options}>
        <Component {...props} />
      </PermissionGuard>
    );
  };
}

/**
 * Component for conditionally showing navigation items
 */
export function NavItemGuard({
  children,
  requiredPermission,
  requiredRole,
  fallback,
}: {
  children: React.ReactNode;
  requiredPermission?: string;
  requiredRole?: AdminRole;
  fallback?: React.ReactNode;
}) {
  return (
    <PermissionGuard
      permission={requiredPermission}
      role={requiredRole}
      fallback={fallback}
    >
      {children}
    </PermissionGuard>
  );
}

/**
 * Component for protecting form actions
 */
export function ActionGuard({
  children,
  action,
  fallback,
  disabled = false,
  className,
}: {
  children: React.ReactNode;
  action: string;
  fallback?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <PermissionGuard
      permission={action}
      fallback={
        fallback || (
          <button
            type="button"
            disabled
            className={`opacity-50 cursor-not-allowed ${className}`}
            title="You don't have permission to perform this action"
          >
            {children}
          </button>
        )
      }
    >
      {children}
    </PermissionGuard>
  );
}

/**
 * Component for showing/hiding sections based on features
 */
export function FeatureGuard({
  children,
  feature,
  fallback,
}: {
  children: React.ReactNode;
  feature: keyof typeof ADMIN_FEATURES;
  fallback?: React.ReactNode;
}) {
  return (
    <PermissionGuard feature={feature} fallback={fallback}>
      {children}
    </PermissionGuard>
  );
}

/**
 * Component for role-based UI variations
 */
export function RoleVariant({
  children,
  variants,
  fallback,
}: {
  children?: React.ReactNode;
  variants: Partial<Record<AdminRole, React.ReactNode>>;
  fallback?: React.ReactNode;
}) {
  const { user, loading, hasRole } = useAdminAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.tenantContext) {
    return <>{fallback}</>;
  }

  const userRole = user.tenantContext.role;
  const variantContent = variants[userRole];

  if (variantContent) {
    return <>{variantContent}</>;
  }

  // Fallback to children if no specific variant
  if (children) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

/**
 * Hook for checking permissions programmatically
 */
export function usePermissions() {
  const { user, loading, hasPermission: checkPermission, hasRole, hasRoleLevel } = useAdminAuth();

  const can = {
    // View permissions
    viewDashboard: () => checkPermission('view_dashboard'),
    viewAnalytics: () => checkPermission('view_analytics'),
    viewNodes: () => checkPermission('view_nodes'),
    viewNodeDetails: () => checkPermission('view_node_details'),
    viewAlerts: () => checkPermission('view_alerts'),
    viewAuditLog: () => checkPermission('view_audit_log'),

    // Management permissions
    manageUsers: () => checkPermission('manage_users'),
    inviteUsers: () => checkPermission('invite_users'),
    manageNodes: () => checkPermission('manage_nodes'),
    createNodes: () => checkPermission('create_nodes'),
    deleteNodes: () => checkPermission('delete_nodes'),
    manageAlerts: () => checkPermission('manage_alerts'),

    // Action permissions
    acknowledgeAlerts: () => checkPermission('acknowledge_alerts'),
    resolveAlerts: () => checkPermission('resolve_alerts'),
    executeNodeCommands: () => checkPermission('execute_node_commands'),

    // Settings permissions
    manageSettings: () => checkPermission('manage_settings'),
    manageApiTokens: () => checkPermission('manage_api_tokens'),
    manageWebhooks: () => checkPermission('manage_webhooks'),

    // System permissions
    manageTenants: () => checkPermission('manage_tenants'),
    exportData: () => checkPermission('export_data'),
    systemMaintenance: () => checkPermission('system_maintenance'),
  };

  const is = {
    superadmin: () => hasRole('superadmin'),
    cityAdmin: () => hasRole('city_admin'),
    operator: () => hasRole('operator'),
    analyst: () => hasRole('analyst'),
    partnerViewer: () => hasRole('partner_viewer'),
  };

  const hasLevel = {
    superadminOrHigher: () => hasRoleLevel('superadmin'),
    cityAdminOrHigher: () => hasRoleLevel('city_admin'),
    operatorOrHigher: () => hasRoleLevel('operator'),
    analystOrHigher: () => hasRoleLevel('analyst'),
    partnerViewerOrHigher: () => hasRoleLevel('partner_viewer'),
  };

  return {
    user,
    loading,
    can,
    is,
    hasLevel,
    hasPermission: checkPermission,
    hasRole,
    hasRoleLevel,
  };
}

/**
 * Export common permission checker functions for convenience
 * These are higher-order components that take children as arguments
 */
export const createPermissionGuards = {
  // Navigation items
  canViewDashboard: (children: React.ReactNode) => <PermissionGuard permission="view_dashboard">{children}</PermissionGuard>,
  canManageUsers: (children: React.ReactNode) => <PermissionGuard permission="manage_users">{children}</PermissionGuard>,
  canManageNodes: (children: React.ReactNode) => <PermissionGuard permission="manage_nodes">{children}</PermissionGuard>,
  canViewAlerts: (children: React.ReactNode) => <PermissionGuard permission="view_alerts">{children}</PermissionGuard>,
  canManageSettings: (children: React.ReactNode) => <PermissionGuard permission="manage_settings">{children}</PermissionGuard>,

  // Actions
  canInviteUsers: (children: React.ReactNode) => <PermissionGuard permission="invite_users">{children}</PermissionGuard>,
  canCreateNodes: (children: React.ReactNode) => <PermissionGuard permission="create_nodes">{children}</PermissionGuard>,
  canExecuteCommands: (children: React.ReactNode) => <PermissionGuard permission="execute_node_commands">{children}</PermissionGuard>,
  canAcknowledgeAlerts: (children: React.ReactNode) => <PermissionGuard permission="acknowledge_alerts">{children}</PermissionGuard>,
  canResolveAlerts: (children: React.ReactNode) => <PermissionGuard permission="resolve_alerts">{children}</PermissionGuard>,

  // Features
  canViewTenantManagement: (children: React.ReactNode) => <PermissionGuard feature="tenant_management">{children}</PermissionGuard>,
  canViewSystemMaintenance: (children: React.ReactNode) => <PermissionGuard feature="system_maintenance">{children}</PermissionGuard>,
  canExportData: (children: React.ReactNode) => <PermissionGuard feature="data_export">{children}</PermissionGuard>,
};