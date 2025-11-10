/**
 * API Route for Admin KPI Data
 * Returns key performance indicators for the admin dashboard
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

    // Get node statistics
    const { data: nodeStats, error: nodeError }: { data: any[] | null; error: any } = await supabase
      .from('nodes')
      .select('status')
      .eq('tenant_id', tenantId);

    if (nodeError) {
      console.error('Error fetching node stats:', nodeError);
    }

    // Get alert statistics
    const { data: alertStats, error: alertError }: { data: any[] | null; error: any } = await supabase
      .from('node_alerts')
      .select('severity, status')
      .eq('tenant_id', tenantId);

    if (alertError) {
      console.error('Error fetching alert stats:', alertError);
    }

    // Get user count
    const { data: userCount, error: userError }: { data: any[] | null; error: any } = await supabase
      .from('tenant_users')
      .select('id')
      .eq('tenant_id', tenantId)
      .eq('status', 'active');

    if (userError) {
      console.error('Error fetching user count:', userError);
    }

    // Calculate uptime from recent telemetry data
    // First get node IDs
    const { data: nodeIds, error: nodeIdsError }: { data: any[] | null; error: any } = await supabase
      .from('nodes')
      .select('id')
      .eq('tenant_id', tenantId);

    let telemetryData: any[] | null = null;
    let telemetryError: any = null;

    if (nodeIds && nodeIds.length > 0) {
      const nodeIdList = nodeIds.map(n => n.id);
      const { data: telemetry, error: telemetryErr } = await supabase
        .from('node_telemetry')
        .select('network_status')
        .in('node_id', nodeIdList)
        .gte('recorded_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // Last 30 days
        .order('recorded_at', { ascending: false })
        .limit(1000);

      telemetryData = telemetry;
      telemetryError = telemetryErr;
    }

    if (telemetryError) {
      console.error('Error fetching telemetry data:', telemetryError);
    }

    // Get impact metrics (energy and CO2)
    let impactData: any[] | null = null;
    let impactError: any = null;

    if (nodeIds && nodeIds.length > 0) {
      const nodeIdList = nodeIds.map(n => n.id);
      const { data: impact, error: impactErr } = await supabase
        .from('impact_metrics')
        .select('energy_generated_kwh, co2_saved_kg')
        .gte('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]) // Last 30 days
        .in('node_id', nodeIdList);

      impactData = impact;
      impactError = impactErr;
    }

    if (impactError) {
      console.error('Error fetching impact data:', impactError);
    }

    // Calculate KPIs
    const totalNodes = nodeStats?.length || 0;
    const activeNodes = nodeStats?.filter(n => n.status === 'active').length || 0;
    const totalAlerts = alertStats?.length || 0;
    const criticalAlerts = alertStats?.filter(a => a.severity === 'critical' && a.status === 'open').length || 0;
    const totalUsers = userCount?.length || 0;

    // Calculate network uptime
    let networkUptime = 95; // Default fallback
    if (telemetryData && telemetryData.length > 0) {
      const onlineCount = telemetryData.filter(t => t.network_status).length;
      networkUptime = (onlineCount / telemetryData.length) * 100;
    }

    // Calculate energy and CO2 metrics
    let energyGenerated = 0;
    let co2Saved = 0;
    if (impactData) {
      energyGenerated = impactData.reduce((sum, item) => sum + (item.energy_generated_kwh || 0), 0);
      co2Saved = impactData.reduce((sum, item) => sum + (item.co2_saved_kg || 0), 0);
    }

    const kpiData = {
      totalNodes,
      activeNodes,
      totalAlerts,
      criticalAlerts,
      totalUsers,
      networkUptime: Math.round(networkUptime * 100) / 100,
      energyGenerated: Math.round(energyGenerated * 10) / 10,
      co2Saved: Math.round(co2Saved * 10) / 10,
    };

    // Cache for 30 seconds
    const response = NextResponse.json(kpiData);
    response.headers.set('Cache-Control', 'public, max-age=30');

    return response;
  } catch (error) {
    console.error('Error fetching KPI data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}