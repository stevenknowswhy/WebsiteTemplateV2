/**
 * API Route for Nodes Export
 * GET: Export nodes data as CSV
 */

import { createClient } from '@/lib/supabase/server';
import { getCurrentAdminUser } from '@/lib/auth/admin-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await getCurrentAdminUser();

    if (!user || !user.tenantContext) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;

    // Fetch all nodes for tenant
    const { data: nodes, error } = await supabase
      .from('nodes')
      .select(`
        node_id,
        name,
        status,
        location,
        firmware_version,
        ip_address,
        last_seen,
        created_at,
        activated_at,
        last_restart_at,
        energy_generated_kwh
      `)
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .returns<any>();

    if (error) {
      console.error('Error exporting nodes:', error);
      return NextResponse.json(
        { error: 'Failed to export nodes' },
        { status: 500 }
      );
    }

    // Convert to CSV with proper typing
    const headers = [
      'Node ID',
      'Name',
      'Status',
      'Location',
      'Firmware Version',
      'IP Address',
      'Last Seen',
      'Created At',
      'Activated At',
      'Last Restart',
      'Energy Generated (kWh)'
    ];

    const csvRows = [
      headers.join(','),
      ...(nodes || []).map((node: any) => [
        node.node_id || '',
        `"${node.name || ''}"`,
        node.status || '',
        `"${node.location || ''}"`,
        node.firmware_version || '',
        node.ip_address || '',
        node.last_seen || '',
        node.created_at || '',
        node.activated_at || '',
        node.last_restart_at || '',
        node.energy_generated_kwh || 0
      ].join(','))
    ];

    const csvContent = csvRows.join('\n');

    // TODO: Re-enable audit logging when TypeScript issues are resolved
    // Log export action
    /*
    await supabase
      .from('audit_logs')
      .insert({
        tenant_id: tenantId,
        user_id: user.id,
        action: 'export_nodes',
        resource_type: 'nodes',
        details: {
          count: nodes?.length || 0,
          format: 'csv'
        },
        ip_address: 'unknown',
        user_agent: 'export-api',
        created_at: new Date().toISOString(),
      });
    */

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="nodes-export-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting nodes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}