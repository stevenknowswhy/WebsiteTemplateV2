/**
 * API Route for Admin Telemetry Dashboard
 * GET: Fetch dashboard-specific metrics and visualizations
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
    const dashboardType = searchParams.get('dashboardType') || 'overview';

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;

    // Calculate date ranges for different time periods
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    let dashboardData: any = {};

    switch (dashboardType) {
      case 'overview':
        dashboardData = await getOverviewDashboard(supabase, tenantId, now, last24Hours, last7Days, last30Days);
        break;
      case 'performance':
        dashboardData = await getPerformanceDashboard(supabase, tenantId, last7Days);
        break;
      case 'security':
        dashboardData = await getSecurityDashboard(supabase, tenantId, last7Days);
        break;
      case 'usage':
        dashboardData = await getUsageDashboard(supabase, tenantId, last30Days);
        break;
      default:
        dashboardData = await getOverviewDashboard(supabase, tenantId, now, last24Hours, last7Days, last30Days);
    }

    return NextResponse.json({
      dashboardType,
      generatedAt: now.toISOString(),
      data: dashboardData,
    });
  } catch (error) {
    console.error('Error in telemetry dashboard API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function getOverviewDashboard(
  supabase: any,
  tenantId: string,
  now: Date,
  last24Hours: Date,
  last7Days: Date,
  last30Days: Date
) {
  // Get telemetry events for different time periods
  const [
    events24hResult,
    events7dResult,
    events30dResult,
    recentEventsResult,
    nodesStatusResult,
    alertsCountResult,
  ] = await Promise.all([
    supabase
      .from('telemetry_events' as any)
      .select('*')
      .eq('tenant_id', tenantId)
      .gte('created_at', last24Hours.toISOString())
      ,
    supabase
      .from('telemetry_events' as any)
      .select('*')
      .eq('tenant_id', tenantId)
      .gte('created_at', last7Days.toISOString())
      ,
    supabase
      .from('telemetry_events' as any)
      .select('*')
      .eq('tenant_id', tenantId)
      .gte('created_at', last30Days.toISOString())
      ,
    supabase
      .from('telemetry_events' as any)
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .limit(10)
      ,
    supabase
      .from('nodes' as any)
      .select('status, last_seen_at')
      .eq('tenant_id', tenantId)
      ,
    supabase
      .from('alerts' as any)
      .select('status, severity')
      .eq('tenant_id', tenantId)
      .in('status', ['active', 'acknowledged'])
      ,
  ]);

  const { data: events24h } = events24hResult;
  const { data: events7d } = events7dResult;
  const { data: events30d } = events30dResult;
  const { data: recentEvents } = recentEventsResult;
  const { data: nodesStatus } = nodesStatusResult;
  const { data: alertsCount } = alertsCountResult;

  // Calculate key metrics
  const totalEvents24h = events24h?.length || 0;
  const totalEvents7d = events7d?.length || 0;
  const totalEvents30d = events30d?.length || 0;

  // Node status
  const onlineNodes = nodesStatus?.filter((node: any) => {
    if (!node.last_seen_at) return false;
    const lastSeen = new Date(node.last_seen_at);
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    return lastSeen > fiveMinutesAgo;
  }).length || 0;

  const totalNodes = nodesStatus?.length || 0;

  // Alerts summary
  const activeAlerts = alertsCount?.filter((alert: any) => alert.status === 'active').length || 0;
  const criticalAlerts = alertsCount?.filter((alert: any) =>
    alert.status === 'active' && alert.severity === 'critical'
  ).length || 0;

  // Event type distribution (last 7 days)
  const eventTypeDistribution = events7d?.reduce((acc: any, event: any) => {
    const category = event.event_type.split('.')[0];
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {}) || {};

  // Severity distribution (last 24 hours)
  const severityDistribution24h = events24h?.reduce((acc: any, event: any) => {
    const severity = event.severity || 'unknown';
    acc[severity] = (acc[severity] || 0) + 1;
    return acc;
  }, {}) || {};

  // Hourly activity (last 24 hours)
  const hourlyActivity = Array.from({ length: 24 }, (_, i) => {
    const hour = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
    const hourStart = new Date(hour.getFullYear(), hour.getMonth(), hour.getDate(), hour.getHours(), 0, 0, 0);
    const hourEnd = new Date(hour.getFullYear(), hour.getMonth(), hour.getDate(), hour.getHours() + 1, 0, 0, 0);

    const count = events24h?.filter((event: any) => {
      const eventTime = new Date(event.created_at);
      return eventTime >= hourStart && eventTime < hourEnd;
    }).length || 0;

    return {
      hour: hourStart.toISOString(),
      count,
    };
  });

  // Top resources (last 7 days)
  const topResources = events7d?.reduce((acc: any, event: any) => {
    if (event.resource_id) {
      const key = `${event.resource_type}:${event.resource_id}`;
      if (!acc[key]) {
        acc[key] = {
          resourceType: event.resource_type,
          resourceId: event.resource_id,
          count: 0,
        };
      }
      acc[key].count++;
    }
    return acc;
  }, {});

  const sortedTopResources = Object.values(topResources || {})
    .sort((a: any, b: any) => b.count - a.count)
    .slice(0, 10);

  return {
    keyMetrics: {
      totalEvents24h,
      totalEvents7d,
      totalEvents30d,
      onlineNodes,
      totalNodes,
      activeAlerts,
      criticalAlerts,
      nodeHealthPercentage: totalNodes > 0 ? Math.round((onlineNodes / totalNodes) * 100) : 0,
    },
    distributions: {
      eventTypes: eventTypeDistribution,
      severity24h: severityDistribution24h,
    },
    charts: {
      hourlyActivity,
      topResources: sortedTopResources,
    },
    recentEvents: recentEvents?.map((event: any) => ({
      id: event.id,
      eventType: event.event_type,
      severity: event.severity,
      message: event.message,
      createdAt: event.created_at,
    })) || [],
  };
}

async function getPerformanceDashboard(supabase: any, tenantId: string, last7Days: Date) {
  const { data: performanceEvents } = await supabase
    .from('telemetry_events' as any)
    .select('*')
    .eq('tenant_id', tenantId)
    .gte('created_at', last7Days.toISOString())
    .not('duration', 'is', null)
    .order('duration', { ascending: false })
    ;

  const eventsWithDuration = performanceEvents || [];

  // Calculate performance metrics
  const avgDuration = eventsWithDuration.length > 0
    ? eventsWithDuration.reduce((sum: number, event: any) => sum + (event.duration || 0), 0) / eventsWithDuration.length
    : 0;

  const slowEvents = eventsWithDuration.slice(0, 20);
  const fastEvents = eventsWithDuration.slice(-20).reverse();

  // Performance by event type
  const performanceByType = eventsWithDuration.reduce((acc: any, event: any) => {
    const type = event.event_type;
    if (!acc[type]) {
      acc[type] = {
        count: 0,
        totalDuration: 0,
        avgDuration: 0,
        minDuration: Infinity,
        maxDuration: 0,
      };
    }
    acc[type].count++;
    acc[type].totalDuration += event.duration || 0;
    acc[type].minDuration = Math.min(acc[type].minDuration, event.duration || 0);
    acc[type].maxDuration = Math.max(acc[type].maxDuration, event.duration || 0);
    acc[type].avgDuration = acc[type].totalDuration / acc[type].count;
    return acc;
  }, {});

  return {
    summary: {
      totalPerformanceEvents: eventsWithDuration.length,
      averageDuration: Math.round(avgDuration),
      slowestEvent: eventsWithDuration[0]?.duration || 0,
      fastestEvent: eventsWithDuration[eventsWithDuration.length - 1]?.duration || 0,
    },
    slowEvents: slowEvents.map((event: any) => ({
      id: event.id,
      eventType: event.event_type,
      duration: event.duration,
      message: event.message,
      createdAt: event.created_at,
    })),
    fastEvents: fastEvents.map((event: any) => ({
      id: event.id,
      eventType: event.event_type,
      duration: event.duration,
      message: event.message,
      createdAt: event.created_at,
    })),
    performanceByType,
  };
}

async function getSecurityDashboard(supabase: any, tenantId: string, last7Days: Date) {
  const { data: securityEvents } = await supabase
    .from('telemetry_events' as any)
    .select('*')
    .eq('tenant_id', tenantId)
    .gte('created_at', last7Days.toISOString())
    .or('event_type.like.security%,severity.eq.critical')
    .order('created_at', { ascending: false })
    ;

  const securityData = securityEvents || [];

  // Security event breakdown
  const securityByType = securityData.reduce((acc: any, event: any) => {
    const type = event.event_type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const securityBySeverity = securityData.reduce((acc: any, event: any) => {
    acc[event.severity] = (acc[event.severity] || 0) + 1;
    return acc;
  }, {});

  // Recent security events
  const recentSecurityEvents = securityData.slice(0, 20).map((event: any) => ({
    id: event.id,
    eventType: event.event_type,
    severity: event.severity,
    message: event.message,
    userId: event.user_id,
    createdAt: event.created_at,
  }));

  return {
    summary: {
      totalSecurityEvents: securityData.length,
      criticalEvents: securityData.filter((e: any) => e.severity === 'critical').length,
      uniqueEventTypes: Object.keys(securityByType).length,
    },
    breakdown: {
      byType: securityByType,
      bySeverity: securityBySeverity,
    },
    recentEvents: recentSecurityEvents,
  };
}

async function getUsageDashboard(supabase: any, tenantId: string, last30Days: Date) {
  const { data: usageEvents } = await supabase
    .from('telemetry_events' as any)
    .select('*')
    .eq('tenant_id', tenantId)
    .gte('created_at', last30Days.toISOString())
    .order('created_at', { ascending: true })
    ;

  const events = usageEvents || [];

  // Daily usage
  const dailyUsage = events.reduce((acc: any, event: any) => {
    const date = event.created_at.split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // User activity
  const userActivity = events.reduce((acc: any, event: any) => {
    const userId = event.user_id;
    if (!acc[userId]) {
      acc[userId] = {
        userId,
        eventCount: 0,
        lastActivity: event.created_at,
      };
    }
    acc[userId].eventCount++;
    if (new Date(event.created_at) > new Date(acc[userId].lastActivity)) {
      acc[userId].lastActivity = event.created_at;
    }
    return acc;
  }, {});

  const topUsers = Object.values(userActivity)
    .sort((a: any, b: any) => b.eventCount - a.eventCount)
    .slice(0, 10);

  return {
    summary: {
      totalEvents: events.length,
      uniqueUsers: Object.keys(userActivity).length,
      averageEventsPerDay: Math.round(events.length / 30),
    },
    dailyUsage: Object.entries(dailyUsage).map(([date, count]) => ({ date, count })),
    topUsers,
  };
}