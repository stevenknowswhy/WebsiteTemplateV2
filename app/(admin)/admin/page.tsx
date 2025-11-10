/**
 * Admin Overview Dashboard
 * Main admin dashboard with KPIs, recent alerts, and quick actions
 */

import { requireAuth } from '@/lib/auth/admin-auth';
import { AdminOverview } from '@/components/admin/AdminOverview';

export default async function AdminPage() {
  // Ensure user is authenticated and has admin access
  await requireAuth('analyst');

  return <AdminOverview />;
}