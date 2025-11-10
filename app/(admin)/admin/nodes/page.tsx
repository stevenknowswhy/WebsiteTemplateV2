/**
 * Admin Nodes Management Page
 * Table with filters, search, and detail view for node management
 */

import { Suspense } from 'react';
import { NodesTable } from '@/components/admin/NodesTable';
import { requireAuth } from '@/lib/auth/admin-auth';

export default async function NodesPage() {
  // Ensure user is authenticated and has required permissions
  await requireAuth('analyst');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nodes</h1>
          <p className="text-gray-600">Manage and monitor your Hello Smart Node network</p>
        </div>
      </div>

      <Suspense fallback={<div>Loading nodes...</div>}>
        <NodesTable />
      </Suspense>
    </div>
  );
}