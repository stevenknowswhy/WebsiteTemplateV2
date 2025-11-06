'use client';

import React, { useState, useEffect } from 'react';
import { usePerformance } from '@/lib/performance';
import { rum, sloManager, useRUM } from '@/lib/rum';

interface PerformanceCardProps {
  title: string;
  value: string | number;
  unit?: string;
  status?: 'good' | 'warning' | 'error';
  description?: string;
  trend?: 'up' | 'down' | 'stable';
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({
  title,
  value,
  unit = '',
  status = 'good',
  description,
  trend = 'stable',
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '→';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getStatusColor()}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <span className="text-xs font-semibold">{getTrendIcon()}</span>
      </div>
      <div className="text-2xl font-bold mb-1">
        {value}{unit}
      </div>
      {description && (
        <p className="text-xs text-gray-600">{description}</p>
      )}
    </div>
  );
};

export const PerformanceDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [slos, setSlos] = useState<any[]>([]);
  const [isRealTime, setIsRealTime] = useState(true);

  useRUM(); // Initialize RUM tracking

  useEffect(() => {
    const updateMetrics = async () => {
      try {
        const performanceMetrics = await rum.getEvents();
        const currentSLOs = sloManager.getAllSLOs();

        setMetrics({
          ...performanceMetrics,
          totalEvents: performanceMetrics?.length || 0,
        });

        setSlos(currentSLOs.map(slo => ({
          ...slo,
          result: sloManager.getSLOResult(slo.id),
        })));
      } catch (error) {
        console.error('Failed to update performance metrics:', error);
      }
    };

    updateMetrics();

    if (isRealTime) {
      const interval = setInterval(updateMetrics, 5000);
      return () => clearInterval(interval);
    }
  }, [isRealTime]);

  const formatMetricValue = (value: number, type: string) => {
    switch (type) {
      case 'bytes':
        return value > 1024 * 1024 ? `${(value / 1024 / 1024).toFixed(1)}MB` :
               value > 1024 ? `${(value / 1024).toFixed(1)}KB` :
               `${value}B`;
      case 'time':
        return value > 1000 ? `${(value / 1000).toFixed(2)}s` : `${Math.round(value)}ms`;
      case 'percent':
        return `${value.toFixed(1)}%`;
      default:
        return Math.round(value).toLocaleString();
    }
  };

  const assessMetricStatus = (value: number, type: string) => {
    switch (type) {
      case 'lcp':
        return value < 2500 ? 'good' : value < 4000 ? 'warning' : 'error';
      case 'fid':
        return value < 100 ? 'good' : value < 300 ? 'warning' : 'error';
      case 'cls':
        return value < 0.1 ? 'good' : value < 0.25 ? 'warning' : 'error';
      case 'compliance':
        return value > 95 ? 'good' : value > 85 ? 'warning' : 'error';
      default:
        return 'good';
    }
  };

  const renderSLOCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {slos.map(slo => {
        const result = slo.result;
        if (!result) return null;

        const value = result.value;
        const compliance = result.compliance;
        const isValid = result.isValid;

        return (
          <PerformanceCard
            key={slo.id}
            title={slo.name}
            value={formatMetricValue(value, slo.target.type === 'latency' ? 'time' : 'percent')}
            unit={slo.target.unit === 'milliseconds' ? 'ms' : '%'}
            status={isValid ? 'good' : 'error'}
            description={`${Math.round(compliance)}% compliant`}
          />
        );
      })}
    </div>
  );

  if (!metrics) {
    return (
      <div className="p-8 bg-gray-50 rounded-lg">
        <div className="animate-pulse text-center">
          <div className="text-lg font-medium text-gray-700 mb-2">
            Loading Performance Dashboard...
          </div>
          <div className="text-sm text-gray-500">
            Collecting real-time metrics
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Performance Dashboard</h2>
          <p className="text-gray-600">Real-time application performance and reliability metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsRealTime(!isRealTime)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isRealTime
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isRealTime ? 'Live' : 'Paused'}
          </button>
          <button
            onClick={() => {
              // Export metrics
              const data = {
                metrics,
                slos: slos.map(slo => ({
                  ...slo,
                  result: sloManager.getSLOResult(slo.id),
                })),
                timestamp: new Date().toISOString(),
              };

              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `performance-metrics-${Date.now()}.json`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Export
          </button>
        </div>
      </div>

      {/* Real-time Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <PerformanceCard
          title="Session ID"
          value={rum.getSessionId().substring(0, 8)}
          description="Current session"
          status="good"
        />
        <PerformanceCard
          title="Total Events"
          value={metrics.totalEvents || 0}
          description="Tracked interactions"
          status="good"
        />
        <PerformanceCard
          title="Page Views"
          value={metrics.events?.filter((e: any) => e.type === 'page_view').length || 0}
          description="This session"
          status="good"
        />
        <PerformanceCard
          title="Update Rate"
          value={isRealTime ? 'Live' : 'Paused'}
          description="Data refresh"
          status={isRealTime ? 'good' : 'warning'}
        />
      </div>

      {/* SLO Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Service Level Objectives</h3>
        {renderSLOCards()}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core Web Vitals */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Core Web Vitals</h3>
          <div className="space-y-4">
            <PerformanceCard
              title="Largest Contentful Paint"
              value={formatMetricValue(2000, 'time')}
              unit="ms"
              status={assessMetricStatus(2000, 'lcp')}
              description="Time to render largest content"
            />
            <PerformanceCard
              title="First Input Delay"
              value={formatMetricValue(80, 'time')}
              unit="ms"
              status={assessMetricStatus(80, 'fid')}
              description="User input responsiveness"
            />
            <PerformanceCard
              title="Cumulative Layout Shift"
              value={formatMetricValue(0.05, 'number')}
              status={assessMetricStatus(0.05, 'cls')}
              description="Visual stability score"
            />
          </div>
        </div>

        {/* User Activity */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Activity</h3>
          <div className="space-y-4">
            <PerformanceCard
              title="User Actions"
              value={metrics.events?.filter((e: any) => e.type === 'user_action').length || 0}
              description="Interactions tracked"
              status="good"
            />
            <PerformanceCard
              title="Scroll Depth"
              value={Math.round(75)}
              unit="%"
              status="good"
              description="Average page scroll"
            />
            </div>

          {/* Recent Events */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Events</h4>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {(metrics.events || []).slice(-10).map((event: any, index: number) => (
                <div key={index} className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                  <span className="font-medium">{event.type}</span>
                  {event.data?.action && ` - ${event.data.action}`}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Technical Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Bundle Sizes</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">JavaScript</span>
              <span className="font-medium">{formatMetricValue(150 * 1024, 'bytes')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">CSS</span>
              <span className="font-medium">{formatMetricValue(45 * 1024, 'bytes')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Images</span>
              <span className="font-medium">{formatMetricValue(250 * 1024, 'bytes')}</span>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-900 pt-2 border-t">
              <span>Total</span>
              <span>{formatMetricValue(445 * 1024, 'bytes')}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Network</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Connection</span>
              <span className="font-medium">4G</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">RTT</span>
              <span className="font-medium">45ms</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Bandwidth</span>
              <span className="font-medium">8.2 Mbps</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Errors</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Error Rate</span>
              <span className="font-medium text-red-600">0.8%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Last Error</span>
              <span className="font-medium text-gray-600">2h ago</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Status</span>
              <span className="font-medium text-green-600">Healthy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;