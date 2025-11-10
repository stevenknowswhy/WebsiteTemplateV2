/**
 * Telemetry Overview Component
 * Provides high-level dashboard with key metrics and visualizations
 */

'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Activity,
  AlertTriangle,
  Cpu,
  Database,
  Shield,
  TrendingDown,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';

interface DashboardData {
  keyMetrics: {
    totalEvents24h: number;
    totalEvents7d: number;
    totalEvents30d: number;
    onlineNodes: number;
    totalNodes: number;
    activeAlerts: number;
    criticalAlerts: number;
    nodeHealthPercentage: number;
  };
  distributions: {
    eventTypes: Record<string, number>;
    severity24h: Record<string, number>;
  };
  charts: {
    hourlyActivity: Array<{ hour: string; count: number }>;
    topResources: Array<{
      resourceType: string;
      resourceId: string;
      count: number;
    }>;
  };
  recentEvents: Array<{
    id: string;
    eventType: string;
    severity: string;
    message: string;
    createdAt: string;
  }>;
}

export default function TelemetryOverview() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/telemetry/dashboard?dashboardType=overview');

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const result = await response.json();
      setDashboardData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <AlertTriangle className="mx-auto h-12 w-12 mb-4" />
            <p>Error loading dashboard data: {error}</p>
            <button
              onClick={fetchDashboardData}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const { keyMetrics, distributions, charts, recentEvents } = dashboardData;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'error': return 'destructive';
      case 'warning': return 'secondary';
      case 'info': return 'default';
      default: return 'default';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'info': return <Activity className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events (24h)</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{keyMetrics.totalEvents24h.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {keyMetrics.totalEvents7d > 0 ?
                `+${Math.round(((keyMetrics.totalEvents24h / keyMetrics.totalEvents7d) * 7) - 100)}% from average`
                : 'No previous data'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Node Health</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{keyMetrics.nodeHealthPercentage}%</div>
            <Progress value={keyMetrics.nodeHealthPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {keyMetrics.onlineNodes} of {keyMetrics.totalNodes} nodes online
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{keyMetrics.activeAlerts}</div>
            <p className="text-xs text-muted-foreground">
              {keyMetrics.criticalAlerts > 0 && (
                <span className="text-red-600">{keyMetrics.criticalAlerts} critical</span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events (7d)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{keyMetrics.totalEvents7d.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Daily average: {Math.round(keyMetrics.totalEvents7d / 7).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Details */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Event Type Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Event Types (7d)</CardTitle>
            <CardDescription>Distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(distributions.eventTypes).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium capitalize">{type}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Severity Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Severity (24h)</CardTitle>
            <CardDescription>Event severity breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(distributions.severity24h).map(([severity, count]) => (
                <div key={severity} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getSeverityIcon(severity)}
                    <Badge variant={getSeverityColor(severity) as any}>
                      {severity}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Resources */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Resources (7d)</CardTitle>
            <CardDescription>Most active resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {charts.topResources.slice(0, 5).map((resource, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium truncate">
                      {resource.resourceType}:{resource.resourceId}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">{resource.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
          <CardDescription>Latest telemetry events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentEvents.slice(0, 10).map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getSeverityIcon(event.severity)}
                  <div>
                    <p className="text-sm font-medium">{event.eventType}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-md">
                      {event.message}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={getSeverityColor(event.severity) as any}>
                    {event.severity}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(event.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}