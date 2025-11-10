/**
 * Permission Guard System
 * Centralized permission checking for admin operations
 */

import { getCurrentAdminUser, hasPermission } from '@/lib/auth/admin-auth';
import type { AdminRole } from '@/lib/auth/admin-auth';

export interface PermissionGuardOptions {
  requireRole?: AdminRole;
  requirePermission?: string;
  requireTenantId?: string;
  fallback?: React.ReactNode;
}

export interface GuardedComponentProps extends PermissionGuardOptions {
  children: React.ReactNode;
}

/**
 * Server-side permission guard for API routes and server actions
 */
export async function checkServerPermissions(options: PermissionGuardOptions): Promise<{
  allowed: boolean;
  user?: any;
  error?: string;
}> {
  try {
    const user = await getCurrentAdminUser();

    if (!user) {
      return { allowed: false, error: 'Unauthorized' };
    }

    if (!user.tenantContext) {
      return { allowed: false, error: 'No tenant context found' };
    }

    // Check role requirements
    if (options.requireRole) {
      const roleHierarchy = {
        superadmin: 5,
        city_admin: 4,
        operator: 3,
        analyst: 2,
        partner_viewer: 1,
      } as const;

      const userRoleLevel = roleHierarchy[user.tenantContext.role];
      const requiredRoleLevel = roleHierarchy[options.requireRole];

      if (userRoleLevel < requiredRoleLevel) {
        return {
          allowed: false,
          error: `Requires ${options.requireRole} role or higher`,
          user
        };
      }
    }

    // Check permission requirements
    if (options.requirePermission) {
      const hasRequiredPermission = await hasPermission(options.requirePermission, user);
      if (!hasRequiredPermission) {
        return {
          allowed: false,
          error: `Missing required permission: ${options.requirePermission}`,
          user
        };
      }
    }

    // Check tenant access
    if (options.requireTenantId) {
      const canAccess = user.tenantContext.role === 'superadmin' ||
                       user.tenantContext.tenant_id === options.requireTenantId;
      if (!canAccess) {
        return {
          allowed: false,
          error: 'Tenant access denied',
          user
        };
      }
    }

    return { allowed: true, user };
  } catch (error) {
    console.error('Error checking server permissions:', error);
    return { allowed: false, error: 'Permission check failed' };
  }
}

/**
 * Permission matrix for easy role-based permission lookups
 */
export const PERMISSION_MATRIX = {
  superadmin: [
    'view_dashboard',
    'view_analytics',
    'manage_tenants',
    'view_all_tenants',
    'manage_users',
    'invite_users',
    'deactivate_users',
    'view_nodes',
    'manage_nodes',
    'create_nodes',
    'delete_nodes',
    'execute_node_commands',
    'view_node_details',
    'view_node_telemetry',
    'view_node_commands',
    'view_alerts',
    'manage_alerts',
    'acknowledge_alerts',
    'resolve_alerts',
    'manage_api_tokens',
    'manage_webhooks',
    'manage_settings',
    'export_data',
    'view_audit_log',
    'view_system_logs',
    'system_maintenance',
  ],
  city_admin: [
    'view_dashboard',
    'view_analytics',
    'manage_users',
    'invite_users',
    'deactivate_users',
    'view_nodes',
    'manage_nodes',
    'create_nodes',
    'delete_nodes',
    'execute_node_commands',
    'view_node_details',
    'view_node_telemetry',
    'view_node_commands',
    'view_alerts',
    'manage_alerts',
    'acknowledge_alerts',
    'resolve_alerts',
    'manage_api_tokens',
    'manage_webhooks',
    'manage_settings',
    'export_data',
    'view_audit_log',
  ],
  operator: [
    'view_dashboard',
    'view_analytics',
    'view_nodes',
    'manage_nodes',
    'execute_node_commands',
    'view_node_details',
    'view_node_telemetry',
    'view_node_commands',
    'view_alerts',
    'acknowledge_alerts',
    'view_audit_log',
  ],
  analyst: [
    'view_dashboard',
    'view_analytics',
    'view_nodes',
    'view_node_details',
    'view_node_telemetry',
    'view_alerts',
    'view_audit_log',
    'view_detailed_analytics',
    'export_data',
  ],
  partner_viewer: [
    'view_dashboard',
    'view_analytics',
    'view_own_nodes',
    'view_own_alerts',
    'view_own_analytics',
  ],
} as const;

/**
 * Check if a role has a specific permission
 */
export function roleHasPermission(role: AdminRole, permission: string): boolean {
  return PERMISSION_MATRIX[role]?.includes(permission as any) || false;
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: AdminRole): string[] {
  return [...(PERMISSION_MATRIX[role] || [])];
}

/**
 * Check if user can perform action on resource
 */
export async function canPerformAction(
  action: string,
  resourceType: string,
  resourceId?: string
): Promise<boolean> {
  const user = await getCurrentAdminUser();

  if (!user || !user.tenantContext) {
    return false;
  }

  // Check basic permission
  const hasBasicPermission = await hasPermission(action, user);
  if (!hasBasicPermission) {
    return false;
  }

  // Superadmins can do anything
  if (user.tenantContext.role === 'superadmin') {
    return true;
  }

  // Additional resource-specific checks can be added here
  switch (resourceType) {
    case 'node':
      // TODO: Check if user can access specific node
      return true;
    case 'alert':
      // TODO: Check if user can access specific alert
      return true;
    case 'user':
      // TODO: Check if user can manage specific user
      return true;
    default:
      return true;
  }
}

/**
 * API route protection wrapper
 */
export function withApiPermissions(options: PermissionGuardOptions) {
  return function(handler: (req: Request, context: any) => Promise<Response>) {
    return async function(req: Request, context: any) {
      const permissionCheck = await checkServerPermissions(options);

      if (!permissionCheck.allowed) {
        return new Response(
          JSON.stringify({ error: permissionCheck.error || 'Forbidden' }),
          {
            status: 403,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      // Add user context to the request
      return handler(req, { ...context, user: permissionCheck.user });
    };
  };
}

/**
 * Resource access control for specific operations
 */
export const RESOURCE_ACCESS = {
  // Node operations
  canViewNode: async (nodeId: string) => canPerformAction('view_nodes', 'node', nodeId),
  canManageNode: async (nodeId: string) => canPerformAction('manage_nodes', 'node', nodeId),
  canCommandNode: async (nodeId: string) => canPerformAction('execute_node_commands', 'node', nodeId),

  // Alert operations
  canViewAlert: async (alertId: string) => canPerformAction('view_alerts', 'alert', alertId),
  canAcknowledgeAlert: async (alertId: string) => canPerformAction('acknowledge_alerts', 'alert', alertId),
  canResolveAlert: async (alertId: string) => canPerformAction('resolve_alerts', 'alert', alertId),

  // User operations
  canViewUser: async (userId: string) => canPerformAction('view_users', 'user', userId),
  canManageUser: async (userId: string) => canPerformAction('manage_users', 'user', userId),

  // Tenant operations
  canViewTenant: async (tenantId: string) => canPerformAction('view_tenants', 'tenant', tenantId),
  canManageTenant: async (tenantId: string) => canPerformAction('manage_tenants', 'tenant', tenantId),

  // Settings operations
  canManageSettings: async () => canPerformAction('manage_settings', 'settings'),
  canManageApiTokens: async () => canPerformAction('manage_api_tokens', 'settings'),
  canManageWebhooks: async () => canPerformAction('manage_webhooks', 'settings'),

  // Export operations
  canExportData: async (dataType: string) => canPerformAction('export_data', 'export', dataType),

  // Audit operations
  canViewAuditLog: async () => canPerformAction('view_audit_log', 'audit'),
  canViewSystemLogs: async () => canPerformAction('view_system_logs', 'audit'),
} as const;

/**
 * Feature flags for admin functionality
 */
export const ADMIN_FEATURES = {
  // Core features
  dashboard: { enabled: true, minRole: 'analyst' as AdminRole },
  analytics: { enabled: true, minRole: 'analyst' as AdminRole },

  // Node management
  node_list: { enabled: true, minRole: 'analyst' as AdminRole },
  node_details: { enabled: true, minRole: 'analyst' as AdminRole },
  node_commands: { enabled: true, minRole: 'operator' as AdminRole },
  node_create: { enabled: true, minRole: 'city_admin' as AdminRole },
  node_delete: { enabled: true, minRole: 'city_admin' as AdminRole },

  // Alert management
  alert_list: { enabled: true, minRole: 'analyst' as AdminRole },
  alert_acknowledge: { enabled: true, minRole: 'operator' as AdminRole },
  alert_resolve: { enabled: true, minRole: 'operator' as AdminRole },

  // User management
  user_list: { enabled: true, minRole: 'analyst' as AdminRole },
  user_invite: { enabled: true, minRole: 'city_admin' as AdminRole },
  user_manage: { enabled: true, minRole: 'city_admin' as AdminRole },

  // Settings
  settings_general: { enabled: true, minRole: 'city_admin' as AdminRole },
  settings_api_tokens: { enabled: true, minRole: 'city_admin' as AdminRole },
  settings_webhooks: { enabled: true, minRole: 'city_admin' as AdminRole },

  // Advanced features
  tenant_management: { enabled: true, minRole: 'superadmin' as AdminRole },
  system_maintenance: { enabled: true, minRole: 'superadmin' as AdminRole },
  audit_log: { enabled: true, minRole: 'analyst' as AdminRole },
  data_export: { enabled: true, minRole: 'analyst' as AdminRole },
} as const;

/**
 * Check if a feature is enabled for the current user
 */
export async function isFeatureEnabled(featureKey: keyof typeof ADMIN_FEATURES): Promise<boolean> {
  const feature = ADMIN_FEATURES[featureKey];
  if (!feature.enabled) {
    return false;
  }

  const user = await getCurrentAdminUser();
  if (!user || !user.tenantContext) {
    return false;
  }

  const roleHierarchy = {
    superadmin: 5,
    city_admin: 4,
    operator: 3,
    analyst: 2,
    partner_viewer: 1,
  } as const;

  const userRoleLevel = roleHierarchy[user.tenantContext.role];
  const requiredRoleLevel = roleHierarchy[feature.minRole];

  return userRoleLevel >= requiredRoleLevel;
}

/**
 * Get all enabled features for the current user
 */
export async function getEnabledFeatures(): Promise<(keyof typeof ADMIN_FEATURES)[]> {
  const features: (keyof typeof ADMIN_FEATURES)[] = [];

  for (const featureKey of Object.keys(ADMIN_FEATURES) as (keyof typeof ADMIN_FEATURES)[]) {
    if (await isFeatureEnabled(featureKey)) {
      features.push(featureKey);
    }
  }

  return features;
}