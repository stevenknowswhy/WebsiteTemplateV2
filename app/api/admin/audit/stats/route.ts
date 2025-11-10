/**
 * API Route for Audit Log Statistics
 * GET: Get audit log statistics and filter options
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

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;

    // Get unique actions for filter dropdown
    const { data: actions, error: actionsError } = await supabase
      .from('audit_logs' as any)
      .select('action')
      .eq('tenant_id', tenantId)
      .not('action', 'is', null)
      .returns<any>();

    // Get unique resource types for filter dropdown
    const { data: resourceTypes, error: resourceTypesError } = await supabase
      .from('audit_logs' as any)
      .select('resource_type')
      .eq('tenant_id', tenantId)
      .not('resource_type', 'is', null)
      .returns<any>();

    // Get user statistics (simplified - just get recent logs and count them in code)
    const { data: userLogs, error: userStatsError } = await supabase
      .from('audit_logs' as any)
      .select(`
        user_id,
        users!inner(email, raw_user_meta_data)
      `)
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .limit(1000)
      .returns<any>();

    // Process user statistics manually
    const userStatsMap = new Map();
    userLogs?.forEach((log: any) => {
      const userData = log.users || {};
      const metaData = userData.raw_user_meta_data || {};
      const email = userData.email || '';
      const fullName = metaData.first_name && metaData.last_name
        ? `${metaData.first_name} ${metaData.last_name}`
        : email?.split('@')[0] || 'Unknown';

      const key = log.user_id;
      if (userStatsMap.has(key)) {
        userStatsMap.get(key).count++;
      } else {
        userStatsMap.set(key, {
          userId: key,
          email,
          fullName,
          count: 1,
        });
      }
    });

    const userStats = Array.from(userStatsMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Get action statistics (last 30 days) - simplified
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: actionLogs, error: actionStatsError } = await supabase
      .from('audit_logs' as any)
      .select('action')
      .eq('tenant_id', tenantId)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(1000)
      .returns<any>();

    // Process action statistics manually
    const actionStatsMap = new Map();
    actionLogs?.forEach((log: any) => {
      const action = log.action;
      if (actionStatsMap.has(action)) {
        actionStatsMap.set(action, { action, count: actionStatsMap.get(action).count + 1 });
      } else {
        actionStatsMap.set(action, { action, count: 1 });
      }
    });

    const actionStats = Array.from(actionStatsMap.values())
      .sort((a, b) => b.count - a.count);

    // Get daily activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: dailyActivity, error: dailyActivityError } = await supabase
      .from('audit_logs' as any)
      .select('created_at')
      .eq('tenant_id', tenantId)
      .gte('created_at', sevenDaysAgo.toISOString())
      .order('created_at', { ascending: true })
      .returns<any>();

    // Get total counts
    const { count: totalCount, error: totalError } = await supabase
      .from('audit_logs' as any)
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .returns<any>();

    const { count: todayCount, error: todayError } = await supabase
      .from('audit_logs' as any)
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .gte('created_at', new Date().toISOString().split('T')[0])
      .returns<any>();

    if (actionsError || resourceTypesError || userStatsError ||
        actionStatsError || dailyActivityError || totalError || todayError) {
      console.error('Error fetching audit log statistics:', {
        actionsError,
        resourceTypesError,
        userStatsError,
        actionStatsError,
        dailyActivityError,
        totalError,
        todayError,
      });
      return NextResponse.json(
        { error: 'Failed to fetch audit log statistics' },
        { status: 500 }
      );
    }

    // Process unique actions
    const uniqueActions = [...new Set(actions?.map((item: any) => item.action) || [])].sort();

    // Process unique resource types
    const uniqueResourceTypes = [...new Set(resourceTypes?.map((item: any) => item.resource_type) || [])].sort();

    // User statistics are already processed above
    const processedUserStats = userStats || [];

    // Process daily activity into grouped data
    const dailyActivityMap = new Map<string, number>();
    dailyActivity?.forEach((log: any) => {
      const date = log.created_at.split('T')[0];
      dailyActivityMap.set(date, (dailyActivityMap.get(date) || 0) + 1);
    });

    // Fill missing days with zero activity
    const dailyActivityData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dailyActivityData.push({
        date: dateStr,
        count: dailyActivityMap.get(dateStr) || 0,
      });
    }

    return NextResponse.json({
      filters: {
        actions: uniqueActions,
        resourceTypes: uniqueResourceTypes,
        topUsers: processedUserStats,
      },
      statistics: {
        totalLogs: totalCount || 0,
        todayLogs: todayCount || 0,
        actionDistribution: actionStats || [],
        dailyActivity: dailyActivityData,
      },
    });
  } catch (error) {
    console.error('Error in audit log statistics API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}