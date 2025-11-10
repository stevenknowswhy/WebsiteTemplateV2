/**
 * API Route for System Health Metrics
 * Returns real-time system health information
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

    // Get latest telemetry data for all active nodes
    const { data: telemetryData, error: telemetryError }: { data: any[] | null; error: any } = await supabase
      .from('node_telemetry')
      .select(`
        cpu_usage_percent,
        memory_usage_percent,
        disk_usage_percent,
        network_latency_ms,
        nodes!inner(
          id,
          status
        )
      `)
      .eq('nodes.tenant_id', tenantId)
      .eq('nodes.status', 'active')
      .order('recorded_at', { ascending: false })
      .limit(100);

    if (telemetryError) {
      console.error('Error fetching telemetry data:', telemetryError);
    }

    // Calculate averages
    let cpu = 0;
    let memory = 0;
    let storage = 0;
    let network = 0;

    if (telemetryData && telemetryData.length > 0) {
      cpu = telemetryData.reduce((sum, t) => sum + (t.cpu_usage_percent || 0), 0) / telemetryData.length;
      memory = telemetryData.reduce((sum, t) => sum + (t.memory_usage_percent || 0), 0) / telemetryData.length;
      storage = telemetryData.reduce((sum, t) => sum + (t.disk_usage_percent || 0), 0) / telemetryData.length;

      // For network, use inverse of latency (lower latency = healthier network)
      const avgLatency = telemetryData.reduce((sum, t) => sum + (t.network_latency_ms || 100), 0) / telemetryData.length;
      network = Math.max(0, Math.min(100, 100 - (avgLatency - 10) * 2)); // Scale latency to health percentage
    }

    // Get database size and health (simulated for now)
    const databaseHealth = 85; // Would query actual DB metrics in production

    const systemHealth = {
      cpu: Math.round(cpu),
      memory: Math.round(memory),
      storage: Math.round(storage),
      network: Math.round(network),
      database: databaseHealth,
    };

    // Cache for 10 seconds
    const response = NextResponse.json(systemHealth);
    response.headers.set('Cache-Control', 'public, max-age=10');

    return response;
  } catch (error) {
    console.error('Error fetching system health:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}