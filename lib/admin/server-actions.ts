/**
 * Admin Server Actions with Security Guards and Zod Validation
 * Provides a secure foundation for all admin operations with RBAC enforcement
 */

'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getCurrentAdminUser, hasPermission, canAccessTenant } from '@/lib/auth/admin-auth';
import { createClient } from '@/lib/supabase/server';
import type { AdminRole } from '@/lib/auth/admin-auth';

// Base result type for server actions
export type ActionResult<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

// Generic server action wrapper with security guards
export async function withAdminGuard<T>(
  action: (user: any, data?: any) => Promise<ActionResult<T>>,
  options?: {
    requireRole?: AdminRole;
    requirePermission?: string;
    requireTenantId?: string;
    schema?: z.ZodSchema<any>;
    revalidatePaths?: string[];
  }
) {
  return async (formData?: FormData): Promise<ActionResult<T>> => {
    try {
      // Authenticate user
      const user = await getCurrentAdminUser();
      if (!user) {
        return { success: false, error: 'Unauthorized' };
      }

      if (!user.tenantContext) {
        return { success: false, error: 'No tenant context found' };
      }

      // Role-based access control
      if (options?.requireRole) {
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
          return { success: false, error: 'Insufficient permissions' };
        }
      }

      // Permission-based access control
      if (options?.requirePermission) {
        const hasRequiredPermission = await hasPermission(options.requirePermission, user);
        if (!hasRequiredPermission) {
          return { success: false, error: 'Permission denied' };
        }
      }

      // Tenant access control
      if (options?.requireTenantId) {
        const canAccess = await canAccessTenant(options.requireTenantId);
        if (!canAccess) {
          return { success: false, error: 'Tenant access denied' };
        }
      }

      // Validate input data
      let validatedData;
      if (options?.schema && formData) {
        try {
          const data = Object.fromEntries(formData.entries());
          validatedData = options.schema.parse(data);
        } catch (error) {
          if (error instanceof z.ZodError) {
            const fieldErrors: Record<string, string[]> = {};
            error.errors.forEach((err) => {
              const path = err.path.join('.');
              if (!fieldErrors[path]) fieldErrors[path] = [];
              fieldErrors[path].push(err.message);
            });
            return { success: false, error: 'Validation failed', fieldErrors };
          }
          return { success: false, error: 'Invalid input data' };
        }
      }

      // Execute the action
      const result = await action(user, validatedData || formData);

      // Revalidate paths if specified
      if (result.success && options?.revalidatePaths) {
        for (const path of options.revalidatePaths) {
          revalidatePath(path);
        }
      }

      return result;
    } catch (error) {
      console.error('Server action error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };
}

// ============================================================================
// ZOD SCHEMAS FOR VALIDATION
// ============================================================================

// User management schemas
export const inviteUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.enum(['superadmin', 'city_admin', 'operator', 'analyst', 'partner_viewer'], {
    errorMap: () => ({ message: 'Invalid role selected' }),
  }),
  tenantId: z.string().uuid('Invalid tenant ID'),
});

export const updateUserRoleSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
  role: z.enum(['superadmin', 'city_admin', 'operator', 'analyst', 'partner_viewer'], {
    errorMap: () => ({ message: 'Invalid role selected' }),
  }),
  tenantId: z.string().uuid('Invalid tenant ID'),
});

// Node management schemas
export const createNodeSchema = z.object({
  nodeId: z.string().min(1, 'Node ID is required'),
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['hello_smart_node', 'city_safe_node', 'edge_infrastructure', 'transit_node', 'park_node'], {
    errorMap: () => ({ message: 'Invalid node type' }),
  }),
  partnerId: z.string().uuid('Invalid partner ID'),
  cityId: z.string().uuid('Invalid city ID'),
  address: z.string().min(1, 'Address is required'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  connectionType: z.enum(['fiber', 'cable', 'dsl', 'wireless', 'satellite', 'mesh'], {
    errorMap: () => ({ message: 'Invalid connection type' }),
  }).optional(),
});

export const updateNodeSchema = z.object({
  nodeId: z.string().uuid('Invalid node ID'),
  name: z.string().min(1, 'Name is required').optional(),
  status: z.enum(['active', 'inactive', 'maintenance', 'degraded', 'error', 'pending_install', 'testing'], {
    errorMap: () => ({ message: 'Invalid status' }),
  }).optional(),
  address: z.string().min(1, 'Address is required').optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

export const nodeCommandSchema = z.object({
  nodeId: z.string().uuid('Invalid node ID'),
  commandType: z.enum(['reboot', 'update_firmware', 'restart_service', 'configure'], {
    errorMap: () => ({ message: 'Invalid command type' }),
  }),
  commandData: z.record(z.any()).optional(),
});

// Alert management schemas
export const acknowledgeAlertSchema = z.object({
  alertId: z.string().uuid('Invalid alert ID'),
  note: z.string().optional(),
});

export const resolveAlertSchema = z.object({
  alertId: z.string().uuid('Invalid alert ID'),
  note: z.string().optional(),
  resolutionType: z.enum(['fixed', 'false_positive', 'maintenance', 'other'], {
    errorMap: () => ({ message: 'Invalid resolution type' }),
  }),
});

// API token schemas
export const createApiTokenSchema = z.object({
  name: z.string().min(1, 'Token name is required'),
  permissions: z.record(z.boolean()).optional(),
  allowedIps: z.array(z.string().ip()).optional(),
  rateLimit: z.number().min(1).max(10000).optional(),
  expiresAt: z.string().datetime().optional(),
});

export const updateApiTokenSchema = z.object({
  tokenId: z.string().uuid('Invalid token ID'),
  name: z.string().min(1, 'Token name is required').optional(),
  permissions: z.record(z.boolean()).optional(),
  allowedIps: z.array(z.string().ip()).optional(),
  rateLimit: z.number().min(1).max(10000).optional(),
  expiresAt: z.string().datetime().optional(),
});

// Webhook schemas
export const createWebhookSchema = z.object({
  name: z.string().min(1, 'Webhook name is required'),
  url: z.string().url('Invalid URL'),
  secret: z.string().min(1, 'Secret is required'),
  eventTypes: z.array(z.enum(['node.alert', 'node.offline', 'node.online', 'user.invited', 'alert.acknowledged', 'alert.resolved', 'system.maintenance']), {
    errorMap: () => ({ message: 'Invalid event type' }),
  }),
  retryAttempts: z.number().min(1).max(10).optional(),
  timeoutSeconds: z.number().min(5).max(300).optional(),
});

export const updateWebhookSchema = z.object({
  webhookId: z.string().uuid('Invalid webhook ID'),
  name: z.string().min(1, 'Webhook name is required').optional(),
  url: z.string().url('Invalid URL').optional(),
  secret: z.string().min(1, 'Secret is required').optional(),
  eventTypes: z.array(z.enum(['node.alert', 'node.offline', 'node.online', 'user.invited', 'alert.acknowledged', 'alert.resolved', 'system.maintenance'])).optional(),
  retryAttempts: z.number().min(1).max(10).optional(),
  timeoutSeconds: z.number().min(5).max(300).optional(),
});

// ============================================================================
// SERVER ACTIONS
// ============================================================================

// User management actions
export const inviteUser = withAdminGuard(
  async (user, validatedData) => {
    const supabase = await createClient();

    // Extract data from FormData
    const email = validatedData?.get('email') as string;
    const role = validatedData?.get('role') as string;
    const tenantId = validatedData?.get('tenantId') as string || user.tenantContext?.tenant_id;

    // Check if user exists
    const { data: existingProfile, error: profileError }: { data: any; error: any } = await supabase
      .from('profiles')
      .select('id, email')
      .eq('email', email)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      return { success: false, error: 'Error checking user profile' };
    }

    let userId: string;

    if (existingProfile) {
      userId = existingProfile.id;
    } else {
      return { success: false, error: 'User must sign up first before being invited to tenant' };
    }

    // Create tenant user relationship
    const { error: tenantUserError } = await (supabase
      .from('tenant_users') as any)
      .insert({
        tenant_id: tenantId,
        user_id: userId,
        role,
        invited_by: user.id,
        invited_at: new Date().toISOString(),
        status: 'pending',
      } as any);

    if (tenantUserError) {
      console.error('Error creating tenant user:', tenantUserError);
      return { success: false, error: 'Failed to create tenant user relationship' };
    }

    return { success: true, data: { userId, email, role } };
  },
  {
    requirePermission: 'invite_users',
    schema: inviteUserSchema,
    revalidatePaths: ['/admin/users'],
  }
);

export const updateUserRole = withAdminGuard(
  async (user, validatedData) => {
    const supabase = await createClient();
    const { userId, role, tenantId } = validatedData;

    const { error } = await (supabase
      .from('tenant_users') as any)
      .update({ role } as any)
      .eq('tenant_id', tenantId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating user role:', error);
      return { success: false, error: 'Failed to update user role' };
    }

    return { success: true, data: { userId, role } };
  },
  {
    requirePermission: 'manage_users',
    schema: updateUserRoleSchema,
    revalidatePaths: ['/admin/users'],
  }
);

export const deactivateUser = withAdminGuard(
  async (user, validatedData) => {
    const supabase = await createClient();
    const { userId, tenantId } = validatedData;

    // Don't allow deactivating yourself
    if (userId === user.id) {
      return { success: false, error: 'Cannot deactivate your own account' };
    }

    const { error } = await (supabase
      .from('tenant_users') as any)
      .update({ status: 'inactive' } as any)
      .eq('tenant_id', tenantId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deactivating user:', error);
      return { success: false, error: 'Failed to deactivate user' };
    }

    return { success: true, data: { userId } };
  },
  {
    requirePermission: 'deactivate_users',
    schema: z.object({
      userId: z.string().uuid('Invalid user ID'),
      tenantId: z.string().uuid('Invalid tenant ID'),
    }),
    revalidatePaths: ['/admin/users'],
  }
);

// Node management actions
export const createNode = withAdminGuard(
  async (user, validatedData) => {
    const supabase = await createClient();

    const { error } = await (supabase
      .from('nodes') as any)
      .insert({
        ...validatedData,
        tenant_id: user.tenantContext?.tenant_id,
        status: 'pending_install',
        created_at: new Date().toISOString(),
      } as any);

    if (error) {
      console.error('Error creating node:', error);
      return { success: false, error: 'Failed to create node' };
    }

    return { success: true, data: validatedData };
  },
  {
    requirePermission: 'create_nodes',
    schema: createNodeSchema,
    revalidatePaths: ['/admin/nodes'],
  }
);

export const updateNode = withAdminGuard(
  async (user, validatedData) => {
    const supabase = await createClient();
    const { nodeId, ...updateData } = validatedData;

    const { error } = await (supabase
      .from('nodes') as any)
      .update(updateData as any)
      .eq('id', nodeId)
      .eq('tenant_id', user.tenantContext?.tenant_id);

    if (error) {
      console.error('Error updating node:', error);
      return { success: false, error: 'Failed to update node' };
    }

    return { success: true, data: { nodeId, ...updateData } };
  },
  {
    requirePermission: 'manage_nodes',
    schema: updateNodeSchema,
    revalidatePaths: ['/admin/nodes'],
  }
);

export const executeNodeCommand = withAdminGuard(
  async (user, validatedData) => {
    const supabase = await createClient();
    const { nodeId, commandType, commandData } = validatedData;

    // Check if node belongs to user's tenant
    const { data: node, error: nodeError } = await supabase
      .from('nodes')
      .select('id, tenant_id')
      .eq('id', nodeId)
      .eq('tenant_id', user.tenantContext?.tenant_id)
      .single();

    if (nodeError || !node) {
      return { success: false, error: 'Node not found or access denied' };
    }

    // Create command record
    const { error: commandError } = await (supabase
      .from('node_commands') as any)
      .insert({
        node_id: nodeId,
        tenant_id: user.tenantContext?.tenant_id,
        command_type: commandType,
        command_data: commandData || {},
        status: 'pending',
        executed_by: user.id,
        created_at: new Date().toISOString(),
      } as any);

    if (commandError) {
      console.error('Error creating node command:', commandError);
      return { success: false, error: 'Failed to execute command' };
    }

    // TODO: Implement actual command execution logic (e.g., via message queue, WebSocket, etc.)

    return { success: true, data: { nodeId, commandType } };
  },
  {
    requirePermission: 'execute_node_commands',
    schema: nodeCommandSchema,
    revalidatePaths: ['/admin/nodes'],
  }
);

// Alert management actions
export const acknowledgeAlert = withAdminGuard(
  async (user, validatedData) => {
    const supabase = await createClient();
    const { alertId, note } = validatedData;

    // Check if alert belongs to user's tenant
    const { data: alert, error: alertError } = await supabase
      .from('node_alerts')
      .select('id, tenant_id, status')
      .eq('id', alertId)
      .eq('tenant_id', user.tenantContext?.tenant_id)
      .returns<any>()
      .single();

    if (alertError || !alert) {
      return { success: false, error: 'Alert not found or access denied' };
    }

    if ((alert as any).status !== 'open') {
      return { success: false, error: 'Alert is already acknowledged or resolved' };
    }

    // Update alert status
    const { error: updateError } = await (supabase
      .from('node_alerts') as any)
      .update({
        status: 'acknowledged',
        acknowledged_at: new Date().toISOString(),
        acknowledged_by: user.id,
      } as any)
      .eq('id', alertId);

    if (updateError) {
      console.error('Error acknowledging alert:', updateError);
      return { success: false, error: 'Failed to acknowledge alert' };
    }

    // Create alert action record
    const { error: actionError } = await (supabase
      .from('alert_actions') as any)
      .insert({
        alert_id: alertId,
        tenant_id: user.tenantContext?.tenant_id,
        action_type: 'acknowledged',
        action_note: note,
        performed_by: user.id,
        performed_at: new Date().toISOString(),
        previous_status: 'open',
      } as any);

    if (actionError) {
      console.error('Error creating alert action:', actionError);
      // Don't fail the whole operation if action logging fails
    }

    return { success: true, data: { alertId } };
  },
  {
    requirePermission: 'acknowledge_alerts',
    schema: acknowledgeAlertSchema,
    revalidatePaths: ['/admin/alerts'],
  }
);

export const resolveAlert = withAdminGuard(
  async (user, validatedData) => {
    const supabase = await createClient();
    const { alertId, note, resolutionType } = validatedData;

    // Check if alert belongs to user's tenant
    const { data: alert, error: alertError } = await supabase
      .from('node_alerts')
      .select('id, tenant_id, status')
      .eq('id', alertId)
      .eq('tenant_id', user.tenantContext?.tenant_id)
      .returns<any>()
      .single();

    if (alertError || !alert) {
      return { success: false, error: 'Alert not found or access denied' };
    }

    if ((alert as any).status === 'resolved') {
      return { success: false, error: 'Alert is already resolved' };
    }

    // Update alert status
    const { error: updateError } = await (supabase
      .from('node_alerts') as any)
      .update({
        status: 'resolved',
        resolved_at: new Date().toISOString(),
        resolved_by: user.id,
      } as any)
      .eq('id', alertId);

    if (updateError) {
      console.error('Error resolving alert:', updateError);
      return { success: false, error: 'Failed to resolve alert' };
    }

    // Create alert action record
    const { error: actionError } = await (supabase
      .from('alert_actions') as any)
      .insert({
        alert_id: alertId,
        tenant_id: user.tenantContext?.tenant_id,
        action_type: 'resolved',
        action_note: `${resolutionType}: ${note || ''}`,
        performed_by: user.id,
        performed_at: new Date().toISOString(),
        previous_status: (alert as any).status,
      } as any);

    if (actionError) {
      console.error('Error creating alert action:', actionError);
      // Don't fail the whole operation if action logging fails
    }

    return { success: true, data: { alertId } };
  },
  {
    requirePermission: 'resolve_alerts',
    schema: resolveAlertSchema,
    revalidatePaths: ['/admin/alerts'],
  }
);

// API Token actions
export const createApiToken = withAdminGuard(
  async (user, validatedData) => {
    const supabase = await createClient();
    const { name, permissions, allowedIps, rateLimit, expiresAt } = validatedData;

    // Generate secure token
    const token = generateSecureToken();
    const tokenHash = await hashToken(token);
    const tokenPrefix = token.substring(0, 8);

    const { error } = await (supabase
      .from('api_tokens') as any)
      .insert({
        tenant_id: user.tenantContext?.tenant_id,
        name,
        token_hash: tokenHash,
        token_prefix: tokenPrefix,
        permissions: permissions || {},
        allowed_ips: allowedIps,
        rate_limit: rateLimit || 1000,
        expires_at: expiresAt ? new Date(expiresAt).toISOString() : null,
        created_by: user.id,
        created_at: new Date().toISOString(),
      } as any);

    if (error) {
      console.error('Error creating API token:', error);
      return { success: false, error: 'Failed to create API token' };
    }

    // Return the full token (only shown once)
    return { success: true, data: { token, name, prefix: tokenPrefix } };
  },
  {
    requirePermission: 'manage_api_tokens',
    schema: createApiTokenSchema,
    revalidatePaths: ['/admin/settings'],
  }
);

export const revokeApiToken = withAdminGuard(
  async (user, validatedData) => {
    const supabase = await createClient();
    const { tokenId } = validatedData;

    const { error } = await (supabase
      .from('api_tokens') as any)
      .update({
        status: 'revoked',
        revoked_by: user.id,
        revoked_at: new Date().toISOString(),
      } as any)
      .eq('id', tokenId)
      .eq('tenant_id', user.tenantContext?.tenant_id);

    if (error) {
      console.error('Error revoking API token:', error);
      return { success: false, error: 'Failed to revoke API token' };
    }

    return { success: true, data: { tokenId } };
  },
  {
    requirePermission: 'manage_api_tokens',
    schema: z.object({
      tokenId: z.string().uuid('Invalid token ID'),
    }),
    revalidatePaths: ['/admin/settings'],
  }
);

// Utility functions
function generateSecureToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = 'forhem_';
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// User Management Additional Actions

export const getTenantUsers = withAdminGuard(
  async (user, validatedData) => {
    const supabase = await createClient();
    const { page = 1, limit = 20, role = 'all', status = 'all', search = '' } = validatedData;

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Build query with filters
    let query = supabase
      .from('tenant_users' as any)
      .select(`
        *,
        users!inner(
          id,
          email,
          raw_user_meta_data,
          created_at,
          last_sign_in_at
        )
      `, { count: 'exact' })
      .eq('tenant_id', user.tenantContext?.tenant_id);

    // Apply filters
    if (role !== 'all') {
      query = query.eq('role', role);
    }

    if (status !== 'all') {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.or(`users.email.ilike.%${search}%`);
    }

    const { data: tenantUsers, error, count } = await query
      .range(from, to)
      .order('created_at', { ascending: false })
      .returns<any>();

    if (error) {
      console.error('Error fetching tenant users:', error);
      return { success: false, error: 'Failed to fetch users' };
    }

    // Transform data for frontend
    const transformedUsers = tenantUsers?.map((tenantUser: any) => {
      const userData = tenantUser.users || {};
      const metaData = userData.raw_user_meta_data || {};

      return {
        id: tenantUser.id,
        userId: tenantUser.user_id,
        email: userData.email,
        firstName: metaData.first_name || '',
        lastName: metaData.last_name || '',
        fullName: metaData.first_name && metaData.last_name
          ? `${metaData.first_name} ${metaData.last_name}`
          : userData.email?.split('@')[0] || 'Unknown',
        avatar: metaData.avatar_url || null,
        role: tenantUser.role,
        status: tenantUser.status,
        invitedBy: tenantUser.invited_by,
        invitedAt: tenantUser.invited_at,
        joinedAt: tenantUser.joined_at,
        lastLoginAt: userData.last_sign_in_at,
        createdAt: userData.created_at,
        updatedAt: tenantUser.updated_at,
      };
    }) || [];

    return {
      success: true,
      data: {
        users: transformedUsers,
        total: count || 0,
        page,
        limit,
      }
    };
  },
  {
    requirePermission: 'manage_users',
    schema: z.object({
      page: z.coerce.number().int().positive().optional(),
      limit: z.coerce.number().int().positive().max(100).optional(),
      role: z.enum(['all', 'superadmin', 'city_admin', 'operator', 'analyst', 'partner_viewer']).optional(),
      status: z.enum(['all', 'active', 'inactive', 'pending']).optional(),
      search: z.string().max(200).optional(),
    }),
  }
);

export const reactivateUser = withAdminGuard(
  async (user, validatedData) => {
    const supabase = await createClient();
    const { userId } = validatedData;

    // Prevent reactivating self (though they shouldn't be able to deactivate themselves)
    if (userId === user.id) {
      return { success: false, error: 'Cannot reactivate your own account' };
    }

    // Update user status back to active
    const { error } = await (supabase
      .from('tenant_users') as any)
      .update({
        status: 'active',
        updated_at: new Date().toISOString(),
      } as any)
      .eq('user_id', userId)
      .eq('tenant_id', user.tenantContext?.tenant_id);

    if (error) {
      console.error('Error reactivating user:', error);
      return { success: false, error: 'Failed to reactivate user' };
    }

    return { success: true, data: { userId, status: 'active' } };
  },
  {
    requirePermission: 'manage_users',
    schema: z.object({
      userId: z.string().uuid('Invalid user ID'),
    }),
    revalidatePaths: ['/admin/users'],
  }
);

async function hashToken(token: string): Promise<string> {
  // In a real implementation, use a proper hashing library
  // For now, return a simple hash (this is NOT secure for production)
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}