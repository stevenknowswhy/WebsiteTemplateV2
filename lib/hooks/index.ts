/**
 * Analytics Hooks Index
 * Central export point for all analytics-related React hooks
 */

export {
  useKPIData,
  useNodeAnalytics,
  useCityAnalytics,
  usePartnerAnalytics,
  useTelemetryTimeSeries,
  useActiveAlerts,
  useAnalyticsDashboard,
  usePaginatedAnalytics,
  useCachedAnalytics
} from './use-analytics';

// Re-export analytics service functions and types for convenience
export {
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

export type {
  KPIData,
  NodeAnalytics,
  CityAnalytics,
  PartnerAnalytics,
  TelemetryTimeSeries,
  NodeAlert,
  AnalyticsOptions,
  RealtimeSubscription
} from '@/lib/analytics';