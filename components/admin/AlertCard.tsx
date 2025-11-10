/**
 * Alert Card Component
 * Display individual alert information with actions
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PermissionGuard } from '@/components/admin/PermissionGuard';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertTriangle,
  Info,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  ExternalLink,
} from 'lucide-react';

export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface Alert {
  id: string;
  title: string;
  description?: string;
  severity: AlertSeverity;
  node: string;
  nodeId: string;
  time: string;
  status: 'open' | 'acknowledged' | 'resolved';
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  resolvedBy?: string;
  resolvedAt?: string;
}

interface AlertCardProps {
  alert: Alert;
  onAcknowledge?: (alertId: string) => void;
  onResolve?: (alertId: string) => void;
  onView?: (alertId: string) => void;
  showActions?: boolean;
}

const severityConfig = {
  critical: {
    color: 'destructive',
    icon: AlertTriangle,
    label: 'Critical',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
  high: {
    color: 'destructive',
    icon: AlertCircle,
    label: 'High',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
  medium: {
    color: 'secondary',
    icon: AlertTriangle,
    label: 'Medium',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  low: {
    color: 'secondary',
    icon: Info,
    label: 'Low',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  info: {
    color: 'secondary',
    icon: Info,
    label: 'Info',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
  },
};

const statusConfig = {
  open: {
    color: 'destructive',
    icon: Clock,
    label: 'Open',
  },
  acknowledged: {
    color: 'secondary',
    icon: CheckCircle,
    label: 'Acknowledged',
  },
  resolved: {
    color: 'secondary',
    icon: XCircle,
    label: 'Resolved',
  },
};

export function AlertCard({
  alert,
  onAcknowledge,
  onResolve,
  onView,
  showActions = true,
}: AlertCardProps) {
  const [isAcknowledging, setIsAcknowledging] = useState(false);
  const [isResolving, setIsResolving] = useState(false);

  const severity = severityConfig[alert.severity];
  const status = statusConfig[alert.status];
  const SeverityIcon = severity.icon;
  const StatusIcon = status.icon;

  const handleAcknowledge = async () => {
    if (!onAcknowledge) return;

    setIsAcknowledging(true);
    try {
      await onAcknowledge(alert.id);
    } finally {
      setIsAcknowledging(false);
    }
  };

  const handleResolve = async () => {
    if (!onResolve) return;

    setIsResolving(true);
    try {
      await onResolve(alert.id);
    } finally {
      setIsResolving(false);
    }
  };

  const getTimeAgo = (timeString: string) => {
    try {
      const date = new Date(timeString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return timeString;
    }
  };

  return (
    <Card className={`${severity.bgColor} ${severity.borderColor} border`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            {/* Alert Icon */}
            <div className="flex-shrink-0 mt-1">
              <SeverityIcon className="h-5 w-5 text-red-500" />
            </div>

            {/* Alert Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {alert.title}
                </h4>
                <Badge variant={severity.color as any} className="text-xs">
                  {severity.label}
                </Badge>
                <Badge variant={status.color as any} className="text-xs">
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {status.label}
                </Badge>
              </div>

              {alert.description && (
                <p className="text-sm text-gray-600 mb-2">
                  {alert.description}
                </p>
              )}

              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {getTimeAgo(alert.time)}
                </span>
                <span>Node: {alert.node}</span>
                {alert.acknowledgedBy && (
                  <span>
                    Acknowledged by {alert.acknowledgedBy}
                  </span>
                )}
                {alert.resolvedBy && (
                  <span>
                    Resolved by {alert.resolvedBy}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          {showActions && (
            <div className="flex items-center space-x-2 ml-4">
              {alert.status === 'open' && (
                <PermissionGuard permission="acknowledge_alerts">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAcknowledge}
                    disabled={isAcknowledging}
                  >
                    {isAcknowledging ? 'Acknowledging...' : 'Acknowledge'}
                  </Button>
                </PermissionGuard>
              )}

              {(alert.status === 'open' || alert.status === 'acknowledged') && (
                <PermissionGuard permission="resolve_alerts">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleResolve}
                    disabled={isResolving}
                  >
                    {isResolving ? 'Resolving...' : 'Resolve'}
                  </Button>
                </PermissionGuard>
              )}

              {/* More Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" aria-label={`More actions for alert ${alert.title}`}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onView && (
                    <DropdownMenuItem onClick={() => onView(alert.id)}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                  )}
                  {alert.status === 'open' && (
                    <PermissionGuard permission="acknowledge_alerts">
                      <DropdownMenuItem onClick={handleAcknowledge}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Acknowledge
                      </DropdownMenuItem>
                    </PermissionGuard>
                  )}
                  {(alert.status === 'open' || alert.status === 'acknowledged') && (
                    <PermissionGuard permission="resolve_alerts">
                      <DropdownMenuItem onClick={handleResolve}>
                        <XCircle className="h-4 w-4 mr-2" />
                        Resolve
                      </DropdownMenuItem>
                    </PermissionGuard>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}