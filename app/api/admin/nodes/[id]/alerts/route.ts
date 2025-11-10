/**
 * API Route for Node Alerts
 * GET: Fetch recent alerts for a specific node
 */

import { createClient } from '@/lib/supabase/server';
import { getCurrentAdminUser } from '@/lib/auth/admin-auth';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const { id: nodeId } = await params;

    // Verify node belongs to tenant
    const { data: node, error: nodeError } = await supabase
      .from('nodes')
      .select('id, node_id, name')
      .eq('id', nodeId)
      .eq('tenant_id', tenantId)
      .single();

    if (nodeError || !node) {
      return NextResponse.json(
        { error: 'Node not found' },
        { status: 404 }
      );
    }

    // Fetch recent alerts for this node
    const { data: alerts, error: alertsError } = await supabase
      .from('node_alerts')
      .select(`
        id,
        title,
        message,
        severity,
        status,
        triggered_at,
        acknowledged_at,
        acknowledged_by,
        resolved_at,
        resolved_by
      `)
      .eq('node_id', nodeId)
      .order('triggered_at', { ascending: false })
      .limit(20);

    if (alertsError) {
      console.error('Error fetching node alerts:', alertsError);
      return NextResponse.json(
        { error: 'Failed to fetch alerts' },
        { status: 500 }
      );
    }

    return NextResponse.json(alerts || []);
  } catch (error) {
    console.error('Error fetching node alerts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}