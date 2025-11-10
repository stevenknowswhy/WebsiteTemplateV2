/**
 * API Route for Admin Nodes Management
 * GET: List nodes with pagination and filtering
 * POST: Create new node (if permitted)
 */

import { createClient } from '@/lib/supabase/server';
import { getCurrentAdminUser } from '@/lib/auth/admin-auth';
import { NextRequest, NextResponse } from 'next/server';
import type { Database } from '@/types/database';

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
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';
    const location = searchParams.get('location') || 'all';

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Build query with filters
    let query = supabase
      .from('nodes')
      .select(`
        *,
        node_alerts!inner(count)
      `, { count: 'exact' })
      .eq('tenant_id', tenantId);

    // Apply filters
    if (search) {
      query = query.or(`name.ilike.%${search}%,node_id.ilike.%${search}%,location.ilike.%${search}%`);
    }

    if (status !== 'all') {
      query = query.eq('status', status);
    }

    if (location !== 'all') {
      query = query.eq('location', location);
    }

    const { data: nodes, error, count } = await query
      .range(from, to)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching nodes:', error);
      return NextResponse.json(
        { error: 'Failed to fetch nodes' },
        { status: 500 }
      );
    }

    // Transform data for frontend with proper typing
    const transformedNodes = nodes?.map((node: any) => ({
      ...node,
      alerts_count: node.node_alerts?.length || 0,
    })) || [];

    return NextResponse.json({
      nodes: transformedNodes,
      total: count || 0,
      page,
      limit,
    });
  } catch (error) {
    console.error('Error in nodes API:', error);
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
    const { name, location, firmware_version } = body;

    // Validate required fields
    if (!name || !location) {
      return NextResponse.json(
        { error: 'Name and location are required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;

    // Generate unique node ID
    const nodeId = `node-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    const { data: node, error } = await supabase
      .from('nodes')
      .insert({
        node_id: nodeId,
        name,
        location,
        firmware_version: firmware_version || '1.0.0',
        status: 'inactive',
        tenant_id: tenantId,
        created_at: new Date().toISOString(),
      } as any)
      .select()
      .single();

    if (error) {
      console.error('Error creating node:', error);
      return NextResponse.json(
        { error: 'Failed to create node' },
        { status: 500 }
      );
    }

    return NextResponse.json(node, { status: 201 });
  } catch (error) {
    console.error('Error in node creation API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}