/**
 * KPI Cards Component
 *
 * Reusable KPI metric cards with trend indicators, tooltips, and loading states
 * Designed for displaying key performance indicators in analytics dashboards
 */

'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Info,
  Loader2
} from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  previousValue?: string | number;
  unit?: string;
  icon?: React.ReactNode;
  description?: string;
  trend?: 'up' | 'down' | 'stable';
  status?: 'success' | 'warning' | 'error' | 'info';
  loading?: boolean;
  format?: 'number' | 'currency' | 'percentage' | 'bytes';
  decimals?: number;
  onClick?: () => void;
  className?: string;
}

interface KPICardsProps {
  cards: KPICardProps[];
  columns?: 1 | 2 | 3 | 4;
  loading?: boolean;
  className?: string;
}

function formatValue(
  value: string | number,
  format: 'number' | 'currency' | 'percentage' | 'bytes' = 'number',
  decimals: number = 1
): string {
  const numValue = typeof value === 'number' ? value : parseFloat(value.toString());

  if (isNaN(numValue)) return '0';

  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(numValue);

    case 'percentage':
      return `${numValue.toFixed(decimals)}%`;

    case 'bytes':
      const units = ['B', 'KB', 'MB', 'GB', 'TB'];
      let size = numValue;
      let unitIndex = 0;

      while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
      }

      return `${size.toFixed(decimals)} ${units[unitIndex]}`;

    case 'number':
    default:
      return numValue.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
  }
}

function calculateTrend(current: string | number, previous: string | number): {
  value: number;
  direction: 'up' | 'down' | 'stable';
} {
  const currentNum = typeof current === 'number' ? current : parseFloat(current.toString());
  const previousNum = typeof previous === 'number' ? previous : parseFloat(previous.toString());

  if (isNaN(currentNum) || isNaN(previousNum) || previousNum === 0) {
    return { value: 0, direction: 'stable' };
  }

  const change = ((currentNum - previousNum) / previousNum) * 100;
  const direction = Math.abs(change) < 0.1 ? 'stable' : change > 0 ? 'up' : 'down';

  return { value: change, direction };
}

function KPICard({
  title,
  value,
  previousValue,
  unit = '',
  icon,
  description,
  trend,
  status,
  loading,
  format = 'number',
  decimals = 1,
  onClick,
  className
}: KPICardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const calculatedTrend = previousValue && !trend ?
    calculateTrend(value, previousValue) :
    trend ? { value: 0, direction: trend } :
    { value: 0, direction: 'stable' };

  const statusColors = {
    success: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950',
    warning: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950',
    error: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950',
    info: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950'
  };

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    stable: 'text-gray-600'
  };

  const trendIcons = {
    up: <TrendingUp className="h-3 w-3" />,
    down: <TrendingDown className="h-3 w-3" />,
    stable: <Minus className="h-3 w-3" />
  };

  return (
    <TooltipProvider>
      <Card
        className={`
          p-4 cursor-pointer transition-all duration-200 hover:shadow-md
          ${status ? statusColors[status] : 'border-border bg-card'}
          ${onClick ? 'hover:scale-[1.02]' : ''}
          ${loading ? 'opacity-50' : ''}
          ${className}
        `}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              {icon && (
                <div className="text-muted-foreground">
                  {icon}
                </div>
              )}
              <h3 className="text-sm font-medium text-muted-foreground">
                {title}
              </h3>
              {description && (
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground opacity-50" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">{description}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            {/* Trend Indicator */}
            {previousValue && !loading && (
              <div className={`flex items-center space-x-1 text-xs ${trendColors[calculatedTrend.direction as keyof typeof trendColors]}`}>
                {trendIcons[calculatedTrend.direction as keyof typeof trendIcons]}
                <span>
                  {calculatedTrend.value > 0 ? '+' : ''}{calculatedTrend.value.toFixed(1)}%
                </span>
              </div>
            )}
          </div>

          {/* Value Display */}
          <div className="space-y-1">
            {loading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                <div className="h-8 w-20 bg-muted rounded animate-pulse" />
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {formatValue(value, format, decimals)}
                </div>
                {unit && (
                  <p className="text-xs text-muted-foreground">{unit}</p>
                )}
              </>
            )}

            {/* Previous Value Comparison */}
            {previousValue && !loading && isHovered && (
              <div className="text-xs text-muted-foreground pt-1 border-t">
                Previous: {formatValue(previousValue, format, decimals)} {unit}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

export default function KPICards({
  cards,
  columns = 4,
  loading = false,
  className
}: KPICardsProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-4 ${className}`}>
      {cards.map((card, index) => (
        <KPICard
          key={index}
          {...card}
          loading={loading || card.loading}
        />
      ))}
    </div>
  );
}

// Export individual KPICard for standalone use
export { KPICard };

// Export utility function for creating KPI cards
export function createKPICard(config: KPICardProps): KPICardProps {
  return config;
}

// Export preset configurations for common KPIs
export const KPICardPresets = {
  totalNodes: (value: number, previousValue?: number) => ({
    title: 'Total Nodes',
    value,
    previousValue,
    unit: 'nodes',
    icon: <div className="h-4 w-4 rounded-full bg-blue-500" />,
    description: 'Total number of deployed smart nodes',
    status: value > 0 ? 'success' : 'warning' as const,
    format: 'number' as const
  }),

  activeNodes: (value: number, previousValue?: number) => ({
    title: 'Active Nodes',
    value,
    previousValue,
    unit: 'nodes',
    icon: <div className="h-4 w-4 rounded-full bg-green-500" />,
    description: 'Nodes currently online and operational',
    status: value > 0 ? 'success' : 'error' as const,
    format: 'number' as const
  }),

  networkUptime: (value: number, previousValue?: number) => ({
    title: 'Network Uptime',
    value,
    previousValue,
    unit: '',
    icon: <div className="h-4 w-4 rounded-full bg-emerald-500" />,
    description: 'Average network uptime percentage',
    status: value >= 99 ? 'success' : value >= 95 ? 'warning' : 'error' as const,
    format: 'percentage' as const,
    decimals: 2
  }),

  totalRequests: (value: number, previousValue?: number) => ({
    title: 'Total Requests',
    value,
    previousValue,
    unit: 'requests',
    icon: <div className="h-4 w-4 rounded-full bg-purple-500" />,
    description: 'Total network requests processed',
    status: 'info' as const,
    format: 'number' as const
  }),

  energyGenerated: (value: number, previousValue?: number) => ({
    title: 'Energy Generated',
    value,
    previousValue,
    unit: 'kWh',
    icon: <div className="h-4 w-4 rounded-full bg-yellow-500" />,
    description: 'Total energy generated by nodes',
    status: 'success' as const,
    format: 'number' as const
  }),

  co2Saved: (value: number, previousValue?: number) => ({
    title: 'CO₂ Saved',
    value,
    previousValue,
    unit: 'kg',
    icon: <div className="h-4 w-4 rounded-full bg-green-500" />,
    description: 'Total CO₂ emissions saved',
    status: 'success' as const,
    format: 'number' as const
  }),

  revenue: (value: number, previousValue?: number) => ({
    title: 'Monthly Revenue',
    value,
    previousValue,
    unit: '',
    icon: <div className="h-4 w-4 rounded-full bg-emerald-500" />,
    description: 'Total monthly revenue from operations',
    status: 'success' as const,
    format: 'currency' as const,
    decimals: 0
  }),

  dataTransferred: (value: number, previousValue?: number) => ({
    title: 'Data Transferred',
    value,
    previousValue,
    unit: '',
    icon: <div className="h-4 w-4 rounded-full bg-blue-500" />,
    description: 'Total data transferred through the network',
    status: 'info' as const,
    format: 'bytes' as const,
    decimals: 1
  })
};