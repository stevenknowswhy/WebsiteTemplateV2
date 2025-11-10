/**
 * API Route for Audit Log Management
 * GET: List audit logs with pagination, filtering, and search
 * POST: Export audit logs to CSV
 */

import { createClient } from '@/lib/supabase/server';
import { getCurrentAdminUser } from '@/lib/auth/admin-auth';
import { NextRequest, NextResponse } from 'next/server';
import { format } from 'date-fns';

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
    const search = searchParams.get('search') || '';
    const action = searchParams.get('action') || 'all';
    const resourceType = searchParams.get('resourceType') || 'all';
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
      .from('audit_logs' as any)
      .select(`
        *,
        users!inner(email, raw_user_meta_data)
      `, { count: 'exact' })
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .returns<any>();

    // Apply filters
    if (search) {
      query = (query as any).or(`
        action.ilike.%${search}%,
        resource_type.ilike.%${search}%,
        resource_id.ilike.%${search}%,
        details.ilike.%${search}%,
        users.email.ilike.%${search}%
      `);
    }

    if (action !== 'all') {
      query = (query as any).eq('action', action);
    }

    if (resourceType !== 'all') {
      query = (query as any).eq('resource_type', resourceType);
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

    const { data: auditLogs, error, count } = await query.range(from, to);

    if (error) {
      console.error('Error fetching audit logs:', error);
      return NextResponse.json(
        { error: 'Failed to fetch audit logs' },
        { status: 500 }
      );
    }

    // Transform data for frontend
    const transformedLogs = auditLogs?.map((log: any) => {
      const userData = log.users || {};
      const metaData = userData.raw_user_meta_data || {};

      return {
        id: log.id,
        action: log.action,
        resourceType: log.resource_type,
        resourceId: log.resource_id,
        details: log.details || {},
        ipAddress: log.ip_address,
        userAgent: log.user_agent,
        user: {
          id: log.user_id,
          email: userData.email,
          firstName: metaData.first_name || '',
          lastName: metaData.last_name || '',
          fullName: metaData.first_name && metaData.last_name
            ? `${metaData.first_name} ${metaData.last_name}`
            : userData.email?.split('@')[0] || 'Unknown',
        },
        createdAt: log.created_at,
      };
    }) || [];

    return NextResponse.json({
      logs: transformedLogs,
      total: count || 0,
      page,
      limit,
    });
  } catch (error) {
    console.error('Error in audit logs API:', error);
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
    const { format: exportFormat, filters } = body;

    if (exportFormat !== 'csv') {
      return NextResponse.json(
        { error: 'Only CSV export is supported' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;

    // Build query for export (no pagination)
    let query = supabase
      .from('audit_logs' as any)
      .select(`
        *,
        users!inner(email, raw_user_meta_data)
      `)
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .returns<any>();

    // Apply filters
    if (filters?.search) {
      query = (query as any).or(`
        action.ilike.%${filters.search}%,
        resource_type.ilike.%${filters.search}%,
        resource_id.ilike.%${filters.search}%,
        details.ilike.%${filters.search}%,
        users.email.ilike.%${filters.search}%
      `);
    }

    if (filters?.action && filters.action !== 'all') {
      query = (query as any).eq('action', filters.action);
    }

    if (filters?.resourceType && filters.resourceType !== 'all') {
      query = (query as any).eq('resource_type', filters.resourceType);
    }

    if (filters?.userId) {
      query = (query as any).eq('user_id', filters.userId);
    }

    if (filters?.dateFrom) {
      query = (query as any).gte('created_at', new Date(filters.dateFrom).toISOString());
    }

    if (filters?.dateTo) {
      query = (query as any).lte('created_at', new Date(filters.dateTo + 'T23:59:59').toISOString());
    }

    // Limit export to 10,000 records for performance
    query = (query as any).limit(10000);

    const { data: auditLogs, error } = await query;

    if (error) {
      console.error('Error fetching audit logs for export:', error);
      return NextResponse.json(
        { error: 'Failed to fetch audit logs for export' },
        { status: 500 }
      );
    }

    // Transform data and generate CSV
    const csvData = auditLogs?.map((log: any) => {
      const userData = log.users || {};
      const metaData = userData.raw_user_meta_data || {};

      return {
        'Timestamp': format(new Date(log.created_at), 'yyyy-MM-dd HH:mm:ss'),
        'User Email': userData.email || '',
        'User Name': metaData.first_name && metaData.last_name
          ? `${metaData.first_name} ${metaData.last_name}`
          : userData.email?.split('@')[0] || 'Unknown',
        'Action': log.action,
        'Resource Type': log.resource_type,
        'Resource ID': log.resource_id || '',
        'Details': JSON.stringify(log.details || {}),
        'IP Address': log.ip_address || '',
        'User Agent': log.user_agent || '',
      };
    }) || [];

    // Generate CSV content
    if (csvData.length === 0) {
      return NextResponse.json(
        { error: 'No audit logs found matching the filters' },
        { status: 404 }
      );
    }

    const headers = Object.keys(csvData[0]);
    const csvContent = [
      headers.join(','),
      ...csvData.map((row: any) =>
        headers.map(header => {
          const value = row[header as keyof typeof row] || '';
          // Escape CSV values that contain commas, quotes, or newlines
          if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    // Create filename with timestamp
    const filename = `audit-logs-${format(new Date(), 'yyyy-MM-dd-HHmmss')}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error in audit logs export API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}