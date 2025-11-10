/**
 * Node Status Card Component
 * Display node status information with health indicators
 */

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { PermissionGuard } from '@/components/admin/PermissionGuard';
import {
  Server,
  Wifi,
  WifiOff,
  Activity,
  Clock,
  MapPin,
  Cpu,
  Users,
  HardDrive,
  Zap,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export interface NodeStatus {
  id: string;
  nodeId: string;
  name: string;
  type: 'hello_smart_node' | 'city_safe_node' | 'edge_infrastructure';
  status: 'active' | 'inactive' | 'maintenance' | 'degraded' | 'error';
  location: string;
  lastSeen: string;
  uptime: number;
  cpuUsage: number;
  memoryUsage: number;
  storageUsage: number;
  networkLatency: number;
  usersConnected: number;
  powerUsage: number;
}

interface NodeStatusCardProps {
  node: NodeStatus;
  onView?: (nodeId: string) => void;
  onCommand?: (nodeId: string, command: string) => void;
  compact?: boolean;
}

const statusConfig = {
  active: {
    color: 'default',
    icon: Wifi,
    label: 'Active',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
  },
  inactive: {
    color: 'secondary',
    icon: WifiOff,
    label: 'Inactive',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-700',
  },
  maintenance: {
    color: 'secondary',
    icon: Clock,
    label: 'Maintenance',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-700',
  },
  degraded: {
    color: 'secondary',
    icon: Activity,
    label: 'Degraded',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700',
  },
  error: {
    color: 'destructive',
    icon: WifiOff,
    label: 'Error',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
  },
};

const nodeTypeConfig = {
  hello_smart_node: {
    label: 'Hello Smart Node',
    icon: Wifi,
    color: 'text-blue-600',
  },
  city_safe_node: {
    label: 'City Safe Node',
    icon: Server,
    color: 'text-purple-600',
  },
  edge_infrastructure: {
    label: 'Edge Infrastructure',
    icon: HardDrive,
    color: 'text-green-600',
  },
};

export function NodeStatusCard({
  node,
  onView,
  onCommand,
  compact = false,
}: NodeStatusCardProps) {
  const status = statusConfig[node.status];
  const nodeType = nodeTypeConfig[node.type];
  const StatusIcon = status.icon;
  const TypeIcon = nodeType.icon;

  const getTimeAgo = (timeString: string) => {
    try {
      const date = new Date(timeString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return timeString;
    }
  };

  const getHealthColor = (value: number) => {
    if (value <= 50) return 'bg-green-500';
    if (value <= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getLatencyColor = (latency: number) => {
    if (latency <= 50) return 'text-green-600';
    if (latency <= 100) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (compact) {
    return (
      <Card className={`${status.bgColor} ${status.borderColor} border`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <StatusIcon className={`h-5 w-5 ${status.textColor}`} />
              <div>
                <h4 className="font-medium text-gray-900">{node.name}</h4>
                <p className="text-sm text-gray-500">{node.location}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={status.color as any} className="text-xs">
                {status.label}
              </Badge>
              <span className={`text-sm font-medium ${getLatencyColor(node.networkLatency)}`}>
                {node.networkLatency}ms
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${status.bgColor} ${status.borderColor} border`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${status.bgColor}`}>
              <StatusIcon className={`h-5 w-5 ${status.textColor}`} />
            </div>
            <div>
              <CardTitle className="text-lg">{node.name}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <TypeIcon className={`h-4 w-4 ${nodeType.color}`} />
                <span className="text-sm text-gray-600">{nodeType.label}</span>
                <Badge variant={status.color as any} className="text-xs">
                  {status.label}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <PermissionGuard permission="execute_node_commands">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCommand?.(node.id, 'reboot')}
              >
                Reboot
              </Button>
            </PermissionGuard>
            {onView && (
              <Button variant="ghost" size="sm" onClick={() => onView(node.id)}>
                View
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Location and Last Seen */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{node.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{getTimeAgo(node.lastSeen)}</span>
          </div>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">CPU</span>
              <span>{node.cpuUsage}%</span>
            </div>
            <Progress value={node.cpuUsage} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Memory</span>
              <span>{node.memoryUsage}%</span>
            </div>
            <Progress value={node.memoryUsage} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Storage</span>
              <span>{node.storageUsage}%</span>
            </div>
            <Progress value={node.storageUsage} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Uptime</span>
              <span className={node.uptime >= 99 ? 'text-green-600' : 'text-red-600'}>
                {node.uptime.toFixed(1)}%
              </span>
            </div>
            <Progress value={node.uptime} className="h-2" />
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-3 gap-4 pt-2 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Wifi className="h-4 w-4 text-gray-400" />
              <span className={`text-sm font-medium ${getLatencyColor(node.networkLatency)}`}>
                {node.networkLatency}ms
              </span>
            </div>
            <p className="text-xs text-gray-500">Latency</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium">{node.usersConnected}</span>
            </div>
            <p className="text-xs text-gray-500">Connected</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Zap className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium">{node.powerUsage}W</span>
            </div>
            <p className="text-xs text-gray-500">Power</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}