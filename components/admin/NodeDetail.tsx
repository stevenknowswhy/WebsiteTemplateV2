/**
 * Node Detail Component
 * Comprehensive node information with telemetry, alerts, and management actions
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PermissionGuard } from '@/components/admin/PermissionGuard';
import {
  Activity,
  Battery,
  Cpu,
  HardDrive,
  Wifi,
  WifiOff,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  Zap,
  TrendingUp,
  Server,
  Settings,
  RefreshCw,
  Download,
} from 'lucide-react';

interface Node {
  id: string;
  node_id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance' | 'error' | 'pending_install';
  location?: string;
  firmware_version?: string;
  last_seen?: string;
  ip_address?: string;
  network_status?: boolean;
  battery_level?: number;
  energy_generated_kwh?: number;
  alerts_count?: number;
  created_at: string;
}

interface TelemetryData {
  cpu_usage_percent: number;
  memory_usage_percent: number;
  disk_usage_percent: number;
  network_latency_ms: number;
  temperature_celsius?: number;
  signal_strength?: number;
  recorded_at: string;
}

interface NodeAlert {
  id: string;
  title: string;
  message: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  status: 'open' | 'acknowledged' | 'resolved';
  triggered_at: string;
}

interface Props {
  node: Node;
}

export function NodeDetail({ node }: Props) {
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [alerts, setAlerts] = useState<NodeAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNodeDetails = async () => {
      try {
        // Fetch telemetry data
        const telemetryResponse = await fetch(`/api/admin/nodes/${node.id}/telemetry`);
        if (telemetryResponse.ok) {
          const telemetryData = await telemetryResponse.json();
          setTelemetry(telemetryData);
        }

        // Fetch recent alerts
        const alertsResponse = await fetch(`/api/admin/nodes/${node.id}/alerts`);
        if (alertsResponse.ok) {
          const alertsData = await alertsResponse.json();
          setAlerts(alertsData);
        }
      } catch (error) {
        console.error('Error fetching node details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNodeDetails();
  }, [node.id]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; icon: React.ReactNode; text: string }> = {
      active: {
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircle className="h-3 w-3" />,
        text: 'Active',
      },
      inactive: {
        color: 'bg-gray-100 text-gray-800',
        icon: <Server className="h-3 w-3" />,
        text: 'Inactive',
      },
      maintenance: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: <Settings className="h-3 w-3" />,
        text: 'Maintenance',
      },
      error: {
        color: 'bg-red-100 text-red-800',
        icon: <AlertTriangle className="h-3 w-3" />,
        text: 'Error',
      },
      pending_install: {
        color: 'bg-blue-100 text-blue-800',
        icon: <Clock className="h-3 w-3" />,
        text: 'Pending Install',
      },
    };

    const variant = variants[status] || variants.inactive;
    return (
      <Badge className={variant.color}>
        <span className="flex items-center gap-1">
          {variant.icon}
          {variant.text}
        </span>
      </Badge>
    );
  };

  const getAlertSeverityBadge = (severity: string) => {
    const colors: Record<string, string> = {
      critical: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-blue-100 text-blue-800',
      info: 'bg-gray-100 text-gray-800',
    };

    return (
      <Badge className={colors[severity] || colors.info}>
        {severity.toUpperCase()}
      </Badge>
    );
  };

  const handleNodeAction = async (action: string) => {
    try {
      const response = await fetch(`/api/admin/nodes/${node.id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) throw new Error('Failed to perform action');

      // Could refresh node details here
      console.log(`Action ${action} completed successfully`);
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Node Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{node.name}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="font-mono">{node.node_id}</span>
            {node.ip_address && (
              <span className="font-mono">{node.ip_address}</span>
            )}
            {node.firmware_version && (
              <span>v{node.firmware_version}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {getStatusBadge(node.status)}
          <PermissionGuard permission="execute_node_commands">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNodeAction('restart')}
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Restart
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNodeAction('ping')}
              >
                <Wifi className="h-4 w-4 mr-1" />
                Ping
              </Button>
            </div>
          </PermissionGuard>
        </div>
      </div>

      {/* Node Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <div>
                <div className="text-sm text-gray-500">Location</div>
                <div className="font-medium">{node.location || 'Unknown'}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <div>
                <div className="text-sm text-gray-500">Last Seen</div>
                <div className="font-medium">
                  {node.last_seen
                    ? new Date(node.last_seen).toLocaleString()
                    : 'Never'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-gray-400" />
              <div>
                <div className="text-sm text-gray-500">Energy Generated</div>
                <div className="font-medium">
                  {node.energy_generated_kwh
                    ? `${node.energy_generated_kwh.toFixed(1)} kWh`
                    : '—'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-gray-400" />
              <div>
                <div className="text-sm text-gray-500">Active Alerts</div>
                <div className="font-medium">{node.alerts_count || 0}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="telemetry" className="space-y-4">
        <TabsList>
          <TabsTrigger value="telemetry">Telemetry</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="telemetry" className="space-y-4">
          {loading ? (
            <Card>
              <CardContent className="p-8 text-center">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
                Loading telemetry data...
              </CardContent>
            </Card>
          ) : telemetry ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* CPU Usage */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Cpu className="h-4 w-4" />
                    CPU Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Progress
                      value={telemetry.cpu_usage_percent}
                      className="h-2"
                    />
                    <div className="text-2xl font-bold">
                      {telemetry.cpu_usage_percent}%
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Memory Usage */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Memory Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Progress
                      value={telemetry.memory_usage_percent}
                      className="h-2"
                    />
                    <div className="text-2xl font-bold">
                      {telemetry.memory_usage_percent}%
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Disk Usage */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <HardDrive className="h-4 w-4" />
                    Disk Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Progress
                      value={telemetry.disk_usage_percent}
                      className="h-2"
                    />
                    <div className="text-2xl font-bold">
                      {telemetry.disk_usage_percent}%
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Network Status */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    {node.network_status ? (
                      <Wifi className="h-4 w-4" />
                    ) : (
                      <WifiOff className="h-4 w-4" />
                    )}
                    Network Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {node.network_status ? 'Online' : 'Offline'}
                    </div>
                    {telemetry.network_latency_ms && (
                      <div className="text-sm text-gray-500">
                        Latency: {telemetry.network_latency_ms}ms
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Battery Level */}
              {node.battery_level !== undefined && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Battery className="h-4 w-4" />
                      Battery Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Progress
                        value={node.battery_level}
                        className="h-2"
                      />
                      <div className="text-2xl font-bold">
                        {node.battery_level}%
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Temperature */}
              {telemetry.temperature_celsius && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Temperature
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {telemetry.temperature_celsius}°C
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                No telemetry data available
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          {alerts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                No alerts for this node
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <Card key={alert.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getAlertSeverityBadge(alert.severity)}
                          <span className="font-medium">{alert.title}</span>
                        </div>
                        <p className="text-sm text-gray-600">{alert.message}</p>
                        <div className="text-xs text-gray-400">
                          {new Date(alert.triggered_at).toLocaleString()}
                        </div>
                      </div>
                      <Badge variant="outline">{alert.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>System Logs</span>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-mono text-sm bg-gray-50 p-4 rounded-lg min-h-[200px]">
                <div className="space-y-1">
                  <div className="text-gray-500">
                    [2024-01-15 10:30:45] INFO: Node started successfully
                  </div>
                  <div className="text-gray-500">
                    [2024-01-15 10:31:02] INFO: Connected to network
                  </div>
                  <div className="text-yellow-600">
                    [2024-01-15 10:45:18] WARN: High CPU usage detected (85%)
                  </div>
                  <div className="text-gray-500">
                    [2024-01-15 10:52:33] INFO: CPU usage normalized (45%)
                  </div>
                  <div className="text-gray-500">
                    [2024-01-15 11:15:12] INFO: Health check passed
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <PermissionGuard permission="manage_nodes">
            <Card>
              <CardHeader>
                <CardTitle>Node Configuration</CardTitle>
                <CardDescription>
                  Configure node settings and parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-500">
                  Node configuration options will be available in a future update.
                </div>
              </CardContent>
            </Card>
          </PermissionGuard>
        </TabsContent>
      </Tabs>
    </div>
  );
}