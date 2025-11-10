/**
 * API Route for Admin Telemetry Alerts
 * GET: Fetch telemetry alerts and anomalies
 * POST: Create or manage telemetry alerts
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
    const alertType = searchParams.get('alertType') || 'all';
    const severity = searchParams.get('severity') || 'all';
    const status = searchParams.get('status') || 'active';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Build base query
    let query = supabase
      .from('telemetry_alerts' as any)
      .select(`
        *,
        users!inner(email, raw_user_meta_data)
      `, { count: 'exact' })
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .returns<any>();

    // Apply filters
    if (alertType !== 'all') {
      query = (query as any).eq('alert_type', alertType);
    }

    if (severity !== 'all') {
      query = (query as any).eq('severity', severity);
    }

    if (status !== 'all') {
      query = (query as any).eq('status', status);
    }

    const { data: alerts, error, count } = await query.range(from, to);

    if (error) {
      console.error('Error fetching telemetry alerts:', error);
      return NextResponse.json(
        { error: 'Failed to fetch telemetry alerts' },
        { status: 500 }
      );
    }

    // Transform data for frontend
    const transformedAlerts = alerts?.map((alert: any) => {
      const userData = alert.users || {};
      const metaData = userData.raw_user_meta_data || {};

      return {
        id: alert.id,
        alertType: alert.alert_type,
        severity: alert.severity,
        title: alert.title,
        description: alert.description,
        source: alert.source,
        metadata: alert.metadata || {},
        status: alert.status,
        acknowledgedBy: alert.acknowledged_by,
        acknowledgedAt: alert.acknowledged_at,
        resolvedBy: alert.resolved_by,
        resolvedAt: alert.resolved_at,
        user: {
          id: alert.user_id,
          email: userData.email,
          firstName: metaData.first_name || '',
          lastName: metaData.last_name || '',
          fullName: metaData.first_name && metaData.last_name
            ? `${metaData.first_name} ${metaData.last_name}`
            : userData.email?.split('@')[0] || 'Unknown',
        },
        createdAt: alert.created_at,
        updatedAt: alert.updated_at,
      };
    }) || [];

    // Get alert statistics
    const [
      { count: totalAlerts },
      { count: activeAlerts },
      { count: criticalAlerts },
      { count: acknowledgedAlerts },
    ] = await Promise.all([
      supabase
        .from('telemetry_alerts' as any)
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', tenantId)
        .returns<any>(),
      supabase
        .from('telemetry_alerts' as any)
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', tenantId)
        .eq('status', 'active')
        .returns<any>(),
      supabase
        .from('telemetry_alerts' as any)
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', tenantId)
        .eq('severity', 'critical')
        .eq('status', 'active')
        .returns<any>(),
      supabase
        .from('telemetry_alerts' as any)
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', tenantId)
        .eq('status', 'acknowledged')
        .returns<any>(),
    ]);

    return NextResponse.json({
      alerts: transformedAlerts,
      statistics: {
        totalAlerts: totalAlerts || 0,
        activeAlerts: activeAlerts || 0,
        criticalAlerts: criticalAlerts || 0,
        acknowledgedAlerts: acknowledgedAlerts || 0,
      },
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Error in telemetry alerts API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentAdminUser();

    if (!user || !user.tenantContext) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { alertType, severity, title, description, source, metadata } = body;

    // Validate required fields
    if (!alertType || !severity || !title) {
      return NextResponse.json(
        { error: 'Alert type, severity, and title are required' },
        { status: 400 }
      );
    }

    // Validate alert type
    const validAlertTypes = [
      'anomaly',
      'threshold',
      'error_spike',
      'performance_degradation',
      'security_breach',
      'system_health',
      'resource_exhaustion',
      'data_quality',
    ];

    if (!validAlertTypes.includes(alertType)) {
      return NextResponse.json(
        { error: `Invalid alert type: ${alertType}` },
        { status: 400 }
      );
    }

    // Validate severity
    const validSeverities = ['low', 'medium', 'high', 'critical'];
    if (!validSeverities.includes(severity)) {
      return NextResponse.json(
        { error: `Invalid severity: ${severity}` },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;

    // Create telemetry alert
    const { data: newAlert, error: createError } = await supabase
      .from('telemetry_alerts' as any)
      .insert({
        tenant_id: tenantId,
        alert_type: alertType,
        severity,
        title,
        description: description || '',
        source: source || 'system',
        metadata: metadata || {},
        status: 'active',
        user_id: user.id,
        ip_address: request.headers.get('x-forwarded-for') ||
                   request.headers.get('x-real-ip') ||
                   null,
        user_agent: request.headers.get('user-agent') || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as any)
      .select('id, alert_type, severity, title, status, created_at')
      .returns<any>()
      .single();

    if (createError) {
      console.error('Error creating telemetry alert:', createError);
      return NextResponse.json(
        { error: 'Failed to create telemetry alert' },
        { status: 500 }
      );
    }

    // Create corresponding telemetry event
    await supabase
      .from('telemetry_events' as any)
      .insert({
        tenant_id: tenantId,
        event_type: 'telemetry.alert_created',
        resource_type: 'telemetry_alert',
        resource_id: (newAlert as any).id,
        severity: severity === 'critical' ? 'critical' : 'warning',
        message: `Telemetry alert created: ${title}`,
        metadata: {
          alertId: (newAlert as any).id,
          alertType,
          source,
        },
        user_id: user.id,
        ip_address: request.headers.get('x-forwarded-for') ||
                   request.headers.get('x-real-ip') ||
                   null,
        user_agent: request.headers.get('user-agent') || null,
        created_at: new Date().toISOString(),
      } as any)
      .returns<any>();

    return NextResponse.json({
      success: true,
      alert: newAlert,
    }, { status: 201 });

  } catch (error) {
    console.error('Error in telemetry alerts API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}