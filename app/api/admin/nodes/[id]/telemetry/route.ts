/**
 * API Route for Node Telemetry Data
 * GET: Fetch latest telemetry data for a specific node
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
      .returns<any>()
      .single();

    if (nodeError || !node) {
      return NextResponse.json(
        { error: 'Node not found' },
        { status: 404 }
      );
    }

    // Fetch latest telemetry data
    const { data: telemetry, error: telemetryError } = await supabase
      .from('node_telemetry')
      .select('*')
      .eq('node_id', nodeId)
      .order('recorded_at', { ascending: false })
      .limit(1)
      .returns<any>()
      .single();

    if (telemetryError && telemetryError.code !== 'PGRST116') {
      console.error('Error fetching telemetry:', telemetryError);
      return NextResponse.json(
        { error: 'Failed to fetch telemetry data' },
        { status: 500 }
      );
    }

    // If no telemetry data, return default values with proper typing
    const telemetryData = telemetry || {
      id: '',
      node_id: nodeId,
      cpu_usage_percent: 0,
      memory_usage_percent: 0,
      disk_usage_percent: 0,
      network_latency_ms: 0,
      temperature_celsius: null,
      signal_strength: null,
      network_status: false,
      battery_level: null,
      recorded_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    return NextResponse.json(telemetryData);
  } catch (error) {
    console.error('Error fetching node telemetry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}