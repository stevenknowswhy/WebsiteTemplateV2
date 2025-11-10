/**
 * Telemetry Metrics Component
 * Displays aggregated metrics and performance analytics
 */

'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Zap,
  AlertTriangle,
  BarChart3,
  PieChartIcon,
} from 'lucide-react';

interface MetricsResponse {
  timeRange: string;
  metricType: string;
  dateFrom: string;
  dateTo: string;
  totalEvents: number;
  metrics: {
    overview: {
      totalEvents: number;
      uniqueUsers: number;
      averageEventsPerHour: number;
      criticalEvents: number;
      errorEvents: number;
      warningEvents: number;
      infoEvents: number;
    };
    eventTypes: Record<string, number>;
    severityDistribution: {
      critical: number;
      error: number;
      warning: number;
      info: number;
    };
    resourceTypes: Record<string, number>;
    userActivity: Record<string, number>;
    timeSeriesData: Array<{
      timestamp: string;
      count: number;
      severity: string;
    }>;
    performanceMetrics: {
      averageResponseTime: number;
      slowestEvents: Array<{
        id: string;
        duration: number | null;
        eventType: string;
        message: string;
        createdAt: string;
      }>;
      fastestEvents: Array<{
        id: string;
        duration: number | null;
        eventType: string;
        message: string;
        createdAt: string;
      }>;
    };
    topResources: Array<{
      resourceType: string;
      resourceId: string;
      eventCount: number;
      lastActivity: string;
    }>;
    securityEvents: {
      totalSecurityEvents: number;
      securityEventTypeBreakdown: Record<string, number>;
      recentSecurityEvents: any[];
    };
  };
}

export default function TelemetryMetrics() {
  const [metricsData, setMetricsData] = useState<MetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('7d');
  const [metricType, setMetricType] = useState('all');

  useEffect(() => {
    fetchMetrics();
  }, [timeRange, metricType]);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        timeRange,
        metricType,
      });

      const response = await fetch(`/api/admin/telemetry/metrics?${params}`);

      if (!response.ok) {
        throw new Error('Failed to fetch metrics');
      }

      const result: MetricsResponse = await response.json();
      setMetricsData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#dc2626';
      case 'error': return '#dc2626';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const pieColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

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
            <p>Error loading metrics data: {error}</p>
            <Button onClick={fetchMetrics} className="mt-4">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!metricsData) {
    return null;
  }

  const { metrics } = metricsData;

  // Prepare chart data
  const eventTypeData = Object.entries(metrics.eventTypes).map(([type, count]) => ({
    type,
    count,
  }));

  const severityData = [
    { name: 'Critical', value: metrics.severityDistribution.critical, color: '#dc2626' },
    { name: 'Error', value: metrics.severityDistribution.error, color: '#ef4444' },
    { name: 'Warning', value: metrics.severityDistribution.warning, color: '#f59e0b' },
    { name: 'Info', value: metrics.severityDistribution.info, color: '#3b82f6' },
  ];

  const resourceTypeData = Object.entries(metrics.resourceTypes).map(([type, count]) => ({
    type,
    count,
  }));

  // Process time series data for line chart
  const hourlyData = metrics.timeSeriesData.reduce((acc: any[], item) => {
    const existing = acc.find(d => d.timestamp === item.timestamp);
    if (existing) {
      existing[item.severity] = item.count;
    } else {
      acc.push({
        timestamp: item.timestamp,
        [item.severity]: item.count,
        total: (acc[acc.length - 1]?.total || 0) + item.count,
      });
    }
    return acc;
  }, []);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Metrics Controls</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>

            <Select value={metricType} onValueChange={setMetricType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Metric Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Metrics</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="usage">Usage</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={fetchMetrics}>
              <Activity className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.overview.totalEvents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.overview.averageEventsPerHour.toFixed(1)} per hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.overview.uniqueUsers}</div>
            <p className="text-xs text-muted-foreground">
              Active users in period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Events</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{metrics.overview.criticalEvents}</div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.performanceMetrics.averageResponseTime.toFixed(0)}ms
            </div>
            <p className="text-xs text-muted-foreground">
              Across all events
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Time Series Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
            <CardDescription>Events over time by severity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(value) => new Date(value).toLocaleString()}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="critical"
                  stroke="#dc2626"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="error"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="warning"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="info"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Event Types Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChartIcon className="h-5 w-5" />
              <span>Event Types</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={eventTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, percent }: any) => `${type} ${((percent as number) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {eventTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Severity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Severity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={severityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6">
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Resource Types */}
        <Card>
          <CardHeader>
            <CardTitle>Resource Types</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={resourceTypeData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="type" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Average Response Time</span>
                <span className="text-sm text-gray-600">
                  {metrics.performanceMetrics.averageResponseTime.toFixed(2)}ms
                </span>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Slowest Events</h4>
                <div className="space-y-1">
                  {metrics.performanceMetrics.slowestEvents.slice(0, 3).map((event, index) => (
                    <div key={event.id} className="flex justify-between text-xs">
                      <span className="truncate mr-2">{event.eventType}</span>
                      <span className="text-red-600">{event.duration}ms</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Resources Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Resources</CardTitle>
          <CardDescription>Most active resources in the selected period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {metrics.topResources.slice(0, 10).map((resource, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{resource.resourceType}</p>
                    <p className="text-xs text-gray-500">{resource.resourceId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{resource.eventCount} events</p>
                  <p className="text-xs text-gray-500">
                    Last: {new Date(resource.lastActivity).toLocaleString()}
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