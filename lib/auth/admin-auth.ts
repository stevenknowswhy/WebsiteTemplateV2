/**
 * Enhanced Admin Authentication with Tenant and Role Management
 * Handles JWT claims, RBAC, and tenant context for admin operations
 */

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import type { User } from '@supabase/supabase-js';

// Role hierarchy for permission checking
export const ROLE_HIERARCHY = {
  superadmin: 5,
  city_admin: 4,
  operator: 3,
  analyst: 2,
  partner_viewer: 1,
} as const;

export type AdminRole = keyof typeof ROLE_HIERARCHY;

export interface TenantContext {
  tenant_id: string;
  tenant_name: string;
  role: AdminRole;
  permissions: Record<string, boolean>;
}

export interface AdminUser extends User {
  tenantContext?: TenantContext;
}

/**
 * Get the current authenticated user with tenant context
 * This is the primary authentication function for admin operations
 */
export const getCurrentAdminUser = cache(async (): Promise<AdminUser | null> => {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    // Extract tenant context from user metadata
    const userMetadata = user.user_metadata || {};
    const tenantContext: TenantContext | undefined = userMetadata.tenant_id ? {
      tenant_id: userMetadata.tenant_id,
      tenant_name: userMetadata.tenant_name || 'Unknown Tenant',
      role: userMetadata.role as AdminRole,
      permissions: getRolePermissions(userMetadata.role as AdminRole),
    } : undefined;

    return {
      ...user,
      tenantContext,
    };
  } catch (error) {
    console.error('Error getting current admin user:', error);
    return null;
  }
});

/**
 * Get tenant context for a specific user (admin function)
 */
export async function getUserTenantContext(userId: string): Promise<TenantContext | null> {
  try {
    const supabase = await createClient();

    const { data: tenantUser, error } = await supabase
      .from('tenant_users' as any)
      .select(`
        tenant_id,
        role,
        tenants(name),
        permissions
      `)
      .eq('user_id', userId)
      .eq('status', 'active')
      .returns<any>()
      .single();

    if (error || !tenantUser) {
      return null;
    }

    return {
      tenant_id: (tenantUser as any).tenant_id,
      tenant_name: (tenantUser as any).tenants?.name || 'Unknown Tenant',
      role: (tenantUser as any).role as AdminRole,
      permissions: {
        ...getRolePermissions((tenantUser as any).role as AdminRole),
        ...((tenantUser as any).permissions || {}),
      },
    };
  } catch (error) {
    console.error('Error getting user tenant context:', error);
    return null;
  }
}

/**
 * Get permission set for a given role
 */
export function getRolePermissions(role: AdminRole): Record<string, boolean> {
  const basePermissions = {
    // Dashboard permissions
    view_dashboard: true,
    view_analytics: true,

    // Node permissions
    view_nodes: true,
    view_node_details: true,

    // Alert permissions
    view_alerts: true,

    // Audit permissions
    view_audit_log: true,
  };

  const rolePermissions = {
    superadmin: {
      ...basePermissions,
      // Tenant management
      manage_tenants: true,
      view_all_tenants: true,

      // User management
      manage_users: true,
      invite_users: true,
      deactivate_users: true,

      // Node management
      manage_nodes: true,
      create_nodes: true,
      delete_nodes: true,
      execute_node_commands: true,

      // Alert management
      manage_alerts: true,
      acknowledge_alerts: true,
      resolve_alerts: true,

      // API and webhooks
      manage_api_tokens: true,
      manage_webhooks: true,

      // Settings
      manage_settings: true,
      export_data: true,

      // System
      view_system_logs: true,
      system_maintenance: true,
    },
    city_admin: {
      ...basePermissions,
      // User management (tenant-scoped)
      manage_users: true,
      invite_users: true,
      deactivate_users: true,

      // Node management (tenant-scoped)
      manage_nodes: true,
      create_nodes: true,
      delete_nodes: true,
      execute_node_commands: true,

      // Alert management
      manage_alerts: true,
      acknowledge_alerts: true,
      resolve_alerts: true,

      // API and webhooks
      manage_api_tokens: true,
      manage_webhooks: true,

      // Settings
      manage_settings: true,
      export_data: true,
    },
    operator: {
      ...basePermissions,
      // Node operations
      manage_nodes: true,
      execute_node_commands: true,

      // Alert management
      acknowledge_alerts: true,

      // View permissions
      view_node_telemetry: true,
      view_node_commands: true,
    },
    analyst: {
      ...basePermissions,
      // Enhanced viewing permissions
      view_node_telemetry: true,
      view_detailed_analytics: true,
      export_data: true,
    },
    partner_viewer: {
      // Limited viewing permissions
      view_own_nodes: true,
      view_own_alerts: true,
      view_own_analytics: true,
    },
  };

  return rolePermissions[role] || basePermissions;
}

/**
 * Check if a user has a specific permission
 */
export async function hasPermission(
  permission: string,
  user?: AdminUser
): Promise<boolean> {
  const currentUser = user || await getCurrentAdminUser();

  if (!currentUser || !currentUser.tenantContext) {
    return false;
  }

  return currentUser.tenantContext.permissions[permission] === true;
}

/**
 * Check if a user has a specific role or higher
 */
export function hasRoleLevel(requiredRole: AdminRole, userRole: AdminRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

/**
 * Check if current user can access a specific tenant
 */
export async function canAccessTenant(tenantId: string): Promise<boolean> {
  const user = await getCurrentAdminUser();

  if (!user || !user.tenantContext) {
    return false;
  }

  // Superadmins can access all tenants
  if (user.tenantContext.role === 'superadmin') {
    return true;
  }

  // Other roles can only access their own tenant
  return user.tenantContext.tenant_id === tenantId;
}

/**
 * Server-side authentication guard for admin routes
 * Throws redirect if user is not authenticated or doesn't have required role
 */
export async function requireAuth(minRole?: AdminRole): Promise<AdminUser> {
  const user = await getCurrentAdminUser();

  if (!user) {
    redirect('/auth/login');
  }

  if (!user.tenantContext) {
    console.error('User is authenticated but has no tenant context:', user.id);
    redirect('/auth/error?error=no_tenant_context');
  }

  if (minRole && !hasRoleLevel(minRole, user.tenantContext.role)) {
    console.error(
      `User ${user.email} (${user.tenantContext.role}) lacks required role ${minRole}`
    );
    redirect('/auth/error?error=insufficient_permissions');
  }

  return user;
}

/**
 * Server-side permission guard
 * Throws redirect if user doesn't have required permission
 */
export async function requirePermission(permission: string): Promise<AdminUser> {
  const user = await getCurrentAdminUser();

  if (!user) {
    redirect('/auth/login');
  }

  if (!user.tenantContext) {
    redirect('/auth/error?error=no_tenant_context');
  }

  if (!hasPermission(permission, user)) {
    console.error(
      `User ${user.email} (${user.tenantContext.role}) lacks required permission ${permission}`
    );
    redirect('/auth/error?error=permission_denied');
  }

  return user;
}

/**
 * Enrich JWT with tenant claims after login
 * This should be called after successful authentication
 */
export async function enrichJWTWithTenantClaims(userId: string): Promise<boolean> {
  try {
    const tenantContext = await getUserTenantContext(userId);

    if (!tenantContext) {
      console.warn('No tenant context found for user:', userId);
      return false;
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({
      data: {
        tenant_id: tenantContext.tenant_id,
        role: tenantContext.role,
        tenant_name: tenantContext.tenant_name,
      }
    });

    if (error) {
      console.error('Error enriching JWT with tenant claims:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error enriching JWT with tenant claims:', error);
    return false;
  }
}

/**
 * Create a new tenant user (admin function)
 */
export async function createTenantUser(
  tenantId: string,
  email: string,
  role: AdminRole,
  invitedBy: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createAdminClient();

    // First, get or create the user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles' as any)
      .select('id')
      .eq('email', email)
      .returns<any>()
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      return { success: false, error: 'Error checking user profile' };
    }

    let userId: string;

    if (profile) {
      userId = (profile as any).id;
    } else {
      // Create profile (this should be handled by the auth trigger when user signs up)
      return { success: false, error: 'User profile not found. User must sign up first.' };
    }

    // Create tenant user relationship
    const { error: tenantUserError } = await (supabase
      .from('tenant_users' as any)
      .insert({
        tenant_id: tenantId,
        user_id: userId,
        role,
        invited_by: invitedBy,
        invited_at: new Date().toISOString(),
        status: 'pending',
      } as any));

    if (tenantUserError) {
      console.error('Error creating tenant user:', tenantUserError);
      return { success: false, error: 'Failed to create tenant user relationship' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error creating tenant user:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
}

/**
 * Get all users for a tenant (admin function)
 */
export async function getTenantUsers(tenantId: string): Promise<any[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('tenant_users')
      .select(`
        id,
        user_id,
        role,
        status,
        invited_at,
        accepted_at,
        last_login_at,
        login_count,
        profiles!inner(
          email,
          full_name,
          avatar_url
        )
      `)
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error getting tenant users:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error getting tenant users:', error);
    return [];
  }
}

/**
 * Update user role within a tenant
 */
export async function updateUserRole(
  tenantId: string,
  userId: string,
  newRole: AdminRole
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.rpc('admin_update_user_role', {
      p_tenant_id: tenantId,
      p_user_id: userId,
      p_new_role: newRole
    } as any);

    if (error) {
      console.error('Error updating user role:', error);
      return { success: false, error: 'Failed to update user role' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating user role:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
}

/**
 * Deactivate a user in a tenant
 */
export async function deactivateTenantUser(
  tenantId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.rpc('admin_deactivate_user', {
      p_tenant_id: tenantId,
      p_user_id: userId
    } as any);

    if (error) {
      console.error('Error deactivating tenant user:', error);
      return { success: false, error: 'Failed to deactivate user' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error deactivating tenant user:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
}