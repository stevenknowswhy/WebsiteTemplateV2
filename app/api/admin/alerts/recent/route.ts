/**
 * API Route for Recent Alerts
 * Returns recent alerts for the admin dashboard
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

    const { data, error }: { data: any[] | null; error: any } = await supabase
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
        resolved_by,
        nodes!inner(
          id,
          node_id,
          name
        )
      `)
      .eq('tenant_id', tenantId)
      .in('status', ['open', 'acknowledged'])
      .order('triggered_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching recent alerts:', error);
      return NextResponse.json(
        { error: 'Failed to fetch alerts' },
        { status: 500 }
      );
    }

    // Transform data for frontend
    const alerts = data?.map(alert => ({
      id: alert.id,
      title: alert.title,
      description: alert.message,
      severity: alert.severity,
      node: alert.nodes?.name || 'Unknown Node',
      nodeId: alert.nodes?.id,
      time: alert.triggered_at,
      status: alert.status,
      acknowledgedBy: alert.acknowledged_by,
      acknowledgedAt: alert.acknowledged_at,
      resolvedBy: alert.resolved_by,
      resolvedAt: alert.resolved_at,
    })) || [];

    // Cache for 15 seconds
    const response = NextResponse.json(alerts);
    response.headers.set('Cache-Control', 'public, max-age=15');

    return response;
  } catch (error) {
    console.error('Error fetching recent alerts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}