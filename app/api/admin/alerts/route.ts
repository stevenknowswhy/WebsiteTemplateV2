/**
 * API Route for Alerts Management
 * GET: List all alerts with pagination and filtering
 * POST: Create new alert (if permitted)
 */

import { createClient } from '@/lib/supabase/server';
import { getCurrentAdminUser } from '@/lib/auth/admin-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentAdminUser();

    if (!user || !user.tenantContext) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status') || 'all';
    const severity = searchParams.get('severity') || 'all';
    const search = searchParams.get('search') || '';

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Build query with filters
    let query = supabase
      .from('node_alerts' as any)
      .select(`
        *,
        nodes!inner(
          id,
          node_id,
          name,
          location
        )
      `, { count: 'exact' })
      .eq('tenant_id', tenantId);

    // Apply filters
    if (status !== 'all') {
      query = query.eq('status', status);
    }

    if (severity !== 'all') {
      query = query.eq('severity', severity);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,message.ilike.%${search}%,nodes.name.ilike.%${search}%`);
    }

    const { data: alerts, error, count } = await query
      .range(from, to)
      .order('triggered_at', { ascending: false })
      .returns<any>();

    if (error) {
      console.error('Error fetching alerts:', error);
      return NextResponse.json(
        { error: 'Failed to fetch alerts' },
        { status: 500 }
      );
    }

    // Transform data for frontend
    const transformedAlerts = alerts?.map((alert: any) => ({
      id: alert.id,
      title: alert.title,
      description: alert.message,
      severity: alert.severity,
      node: alert.nodes?.name || 'Unknown Node',
      nodeId: alert.nodes?.id,
      nodeIdentifier: alert.nodes?.node_id,
      location: alert.nodes?.location,
      time: alert.triggered_at,
      status: alert.status,
      acknowledgedBy: alert.acknowledged_by,
      acknowledgedAt: alert.acknowledged_at,
      resolvedBy: alert.resolved_by,
      resolvedAt: alert.resolved_at,
      createdAt: alert.created_at,
      updatedAt: alert.updated_at,
    })) || [];

    return NextResponse.json({
      alerts: transformedAlerts,
      total: count || 0,
      page,
      limit,
    });
  } catch (error) {
    console.error('Error in alerts API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}