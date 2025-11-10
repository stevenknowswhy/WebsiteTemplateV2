/**
 * Admin Navigation Component
 * Sidebar navigation for the admin panel with role-based menu items
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { PermissionGuard } from '@/components/admin/PermissionGuard';
import { useAdminAuth } from '@/lib/auth/admin-auth-client';
import {
  LayoutDashboard,
  Server,
  AlertTriangle,
  Users,
  Settings,
  FileText,
  Building,
  Globe,
  Shield,
  Activity,
  Key,
  Webhook,
  TestTube,
} from 'lucide-react';

const navigation = [
  {
    name: 'Overview',
    href: '/admin',
    icon: LayoutDashboard,
    permission: 'view_dashboard',
    feature: 'dashboard' as const,
  },
  {
    name: 'Nodes',
    href: '/admin/nodes',
    icon: Server,
    permission: 'view_nodes',
    feature: 'node_list' as const,
  },
  {
    name: 'Alerts',
    href: '/admin/alerts',
    icon: AlertTriangle,
    permission: 'view_alerts',
    feature: 'alert_list' as const,
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: Users,
    permission: 'manage_users',
    feature: 'user_list' as const,
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: Activity,
    permission: 'view_analytics',
    feature: 'analytics' as const,
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    permission: 'manage_settings',
    feature: 'settings_general' as const,
  },
  {
    name: 'Audit Log',
    href: '/admin/audit',
    icon: FileText,
    permission: 'view_audit_log',
    feature: 'audit_log' as const,
  },
];

const adminNavigation = [
  {
    name: 'Tenant Management',
    href: '/admin/tenants',
    icon: Building,
    permission: 'manage_tenants',
    feature: 'tenant_management' as const,
  },
  {
    name: 'API Tokens',
    href: '/admin/tokens',
    icon: Key,
    permission: 'manage_api_tokens',
    feature: 'settings_api_tokens' as const,
  },
  {
    name: 'Webhooks',
    href: '/admin/webhooks',
    icon: Webhook,
    permission: 'manage_webhooks',
    feature: 'settings_webhooks' as const,
  },
  {
    name: 'System',
    href: '/admin/system',
    icon: Shield,
    permission: 'system_maintenance',
    feature: 'system_maintenance' as const,
  },
];

const toolsNavigation = [
  {
    name: 'Webhook Test',
    href: '/admin/tools/webhooks',
    icon: TestTube,
    permission: 'manage_webhooks',
    feature: 'settings_webhooks' as const,
  },
];

export function AdminNav() {
  const pathname = usePathname();
  const { user, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6">
        <Link href="/admin" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-xs text-gray-500">
              {user?.tenantContext?.tenant_name || 'Loading...'}
            </p>
          </div>
        </Link>
      </div>

      <nav className="px-4 pb-4" aria-label="Admin navigation menu">
        <div className="space-y-1">
          {/* Main Navigation */}
          <div className="mb-6">
            <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" role="heading" aria-level={2}>
              Main
            </div>
            {navigation.map((item) => (
              <PermissionGuard
                key={item.name}
                permission={item.permission}
                feature={item.feature}
                fallback={null}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    pathname === item.href
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      pathname === item.href
                        ? 'text-blue-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                    )}
                  />
                  {item.name}
                </Link>
              </PermissionGuard>
            ))}
          </div>

          {/* Admin Navigation (for privileged users) */}
          {(user?.tenantContext?.role === 'superadmin' ||
            user?.tenantContext?.role === 'city_admin') && (
            <div>
              <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" role="heading" aria-level={2}>
                Administration
              </div>
              {adminNavigation.map((item) => (
                <PermissionGuard
                  key={item.name}
                  permission={item.permission}
                  feature={item.feature}
                  fallback={null}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      pathname === item.href
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <item.icon
                      className={cn(
                        'mr-3 h-5 w-5 flex-shrink-0',
                        pathname === item.href
                          ? 'text-blue-500'
                          : 'text-gray-400 group-hover:text-gray-500'
                      )}
                    />
                    {item.name}
                  </Link>
                </PermissionGuard>
              ))}
            </div>
          )}

          {/* Tools Navigation */}
          {(user?.tenantContext?.role === 'superadmin' ||
            user?.tenantContext?.role === 'city_admin') && (
            <div>
              <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" role="heading" aria-level={2}>
                Tools
              </div>
              {toolsNavigation.map((item) => (
                <PermissionGuard
                  key={item.name}
                  permission={item.permission}
                  feature={item.feature}
                  fallback={null}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      pathname === item.href
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <item.icon
                      className={cn(
                        'mr-3 h-5 w-5 flex-shrink-0',
                        pathname === item.href
                          ? 'text-blue-500'
                          : 'text-gray-400 group-hover:text-gray-500'
                      )}
                    />
                    {item.name}
                  </Link>
                </PermissionGuard>
              ))}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="px-3 py-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.tenantContext?.role?.replace('_', ' ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}