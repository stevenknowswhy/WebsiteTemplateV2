/**
 * Client-side Permission Guard System
 * Centralized permission checking for admin operations (client-safe)
 */

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
 * Check if a feature is enabled for a given role
 */
export function isFeatureEnabledForRole(featureKey: keyof typeof ADMIN_FEATURES, userRole: AdminRole): boolean {
  const feature = ADMIN_FEATURES[featureKey];
  if (!feature.enabled) {
    return false;
  }

  const roleHierarchy = {
    superadmin: 5,
    city_admin: 4,
    operator: 3,
    analyst: 2,
    partner_viewer: 1,
  } as const;

  const userRoleLevel = roleHierarchy[userRole];
  const requiredRoleLevel = roleHierarchy[feature.minRole];

  return userRoleLevel >= requiredRoleLevel;
}

/**
 * Get all enabled features for a given role
 */
export function getEnabledFeaturesForRole(userRole: AdminRole): (keyof typeof ADMIN_FEATURES)[] {
  const features: (keyof typeof ADMIN_FEATURES)[] = [];

  for (const featureKey of Object.keys(ADMIN_FEATURES) as (keyof typeof ADMIN_FEATURES)[]) {
    if (isFeatureEnabledForRole(featureKey, userRole)) {
      features.push(featureKey);
    }
  }

  return features;
}

/**
 * Client-side permission checking function
 */
export function checkClientPermission(permission: string, userRole: AdminRole): boolean {
  return roleHasPermission(userRole, permission);
}

/**
 * Client-side role level checking
 */
export function hasClientRoleLevel(requiredRole: AdminRole, userRole: AdminRole): boolean {
  const roleHierarchy = {
    superadmin: 5,
    city_admin: 4,
    operator: 3,
    analyst: 2,
    partner_viewer: 1,
  } as const;

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

/**
 * Resource access control for client-side checking
 */
export const CLIENT_RESOURCE_ACCESS = {
  // Node operations
  canViewNode: (userRole: AdminRole) => checkClientPermission('view_nodes', userRole),
  canManageNode: (userRole: AdminRole) => checkClientPermission('manage_nodes', userRole),
  canCommandNode: (userRole: AdminRole) => checkClientPermission('execute_node_commands', userRole),

  // Alert operations
  canViewAlert: (userRole: AdminRole) => checkClientPermission('view_alerts', userRole),
  canAcknowledgeAlert: (userRole: AdminRole) => checkClientPermission('acknowledge_alerts', userRole),
  canResolveAlert: (userRole: AdminRole) => checkClientPermission('resolve_alerts', userRole),

  // User operations
  canViewUser: (userRole: AdminRole) => checkClientPermission('view_users', userRole),
  canManageUser: (userRole: AdminRole) => checkClientPermission('manage_users', userRole),

  // Settings operations
  canManageSettings: (userRole: AdminRole) => checkClientPermission('manage_settings', userRole),
  canManageApiTokens: (userRole: AdminRole) => checkClientPermission('manage_api_tokens', userRole),
  canManageWebhooks: (userRole: AdminRole) => checkClientPermission('manage_webhooks', userRole),

  // Export operations
  canExportData: (userRole: AdminRole) => checkClientPermission('export_data', userRole),

  // Audit operations
  canViewAuditLog: (userRole: AdminRole) => checkClientPermission('view_audit_log', userRole),
  canViewSystemLogs: (userRole: AdminRole) => checkClientPermission('view_system_logs', userRole),
} as const;