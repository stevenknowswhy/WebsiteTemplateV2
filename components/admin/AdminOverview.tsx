/**
 * Admin Overview Dashboard Component
 * KPI cards, recent alerts, quick actions, and system status
 */

'use client';

import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/lib/auth/admin-auth-client';
import { PermissionGuard } from '@/components/admin/PermissionGuard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertCard,
  AlertSeverity,
} from '@/components/admin/AlertCard';
import { NodeStatusCard } from '@/components/admin/NodeStatusCard';
import { QuickActions } from '@/components/admin/QuickActions';
import {
  Server,
  AlertTriangle,
  Users,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Wifi,
  WifiOff,
  Battery,
  Zap,
} from 'lucide-react';

interface KPIData {
  totalNodes: number;
  activeNodes: number;
  totalAlerts: number;
  criticalAlerts: number;
  totalUsers: number;
  networkUptime: number;
  energyGenerated: number;
  co2Saved: number;
}

interface RecentAlert {
  id: string;
  title: string;
  severity: AlertSeverity;
  node: string;
  nodeId: string;
  time: string;
  status: 'open' | 'acknowledged' | 'resolved';
}

interface SystemHealth {
  cpu: number;
  memory: number;
  storage: number;
  network: number;
}

export function AdminOverview() {
  const { user } = useAdminAuth();
  const [kpiData, setKpiData] = useState<KPIData>({
    totalNodes: 0,
    activeNodes: 0,
    totalAlerts: 0,
    criticalAlerts: 0,
    totalUsers: 0,
    networkUptime: 0,
    energyGenerated: 0,
    co2Saved: 0,
  });

  const [recentAlerts, setRecentAlerts] = useState<RecentAlert[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    cpu: 0,
    memory: 0,
    storage: 0,
    network: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load KPI data
      const kpiResponse = await fetch('/api/admin/kpi');
      if (kpiResponse.ok) {
        const data = await kpiResponse.json();
        setKpiData(data);
      }

      // Load recent alerts
      const alertsResponse = await fetch('/api/admin/alerts/recent');
      if (alertsResponse.ok) {
        const data = await alertsResponse.json();
        setRecentAlerts(data);
      }

      // Load system health
      const healthResponse = await fetch('/api/admin/system/health');
      if (healthResponse.ok) {
        const data = await healthResponse.json();
        setSystemHealth(data);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const nodeStatusPercentage = kpiData.totalNodes > 0
    ? (kpiData.activeNodes / kpiData.totalNodes) * 100
    : 0;

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99) return 'text-green-600';
    if (uptime >= 95) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthColor = (value: number) => {
    if (value <= 50) return 'bg-green-500';
    if (value <= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {user?.email?.split('@')[0]}. Here's what's happening with your network today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Network Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Status</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {kpiData.activeNodes}/{kpiData.totalNodes}
            </div>
            <p className="text-xs text-muted-foreground">
              nodes online
            </p>
            <div className="mt-2">
              <Progress value={nodeStatusPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {nodeStatusPercentage.toFixed(1)}% operational
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Network Uptime */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getUptimeColor(kpiData.networkUptime)}`}>
              {kpiData.networkUptime.toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground">
              last 30 days
            </p>
            <div className="flex items-center mt-2">
              {kpiData.networkUptime >= 99 ? (
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className="text-xs text-muted-foreground">
                {kpiData.networkUptime >= 99 ? 'Excellent' : 'Needs attention'}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {kpiData.criticalAlerts}
            </div>
            <p className="text-xs text-muted-foreground">
              critical alerts
            </p>
            <div className="mt-2">
              <Badge variant={kpiData.criticalAlerts > 0 ? 'destructive' : 'secondary'}>
                {kpiData.totalAlerts} total
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {kpiData.totalUsers}
            </div>
            <p className="text-xs text-muted-foreground">
              team members
            </p>
            <div className="mt-2">
              <Badge variant="outline">
                {user?.tenantContext?.role?.replace('_', ' ')}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Energy Generated */}
        <PermissionGuard permission="view_analytics">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Energy Generated</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {kpiData.energyGenerated.toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">
                kWh this month
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-muted-foreground">
                  +12% from last month
                </span>
              </div>
            </CardContent>
          </Card>
        </PermissionGuard>

        {/* CO2 Saved */}
        <PermissionGuard permission="view_analytics">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
              <Battery className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {kpiData.co2Saved.toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">
                kg this month
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-xs text-muted-foreground">
                  Environmental impact
                </span>
              </div>
            </CardContent>
          </Card>
        </PermissionGuard>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Alerts</CardTitle>
                  <CardDescription>
                    Latest network alerts requiring attention
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                    <p>All systems operational</p>
                    <p className="text-sm">No alerts requiring attention</p>
                  </div>
                ) : (
                  recentAlerts.map((alert) => (
                    <AlertCard
                      key={alert.id}
                      alert={alert}
                      onAcknowledge={() => console.log('Acknowledge', alert.id)}
                      onResolve={() => console.log('Resolve', alert.id)}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & System Health */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <QuickActions />

          {/* System Health */}
          <PermissionGuard permission="view_system_logs">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>
                  Real-time system metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CPU Usage</span>
                    <span>{systemHealth.cpu}%</span>
                  </div>
                  <Progress value={systemHealth.cpu} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Memory</span>
                    <span>{systemHealth.memory}%</span>
                  </div>
                  <Progress value={systemHealth.memory} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage</span>
                    <span>{systemHealth.storage}%</span>
                  </div>
                  <Progress value={systemHealth.storage} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Network</span>
                    <span>{systemHealth.network}%</span>
                  </div>
                  <Progress value={systemHealth.network} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </PermissionGuard>
        </div>
      </div>
    </div>
  );
}