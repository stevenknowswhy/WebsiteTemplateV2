/**
 * Admin Panel Layout
 * Main layout for all admin routes with navigation and context
 */

import { AdminAuthProvider } from '@/lib/auth/admin-auth-client';
import { AdminNav } from '@/components/admin/AdminNav';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* Admin Navigation Sidebar */}
          <AdminNav />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Admin Header */}
            <AdminHeader />

            {/* Page Content */}
            <div id="admin-main-content" className="flex-1 p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </AdminAuthProvider>
  );
}