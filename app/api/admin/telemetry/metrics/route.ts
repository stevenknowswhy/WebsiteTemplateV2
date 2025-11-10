/**
 * API Route for Admin Telemetry Metrics
 * GET: Fetch aggregated metrics and analytics data
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
    const timeRange = searchParams.get('timeRange') || '7d';
    const metricType = searchParams.get('metricType') || 'all';

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;

    // Calculate date range based on timeRange
    const now = new Date();
    let dateFrom: Date;

    switch (timeRange) {
      case '1d':
        dateFrom = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        dateFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        dateFrom = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Fetch all telemetry events for the time range
    const { data: events, error: eventsError } = await supabase
      .from('telemetry_events' as any)
      .select('*')
      .eq('tenant_id', tenantId)
      .gte('created_at', dateFrom.toISOString())
      .order('created_at', { ascending: true })
      .returns<any>();

    if (eventsError) {
      console.error('Error fetching telemetry events for metrics:', eventsError);
      return NextResponse.json(
        { error: 'Failed to fetch telemetry events' },
        { status: 500 }
      );
    }

    // Process events into metrics
    const metrics = processEventsIntoMetrics(events || [], timeRange, metricType);

    return NextResponse.json({
      timeRange,
      metricType,
      dateFrom: dateFrom.toISOString(),
      dateTo: now.toISOString(),
      totalEvents: events?.length || 0,
      metrics,
    });
  } catch (error) {
    console.error('Error in telemetry metrics API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function processEventsIntoMetrics(events: any[], timeRange: string, metricType: string) {
  const now = new Date();

  // Initialize metrics structure
  const metrics = {
    overview: {
      totalEvents: events.length,
      uniqueUsers: new Set(events.map(e => e.user_id)).size,
      averageEventsPerHour: 0,
      criticalEvents: events.filter(e => e.severity === 'critical').length,
      errorEvents: events.filter(e => e.severity === 'error').length,
      warningEvents: events.filter(e => e.severity === 'warning').length,
      infoEvents: events.filter(e => e.severity === 'info').length,
    },
    eventTypes: {} as Record<string, number>,
    severityDistribution: {} as Record<string, number>,
    resourceTypes: {} as Record<string, number>,
    userActivity: {} as Record<string, number>,
    timeSeriesData: [] as Array<{
      timestamp: string;
      count: number;
      severity: string;
    }>,
    performanceMetrics: {
      averageResponseTime: 0,
      slowestEvents: [] as Array<{
        id: string;
        duration: number | null;
        eventType: string;
        message: string;
        createdAt: string;
      }>,
      fastestEvents: [] as Array<{
        id: string;
        duration: number | null;
        eventType: string;
        message: string;
        createdAt: string;
      }>,
    },
    topResources: [] as Array<{
      resourceType: string;
      resourceId: string;
      eventCount: number;
      lastActivity: string;
    }>,
    securityEvents: {
      totalSecurityEvents: 0,
      securityEventTypeBreakdown: {} as Record<string, number>,
      recentSecurityEvents: [] as any[],
    },
  };

  // Process time series data
  const timeSeriesMap = new Map<string, Map<string, number>>();

  // Process each event
  events.forEach(event => {
    // Count event types
    metrics.eventTypes[event.event_type] = (metrics.eventTypes[event.event_type] || 0) + 1;

    // Count severity distribution
    const severity = event.severity || 'unknown';
    metrics.severityDistribution[severity]++;

    // Count resource types
    metrics.resourceTypes[event.resource_type] = (metrics.resourceTypes[event.resource_type] || 0) + 1;

    // Count user activity
    metrics.userActivity[event.user_id] = (metrics.userActivity[event.user_id] || 0) + 1;

    // Time series data (group by hour)
    const hourKey = new Date(event.created_at).toISOString().slice(0, 13) + ':00:00Z';
    if (!timeSeriesMap.has(hourKey)) {
      timeSeriesMap.set(hourKey, new Map());
    }
    const hourData = timeSeriesMap.get(hourKey)!;
    hourData.set(event.severity, (hourData.get(event.severity) || 0) + 1);

    // Performance metrics
    if (event.duration !== null && event.duration !== undefined) {
      metrics.performanceMetrics.averageResponseTime += event.duration;

      // Track slowest events
      metrics.performanceMetrics.slowestEvents.push({
        id: event.id,
        duration: event.duration,
        eventType: event.event_type,
        message: event.message,
        createdAt: event.created_at,
      });

      // Track fastest events
      metrics.performanceMetrics.fastestEvents.push({
        id: event.id,
        duration: event.duration,
        eventType: event.event_type,
        message: event.message,
        createdAt: event.created_at,
      });
    }

    // Security events
    if (event.event_type.startsWith('security.') || event.severity === 'critical') {
      metrics.securityEvents.totalSecurityEvents++;
      metrics.securityEvents.securityEventTypeBreakdown[event.event_type] =
        (metrics.securityEvents.securityEventTypeBreakdown[event.event_type] || 0) + 1;

      metrics.securityEvents.recentSecurityEvents.push({
        id: event.id,
        eventType: event.event_type,
        severity: event.severity,
        message: event.message,
        createdAt: event.created_at,
        userId: event.user_id,
      });
    }

    // Top resources
    if (event.resource_id) {
      const resourceKey = `${event.resource_type}:${event.resource_id}`;
      // This will be processed after all events are counted
    }
  });

  // Calculate average response time
  const eventsWithDuration = events.filter(e => e.duration !== null && e.duration !== undefined);
  if (eventsWithDuration.length > 0) {
    metrics.performanceMetrics.averageResponseTime =
      metrics.performanceMetrics.averageResponseTime / eventsWithDuration.length;
  }

  // Sort performance events
  metrics.performanceMetrics.slowestEvents.sort((a, b) => (b.duration || 0) - (a.duration || 0));
  metrics.performanceMetrics.fastestEvents.sort((a, b) => (a.duration || 0) - (b.duration || 0));

  // Keep only top 10
  metrics.performanceMetrics.slowestEvents = metrics.performanceMetrics.slowestEvents.slice(0, 10);
  metrics.performanceMetrics.fastestEvents = metrics.performanceMetrics.fastestEvents.slice(0, 10);

  // Process time series data
  timeSeriesMap.forEach((severityData, timestamp) => {
    severityData.forEach((count, severity) => {
      metrics.timeSeriesData.push({
        timestamp,
        count,
        severity,
      });
    });
  });

  // Sort time series data by timestamp
  metrics.timeSeriesData.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  // Process top resources
  const resourceMap = new Map<string, { count: number; lastActivity: string; resourceType: string }>();
  events.forEach(event => {
    if (event.resource_id) {
      const key = `${event.resource_type}:${event.resource_id}`;
      if (!resourceMap.has(key)) {
        resourceMap.set(key, {
          count: 0,
          lastActivity: event.created_at,
          resourceType: event.resource_type,
        });
      }
      const resource = resourceMap.get(key)!;
      resource.count++;
      if (new Date(event.created_at) > new Date(resource.lastActivity)) {
        resource.lastActivity = event.created_at;
      }
    }
  });

  metrics.topResources = Array.from(resourceMap.entries())
    .map(([key, data]) => {
      const [resourceType, resourceId] = key.split(':');
      return {
        resourceType,
        resourceId,
        eventCount: data.count,
        lastActivity: data.lastActivity,
      };
    })
    .sort((a, b) => b.eventCount - a.eventCount)
    .slice(0, 10);

  // Calculate average events per hour
  const hoursInRange = getTimeRangeHours(timeRange);
  metrics.overview.averageEventsPerHour = events.length / hoursInRange;

  // Sort user activity
  metrics.userActivity = Object.entries(metrics.userActivity)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .reduce((obj, [userId, count]) => {
      obj[userId] = count;
      return obj;
    }, {} as Record<string, number>);

  return metrics;
}

function getTimeRangeHours(timeRange: string): number {
  switch (timeRange) {
    case '1d': return 24;
    case '7d': return 7 * 24;
    case '30d': return 30 * 24;
    case '90d': return 90 * 24;
    default: return 7 * 24;
  }
}