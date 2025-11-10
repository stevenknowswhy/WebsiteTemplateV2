/**
 * API Route for Webhooks Management
 * GET: List tenant webhooks
 * POST: Create new webhook
 */

import { createClient } from '@/lib/supabase/server';
import { getCurrentAdminUser } from '@/lib/auth/admin-auth';
import { NextRequest, NextResponse } from 'next/server';
import { createHash, randomBytes } from 'crypto';

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

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Build query with filters
    let query = supabase
      .from('webhooks' as any)
      .select('*', { count: 'exact' })
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .returns<any>();

    // Apply status filter
    if (status !== 'all') {
      const isActive = status === 'active';
      const { data: webhooks, error, count } = await supabase
        .from('webhooks' as any)
        .select('*', { count: 'exact' })
        .eq('tenant_id', tenantId)
        .eq('is_active', isActive)
        .order('created_at', { ascending: false })
        .range(from, to)
        .returns<any>();

      if (error) {
        console.error('Error fetching webhooks:', error);
        return NextResponse.json(
          { error: 'Failed to fetch webhooks' },
          { status: 500 }
        );
      }

      // Transform data for frontend (mask sensitive fields)
      const transformedWebhooks = webhooks?.map((webhook: any) => ({
        id: webhook.id,
        name: webhook.name,
        url: webhook.url,
        eventTypes: webhook.event_types || [],
        retryAttempts: webhook.retry_attempts,
        timeoutSeconds: webhook.timeout_seconds,
        lastTriggeredAt: webhook.last_triggered_at,
        isActive: webhook.is_active,
        createdBy: webhook.created_by,
        createdAt: webhook.created_at,
        updatedAt: webhook.updated_at,
        // Mask the secret - show only that it exists
        hasSecret: !!webhook.secret_hash,
      })) || [];

      return NextResponse.json({
        webhooks: transformedWebhooks,
        total: count || 0,
        page,
        limit,
      });
    }

    const { data: webhooks, error, count } = await query.range(from, to);

    if (error) {
      console.error('Error fetching webhooks:', error);
      return NextResponse.json(
        { error: 'Failed to fetch webhooks' },
        { status: 500 }
      );
    }

    // Transform data for frontend (mask sensitive fields)
    const transformedWebhooks = webhooks?.map((webhook: any) => ({
      id: webhook.id,
      name: webhook.name,
      url: webhook.url,
      eventTypes: webhook.event_types || [],
      retryAttempts: webhook.retry_attempts,
      timeoutSeconds: webhook.timeout_seconds,
      lastTriggeredAt: webhook.last_triggered_at,
      isActive: webhook.is_active,
      createdBy: webhook.created_by,
      createdAt: webhook.created_at,
      updatedAt: webhook.updated_at,
      // Mask the secret - show only that it exists
      hasSecret: !!webhook.secret_hash,
    })) || [];

    return NextResponse.json({
      webhooks: transformedWebhooks,
      total: count || 0,
      page,
      limit,
    });
  } catch (error) {
    console.error('Error in webhooks management:', error);
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
    const { name, url, secret, eventTypes, retryAttempts, timeoutSeconds } = body;

    // Validate required fields
    if (!name || !url || !secret) {
      return NextResponse.json(
        { error: 'Name, URL, and secret are required' },
        { status: 400 }
      );
    }

    // Validate event types
    const validEventTypes = [
      'node.alert', 'node.offline', 'node.online', 'user.invited',
      'alert.acknowledged', 'alert.resolved', 'system.maintenance'
    ];

    for (const eventType of eventTypes) {
      if (!validEventTypes.includes(eventType)) {
        return NextResponse.json(
          { error: `Invalid event type: ${eventType}` },
          { status: 400 }
        );
      }
    }

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;

    // Hash the webhook secret
    const secretHash = createHash('sha256').update(secret).digest('hex');

    // Create webhook
    const { data: newWebhook, error: createError } = await supabase
      .from('webhooks' as any)
      .insert({
        tenant_id: tenantId,
        name,
        url,
        secret_hash: secretHash,
        event_types: eventTypes,
        retry_attempts: retryAttempts || 3,
        timeout_seconds: timeoutSeconds || 30,
        is_active: true,
        created_by: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as any)
      .select('id, name, url, created_at')
      .returns<any>()
      .single();

    if (createError) {
      console.error('Error creating webhook:', createError);
      return NextResponse.json(
        { error: 'Failed to create webhook' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook created successfully',
      webhook: {
        id: (newWebhook as any).id,
        name: (newWebhook as any).name,
        url: (newWebhook as any).url,
        createdAt: (newWebhook as any).created_at,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Error in webhook creation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}