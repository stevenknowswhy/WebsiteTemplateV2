/**
 * Client-side Admin Authentication Context
 * Provides tenant context and role-based permissions to React components
 */

'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import type { AdminRole, TenantContext } from './admin-auth';

export interface AdminUser extends User {
  tenantContext?: TenantContext;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  loading: boolean;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: AdminRole) => boolean;
  hasRoleLevel: (requiredRole: AdminRole) => boolean;
  refreshTenantContext: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  // Extract tenant context from user metadata
  const extractTenantContext = (user: User): TenantContext | undefined => {
    const metadata = user.user_metadata || {};
    if (!metadata.tenant_id || !metadata.role) {
      return undefined;
    }

    return {
      tenant_id: metadata.tenant_id,
      tenant_name: metadata.tenant_name || 'Unknown Tenant',
      role: metadata.role as AdminRole,
      permissions: getRolePermissions(metadata.role as AdminRole),
    };
  };

  // Get role permissions
  const getRolePermissions = (role: AdminRole): Record<string, boolean> => {
    const permissions = {
      superadmin: {
        view_dashboard: true,
        view_analytics: true,
        manage_tenants: true,
        view_all_tenants: true,
        manage_users: true,
        invite_users: true,
        deactivate_users: true,
        view_nodes: true,
        manage_nodes: true,
        create_nodes: true,
        delete_nodes: true,
        execute_node_commands: true,
        view_node_details: true,
        view_node_telemetry: true,
        view_alerts: true,
        manage_alerts: true,
        acknowledge_alerts: true,
        resolve_alerts: true,
        manage_api_tokens: true,
        manage_webhooks: true,
        manage_settings: true,
        export_data: true,
        view_audit_log: true,
        view_system_logs: true,
        system_maintenance: true,
      },
      city_admin: {
        view_dashboard: true,
        view_analytics: true,
        manage_users: true,
        invite_users: true,
        deactivate_users: true,
        view_nodes: true,
        manage_nodes: true,
        create_nodes: true,
        delete_nodes: true,
        execute_node_commands: true,
        view_node_details: true,
        view_node_telemetry: true,
        view_alerts: true,
        manage_alerts: true,
        acknowledge_alerts: true,
        resolve_alerts: true,
        manage_api_tokens: true,
        manage_webhooks: true,
        manage_settings: true,
        export_data: true,
        view_audit_log: true,
      },
      operator: {
        view_dashboard: true,
        view_analytics: true,
        view_nodes: true,
        manage_nodes: true,
        execute_node_commands: true,
        view_node_details: true,
        view_node_telemetry: true,
        view_alerts: true,
        acknowledge_alerts: true,
        view_audit_log: true,
      },
      analyst: {
        view_dashboard: true,
        view_analytics: true,
        view_nodes: true,
        view_node_details: true,
        view_node_telemetry: true,
        view_alerts: true,
        view_audit_log: true,
        view_detailed_analytics: true,
        export_data: true,
      },
      partner_viewer: {
        view_dashboard: true,
        view_analytics: true,
        view_own_nodes: true,
        view_own_alerts: true,
        view_own_analytics: true,
      },
    };

    return permissions[role] || {};
  };

  // Check if user has specific permission
  const hasPermission = (permission: string): boolean => {
    if (!user?.tenantContext) return false;
    return user.tenantContext.permissions[permission] === true;
  };

  // Check if user has specific role
  const hasRole = (role: AdminRole): boolean => {
    return user?.tenantContext?.role === role;
  };

  // Check if user has role level or higher
  const hasRoleLevel = (requiredRole: AdminRole): boolean => {
    if (!user?.tenantContext?.role) return false;

    const roleHierarchy = {
      superadmin: 5,
      city_admin: 4,
      operator: 3,
      analyst: 2,
      partner_viewer: 1,
    } as const;

    return roleHierarchy[user.tenantContext.role] >= roleHierarchy[requiredRole];
  };

  // Refresh tenant context from server
  const refreshTenantContext = async (): Promise<void> => {
    if (!user) return;

    try {
      const response = await fetch('/api/auth/refresh-tenant-context', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // The updated context will be available in the next auth state change
        await supabase.auth.refreshSession();
      }
    } catch (error) {
      console.error('Error refreshing tenant context:', error);
    }
  };

  // Sign out
  const signOut = async (): Promise<void> => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const tenantContext = extractTenantContext(session.user);
          setUser({
            ...session.user,
            tenantContext,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const tenantContext = extractTenantContext(session.user);
          setUser({
            ...session.user,
            tenantContext,
          });
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          const tenantContext = extractTenantContext(session.user);
          setUser({
            ...session.user,
            tenantContext,
          });
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const value: AdminAuthContextType = {
    user,
    loading,
    hasPermission,
    hasRole,
    hasRoleLevel,
    refreshTenantContext,
    signOut,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

/**
 * Hook to use admin authentication context
 */
export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

/**
 * Higher-order component for route protection
 */
export function withAdminAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    requireRole?: AdminRole;
    requirePermission?: string;
    redirectTo?: string;
  }
) {
  return function AuthenticatedComponent(props: P) {
    const { user, loading, hasPermission: checkPermission, hasRole } = useAdminAuth();

    useEffect(() => {
      if (loading) return;

      if (!user) {
        window.location.href = options?.redirectTo || '/auth/login';
        return;
      }

      if (options?.requireRole && !hasRole(options.requireRole)) {
        window.location.href = '/auth/error?error=insufficient_permissions';
        return;
      }

      if (options?.requirePermission && !checkPermission(options.requirePermission)) {
        window.location.href = '/auth/error?error=permission_denied';
        return;
      }
    }, [user, loading, hasRole, checkPermission]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return null; // Will redirect
    }

    if (options?.requireRole && !hasRole(options.requireRole)) {
      return null; // Will redirect
    }

    if (options?.requirePermission && !checkPermission(options.requirePermission)) {
      return null; // Will redirect
    }

    return <Component {...props} />;
  };
}

/**
 * Permission guard component for conditional rendering
 */
interface PermissionGuardProps {
  permission?: string;
  role?: AdminRole;
  roleLevel?: AdminRole;
  fallback?: ReactNode;
  children: ReactNode;
}

export function PermissionGuard({
  permission,
  role,
  roleLevel,
  fallback = null,
  children,
}: PermissionGuardProps) {
  const { hasPermission: checkPermission, hasRole: checkRole, hasRoleLevel: checkRoleLevel } = useAdminAuth();

  let hasAccess = true;

  if (permission && !checkPermission(permission)) {
    hasAccess = false;
  }

  if (role && !checkRole(role)) {
    hasAccess = false;
  }

  if (roleLevel && !checkRoleLevel(roleLevel)) {
    hasAccess = false;
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}