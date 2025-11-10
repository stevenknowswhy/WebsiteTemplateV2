/**
 * API Route for Admin Telemetry Events
 * GET: Fetch telemetry events with filtering and pagination
 * POST: Record new telemetry events
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
    const limit = parseInt(searchParams.get('limit') || '50');
    const eventType = searchParams.get('eventType') || 'all';
    const resourceType = searchParams.get('resourceType') || 'all';
    const severity = searchParams.get('severity') || 'all';
    const userId = searchParams.get('userId') || '';
    const dateFrom = searchParams.get('dateFrom') || '';
    const dateTo = searchParams.get('dateTo') || '';

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Build base query
    let query = supabase
      .from('telemetry_events' as any)
      .select(`
        *,
        users!inner(email, raw_user_meta_data)
      `, { count: 'exact' })
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .returns<any>();

    // Apply filters
    if (eventType !== 'all') {
      query = (query as any).eq('event_type', eventType);
    }

    if (resourceType !== 'all') {
      query = (query as any).eq('resource_type', resourceType);
    }

    if (severity !== 'all') {
      query = (query as any).eq('severity', severity);
    }

    if (userId) {
      query = (query as any).eq('user_id', userId);
    }

    if (dateFrom) {
      query = (query as any).gte('created_at', new Date(dateFrom).toISOString());
    }

    if (dateTo) {
      query = (query as any).lte('created_at', new Date(dateTo + 'T23:59:59').toISOString());
    }

    const { data: events, error, count } = await query.range(from, to);

    if (error) {
      console.error('Error fetching telemetry events:', error);
      return NextResponse.json(
        { error: 'Failed to fetch telemetry events' },
        { status: 500 }
      );
    }

    // Transform data for frontend
    const transformedEvents = events?.map((event: any) => {
      const userData = event.users || {};
      const metaData = userData.raw_user_meta_data || {};

      return {
        id: event.id,
        eventType: event.event_type,
        resourceType: event.resource_type,
        resourceId: event.resource_id,
        severity: event.severity,
        message: event.message,
        metadata: event.metadata || {},
        duration: event.duration,
        user: {
          id: event.user_id,
          email: userData.email,
          firstName: metaData.first_name || '',
          lastName: metaData.last_name || '',
          fullName: metaData.first_name && metaData.last_name
            ? `${metaData.first_name} ${metaData.last_name}`
            : userData.email?.split('@')[0] || 'Unknown',
        },
        createdAt: event.created_at,
      };
    }) || [];

    return NextResponse.json({
      events: transformedEvents,
      total: count || 0,
      page,
      limit,
    });
  } catch (error) {
    console.error('Error in telemetry events API:', error);
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
    const { eventType, resourceType, resourceId, severity, message, metadata, duration } = body;

    // Validate required fields
    if (!eventType || !severity) {
      return NextResponse.json(
        { error: 'Event type and severity are required' },
        { status: 400 }
      );
    }

    // Validate event type
    const validEventTypes = [
      'user.login', 'user.logout', 'user.action',
      'node.online', 'node.offline', 'node.alert', 'node.action',
      'system.startup', 'system.shutdown', 'system.error',
      'api.request', 'api.response', 'api.error',
      'admin.action', 'security.event', 'performance.metric'
    ];

    if (!validEventTypes.includes(eventType)) {
      return NextResponse.json(
        { error: `Invalid event type: ${eventType}` },
        { status: 400 }
      );
    }

    // Validate severity
    const validSeverities = ['info', 'warning', 'error', 'critical'];
    if (!validSeverities.includes(severity)) {
      return NextResponse.json(
        { error: `Invalid severity: ${severity}` },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;

    // Create telemetry event
    const { data: newEvent, error: createError } = await supabase
      .from('telemetry_events' as any)
      .insert({
        tenant_id: tenantId,
        event_type: eventType,
        resource_type: resourceType || 'system',
        resource_id: resourceId || null,
        severity,
        message: message || `${eventType} event`,
        metadata: metadata || {},
        duration: duration || null,
        user_id: user.id,
        ip_address: request.headers.get('x-forwarded-for') ||
                   request.headers.get('x-real-ip') ||
                   null,
        user_agent: request.headers.get('user-agent') || null,
        created_at: new Date().toISOString(),
      } as any)
      .select('id, event_type, severity, created_at')
      .returns<any>()
      .single();

    if (createError) {
      console.error('Error creating telemetry event:', createError);
      return NextResponse.json(
        { error: 'Failed to create telemetry event' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      event: newEvent,
    }, { status: 201 });

  } catch (error) {
    console.error('Error in telemetry events API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}