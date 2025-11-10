/**
 * Analytics React Hooks
 * Provides React hooks for consuming analytics data with real-time updates
 *
 * Features:
 * - Real-time data streaming with automatic cleanup
 * - Loading states and error handling
 * - Optimistic updates and cache invalidation
 * - TypeScript support with proper typing
 * - Subscription management and memory leak prevention
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type {
  KPIData,
  NodeAnalytics,
  CityAnalytics,
  PartnerAnalytics,
  TelemetryTimeSeries,
  NodeAlert,
  AnalyticsOptions,
  RealtimeSubscription
} from '@/lib/analytics';
import {
  analyticsService,
  getKPIData,
  getNodeAnalytics,
  getCityAnalytics,
  getPartnerAnalytics,
  getTelemetryTimeSeries,
  getActiveAlerts,
  subscribeToNodeTelemetry,
  subscribeToNodeStatus,
  subscribeToAlerts
} from '@/lib/analytics';

/**
 * Hook for fetching KPI data with optional real-time updates
 */
export function useKPIData(options?: AnalyticsOptions, realtime = false) {
  const [data, setData] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const subscriptionRef = useRef<RealtimeSubscription | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getKPIData(options);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch KPI data');
    } finally {
      setLoading(false);
    }
  }, [options]);

  useEffect(() => {
    fetchData();

    if (realtime) {
      // Subscribe to node status changes for KPI updates
      subscriptionRef.current = subscribeToNodeStatus(() => {
        fetchData(); // Refetch KPI data when node status changes
      });
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [fetchData, realtime]);

  const refetch = useCallback(() => {
    analyticsService.clearCache('kpi');
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

/**
 * Hook for fetching node analytics with optional real-time updates
 */
export function useNodeAnalytics(options?: AnalyticsOptions, realtime = false) {
  const [data, setData] = useState<NodeAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const subscriptionRef = useRef<RealtimeSubscription | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getNodeAnalytics(options);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch node analytics');
    } finally {
      setLoading(false);
    }
  }, [options]);

  useEffect(() => {
    fetchData();

    if (realtime) {
      // Subscribe to node status changes for real-time updates
      subscriptionRef.current = subscribeToNodeStatus((updatedNode) => {
        setData(prevData =>
          prevData.map(node =>
            node.nodeId === updatedNode.id
              ? {
                  ...node,
                  status: updatedNode.status,
                  lastSeen: updatedNode.updated_at
                }
              : node
          )
        );
      });
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [fetchData, realtime]);

  const refetch = useCallback(() => {
    analyticsService.clearCache('nodes');
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

/**
 * Hook for fetching city analytics
 */
export function useCityAnalytics(options?: AnalyticsOptions) {
  const [data, setData] = useState<CityAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getCityAnalytics(options);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch city analytics');
    } finally {
      setLoading(false);
    }
  }, [options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    analyticsService.clearCache('cities');
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

/**
 * Hook for fetching partner analytics
 */
export function usePartnerAnalytics(options?: AnalyticsOptions) {
  const [data, setData] = useState<PartnerAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getPartnerAnalytics(options);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch partner analytics');
    } finally {
      setLoading(false);
    }
  }, [options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    analyticsService.clearCache('partners');
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

/**
 * Hook for fetching telemetry time series data for a specific node
 */
export function useTelemetryTimeSeries(
  nodeId: string,
  metricName: string,
  options?: AnalyticsOptions,
  realtime = false
) {
  const [data, setData] = useState<TelemetryTimeSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const subscriptionRef = useRef<RealtimeSubscription | null>(null);

  const fetchData = useCallback(async () => {
    if (!nodeId || !metricName) return;

    try {
      setLoading(true);
      setError(null);
      const result = await getTelemetryTimeSeries(nodeId, metricName, options);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch telemetry data');
    } finally {
      setLoading(false);
    }
  }, [nodeId, metricName, options]);

  useEffect(() => {
    fetchData();

    if (realtime && nodeId) {
      // Subscribe to real-time telemetry updates
      subscriptionRef.current = subscribeToNodeTelemetry(nodeId, (newTelemetry) => {
        if ((newTelemetry as any).metric_name === metricName) {
          setData(prevData => [
            ...prevData,
            {
              timestamp: (newTelemetry as any).timestamp,
              nodeId: (newTelemetry as any).node_id,
              metricName: (newTelemetry as any).metric_name,
              value: (newTelemetry as any).value,
              unit: (newTelemetry as any).unit || ''
            }
          ]);
        }
      });
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [fetchData, realtime, nodeId, metricName]);

  const refetch = useCallback(() => {
    analyticsService.clearCache(`telemetry:${nodeId}:${metricName}`);
    fetchData();
  }, [fetchData, nodeId, metricName]);

  return { data, loading, error, refetch };
}

/**
 * Hook for fetching active alerts with real-time updates
 */
export function useActiveAlerts(options?: AnalyticsOptions, realtime = false) {
  const [data, setData] = useState<NodeAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const subscriptionRef = useRef<RealtimeSubscription | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getActiveAlerts(options);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch alerts');
    } finally {
      setLoading(false);
    }
  }, [options]);

  useEffect(() => {
    fetchData();

    if (realtime) {
      // Subscribe to new alerts
      subscriptionRef.current = subscribeToAlerts((newAlert) => {
        setData(prevData => [newAlert, ...prevData]);
      });
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [fetchData, realtime]);

  const refetch = useCallback(() => {
    analyticsService.clearCache('alerts');
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

/**
 * Hook for managing multiple analytics subscriptions
 * Useful for dashboard components that need multiple data sources
 */
export function useAnalyticsDashboard(options?: AnalyticsOptions) {
  const kpiData = useKPIData(options, true);
  const nodeAnalytics = useNodeAnalytics(options, true);
  const activeAlerts = useActiveAlerts({ limit: 10 }, true);

  const [refreshing, setRefreshing] = useState(false);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        kpiData.refetch(),
        nodeAnalytics.refetch(),
        activeAlerts.refetch()
      ]);
    } finally {
      setRefreshing(false);
    }
  }, [kpiData.refetch, nodeAnalytics.refetch, activeAlerts.refetch]);

  const hasError = kpiData.error || nodeAnalytics.error || activeAlerts.error;
  const isLoading = kpiData.loading || nodeAnalytics.loading || activeAlerts.loading;

  return {
    kpiData: kpiData.data,
    nodeAnalytics: nodeAnalytics.data,
    activeAlerts: activeAlerts.data,
    loading: isLoading,
    refreshing,
    error: hasError,
    refreshAll,
    refetchKPI: kpiData.refetch,
    refetchNodes: nodeAnalytics.refetch,
    refetchAlerts: activeAlerts.refetch
  };
}

/**
 * Hook for pagination with analytics data
 */
export function usePaginatedAnalytics<T>(
  fetchFunction: (options: AnalyticsOptions) => Promise<T[]>,
  initialOptions: AnalyticsOptions = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const limit = initialOptions.limit || 20;

  const fetchPage = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);
      const offset = pageNum * limit;
      const result = await fetchFunction({
        ...initialOptions,
        limit,
        offset
      });

      if (pageNum === 0) {
        setData(result);
      } else {
        setData(prev => [...prev, ...result]);
      }

      setHasMore(result.length === limit);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, initialOptions, limit]);

  useEffect(() => {
    fetchPage(0);
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPage(nextPage);
    }
  }, [loading, hasMore, page, fetchPage]);

  const refetch = useCallback(() => {
    setPage(0);
    fetchPage(0);
  }, [fetchPage]);

  return {
    data,
    loading,
    error,
    hasMore,
    loadMore,
    refetch,
    page
  };
}

/**
 * Hook for caching analytics data with TTL
 */
export function useCachedAnalytics<T>(
  key: string,
  fetchFunction: () => Promise<T>,
  ttl = 5 * 60 * 1000 // 5 minutes default
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef<{ data: T; timestamp: number } | null>(null);

  const fetchData = useCallback(async (force = false) => {
    try {
      setLoading(true);
      setError(null);

      // Check cache
      if (!force && cacheRef.current) {
        const age = Date.now() - cacheRef.current.timestamp;
        if (age < ttl) {
          setData(cacheRef.current.data);
          setLoading(false);
          return;
        }
      }

      const result = await fetchFunction();
      setData(result);
      cacheRef.current = {
        data: result,
        timestamp: Date.now()
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, ttl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  return { data, loading, error, refetch };
}

// All hooks are already exported individually throughout the file