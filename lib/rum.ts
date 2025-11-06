import * as React from 'react';
import { logger } from './logger';
import { errorTracker } from './error-tracking';

export interface RUMEvent {
  id: string;
  timestamp: string;
  type: 'page_view' | 'user_action' | 'performance' | 'custom';
  sessionId: string;
  userId?: string;
  page: string;
  data: Record<string, any>;
  metadata?: {
    userAgent: string;
    viewport: string;
    connection: string;
    location?: string;
  };
}

export interface SLO {
  id: string;
  name: string;
  description: string;
  target: {
    type: 'availability' | 'latency' | 'error_rate' | 'saturation';
    value: number;
    unit: string;
  };
  window: {
    duration: number;
    unit: 'seconds' | 'minutes' | 'hours' | 'days';
  };
  budget: {
    type: 'burn_rate' | 'error_budget';
    value: number;
  };
}

export interface SLOResult {
  slo: SLO;
  value: number;
  isValid: boolean;
  compliance: number;
  period: {
    start: string;
    end: string;
  };
  events: number;
  badEvents: number;
}

class RealUserMonitoring {
  private sessionId: string;
  private userId?: string;
  private events: RUMEvent[] = [];
  private flushInterval?: NodeJS.Timeout;
  private config: {
    enabled: boolean;
    sampleRate: number;
    endpoint?: string;
    batchSize: number;
    flushInterval: number;
  };

  constructor(config: Partial<typeof this.config> = {}) {
    this.config = {
      enabled: process.env.NODE_ENV === 'production',
      sampleRate: Number(process.env.RUM_SAMPLE_RATE ?? 1.0),
      endpoint: process.env.RUM_ENDPOINT,
      batchSize: 10,
      flushInterval: 5000,
      ...config,
    };

    this.sessionId = this.generateSessionId();
    this.setupAutoCollection();
    this.startFlushInterval();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateEventId(): string {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupAutoCollection(): void {
    if (typeof window === 'undefined' || !this.config.enabled) return;

    // Page visibility tracking
    document.addEventListener('visibilitychange', () => {
      this.track('page_view', {
        visibility_state: document.visibilityState,
      });
    });

    // User interactions (debonced)
    let interactionTimeout: NodeJS.Timeout;
    const trackInteraction = (action: string, element?: string) => {
      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        this.track('user_action', {
          action,
          element,
          timestamp: Date.now(),
        });
      }, 100);
    };

    // Click tracking
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const element = target.tagName.toLowerCase();
      const selector = this.getSelector(target);

      trackInteraction('click', `${element}${selector ? `:${selector}` : ''}`);
    });

    // Form interactions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      trackInteraction('form_submit', form.action);
    });

    // Scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', () => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        this.track('user_action', {
          action: 'scroll',
          depth: scrollDepth,
          max_depth: maxScrollDepth,
        });
      }
    });

    // Performance metrics
    this.collectPerformanceMetrics();

    // Connection information
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      this.updateMetadata({
        connection: `${connection.effectiveType || 'unknown'}-${connection.downlink || 0}mbps`,
        connection_rtt: connection.rtt,
        connection_save_data: connection.saveData,
      });
    }
  }

  private getSelector(element: HTMLElement): string {
    if (element.id) return `#${element.id}`;
    if (element.className) return `.${element.className.replace(/\s+/g, '.')}`;
    return element.tagName.toLowerCase();
  }

  private collectPerformanceMetrics(): void {
    if (typeof performance === 'undefined') return;

    // Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'largest-contentful-paint':
            this.track('performance', {
              metric: 'lcp',
              value: entry.startTime,
              url: (entry as any).url,
            });
            break;
          case 'first-input':
            this.track('performance', {
              metric: 'fid',
              value: (entry as any).processingStart - entry.startTime,
            });
            break;
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              this.track('performance', {
                metric: 'cls',
                value: (entry as any).value,
              });
            }
            break;
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (e) {
      logger.warn('Performance observer setup failed:', e as Record<string, any>, ['rum']);
    }

    // Navigation timing
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as any;
      if (navigation) {
        this.track('performance', {
          metric: 'page_load',
          value: navigation.loadEventEnd - navigation.navigationStart,
          dom_ready: navigation.domContentLoadedEventEnd - navigation.navigationStart,
          first_paint: navigation.responseStart - navigation.navigationStart,
        });
      }

      // Resource timing analysis
      this.analyzeResourceTiming();
    });
  }

  private analyzeResourceTiming(): void {
    const resources = performance.getEntriesByType('resource');
    const resourceAnalysis = {
      total_requests: resources.length,
      total_size: 0,
      total_time: 0,
      by_type: {} as Record<string, { count: number; size: number; time: number }>,
    };

    for (const resource of resources) {
      const size = (resource as PerformanceResourceTiming).transferSize || 0;
      const time = resource.duration;
      const type = this.getResourceType(resource.name);

      resourceAnalysis.total_size += size;
      resourceAnalysis.total_time += time;

      if (!resourceAnalysis.by_type[type]) {
        resourceAnalysis.by_type[type] = { count: 0, size: 0, time: 0 };
      }
      resourceAnalysis.by_type[type].count++;
      resourceAnalysis.by_type[type].size += size;
      resourceAnalysis.by_type[type].time += time;
    }

    this.track('performance', {
      metric: 'resources',
      ...resourceAnalysis,
    });
  }

  private getResourceType(url: string): string {
    if (/\.(js)$/i.test(url)) return 'javascript';
    if (/\.(css)$/i.test(url)) return 'css';
    if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(url)) return 'image';
    if (/\.(woff|woff2|ttf|otf)$/i.test(url)) return 'font';
    if (url.includes('/api/')) return 'api';
    return 'other';
  }

  private startFlushInterval(): void {
    if (this.config.enabled && this.config.endpoint) {
      this.flushInterval = setInterval(() => {
        this.flush();
      }, this.config.flushInterval);
    }
  }

  public track(type: RUMEvent['type'], data: Record<string, any>): void {
    if (!this.config.enabled || Math.random() > this.config.sampleRate) return;

    const event: RUMEvent = {
      id: this.generateEventId(),
      timestamp: new Date().toISOString(),
      type,
      sessionId: this.sessionId,
      userId: this.userId,
      page: window.location.pathname,
      data,
      metadata: this.getMetadata(),
    };

    this.events.push(event);

    // Flush immediately if batch size reached
    if (this.events.length >= this.config.batchSize) {
      this.flush();
    }

    // Flush error events immediately
    if (type === 'performance' && data.metric === 'error') {
      this.flush();
    }
  }

  public setPageView(path?: string): void {
    this.track('page_view', {
      url: path || window.location.pathname,
      referrer: document.referrer,
      title: document.title,
    });
  }

  public setUser(userId: string, userProperties?: Record<string, any>): void {
    this.userId = userId;
    this.updateMetadata({
      user_id: userId,
      ...userProperties,
    });

    logger.info('RUM user set', { userId }, ['rum']);
  }

  public updateMetadata(metadata: Record<string, any>): void {
    // This updates future events with new metadata
    // In a real implementation, you'd merge this with existing metadata
    logger.debug('RUM metadata updated', { metadata }, ['rum']);
  }

  private getMetadata(): RUMEvent['metadata'] {
    return {
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      connection: (navigator as any).connection?.effectiveType || 'unknown',
      location: window.location.href,
    };
  }

  private async flush(): Promise<void> {
    if (this.events.length === 0 || !this.config.endpoint) return;

    const eventsToSend = [...this.events];
    this.events = [];

    try {
      const response = await fetch(this.config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          events: eventsToSend,
          metadata: {
            session_id: this.sessionId,
            user_id: this.userId,
            timestamp: Date.now(),
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      logger.debug(`RUM flushed ${eventsToSend.length} events`, {}, ['rum']);
    } catch (error) {
      logger.error('RUM flush failed:', error as Record<string, any>, ['rum']);
      // Put events back in queue for retry
      this.events.unshift(...eventsToSend);

      // Limit queue size to prevent memory issues
      if (this.events.length > 100) {
        this.events = this.events.slice(0, 100);
      }
    }
  }

  public getEvents(): RUMEvent[] {
    return [...this.events];
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public clearEvents(): void {
    this.events = [];
  }

  public destroy(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    this.flush(); // Flush remaining events
  }
}

// SLO Management
class SLOManager {
  private slos: Map<string, SLO> = new Map();
  private eventCounts: Map<string, { good: number; bad: number }> = new Map();

  constructor() {
    this.loadSLOs();
  }

  private loadSLOs(): void {
    // Define default SLOs
    const defaultSLOs: SLO[] = [
      {
        id: 'page_load_performance',
        name: 'Page Load Performance',
        description: '95% of page loads should be under 3 seconds',
        target: {
          type: 'latency',
          value: 3000,
          unit: 'milliseconds',
        },
        window: {
          duration: 1,
          unit: 'days',
        },
        budget: {
          type: 'error_budget',
          value: 5, // 5% of requests can be slow
        },
      },
      {
        id: 'api_availability',
        name: 'API Availability',
        description: '99.9% of API requests should succeed',
        target: {
          type: 'availability',
          value: 99.9,
          unit: 'percent',
        },
        window: {
          duration: 1,
          unit: 'days',
        },
        budget: {
          type: 'burn_rate',
          value: 0.1, // 0.1% error rate allowed
        },
      },
      {
        id: 'user_interactivity',
        name: 'User Interactivity',
        description: '95% of user interactions should be handled within 100ms',
        target: {
          type: 'latency',
          value: 100,
          unit: 'milliseconds',
        },
        window: {
          duration: 1,
          unit: 'days',
        },
        budget: {
          type: 'error_budget',
          value: 5,
        },
      },
    ];

    defaultSLOs.forEach(slo => this.slos.set(slo.id, slo));
  }

  public addSLO(slo: SLO): void {
    this.slos.set(slo.id, slo);
    logger.info('SLO added', { sloId: slo.id, sloName: slo.name }, ['slo']);
  }

  public recordEvent(sloId: string, value: number, metadata?: Record<string, any>): void {
    const slo = this.slos.get(sloId);
    if (!slo) {
      logger.warn('Unknown SLO', { sloId }, ['slo']);
      return;
    }

    const key = `${sloId}_${this.getWindowKey(slo)}`;
    const counts = this.eventCounts.get(key) || { good: 0, bad: 0 };

    const isValid = this.validateSLO(slo, value);
    if (isValid) {
      counts.good++;
    } else {
      counts.bad++;
    }

    this.eventCounts.set(key, counts);

    logger.debug('SLO event recorded', {
      sloId,
      value,
      isValid,
      goodEvents: counts.good,
      badEvents: counts.bad,
    }, ['slo']);

    // Check SLO compliance
    this.checkSLOCompliance(slo);
  }

  private validateSLO(slo: SLO, value: number): boolean {
    switch (slo.target.type) {
      case 'latency':
        return value <= slo.target.value;
      case 'availability':
        return value >= slo.target.value;
      case 'error_rate':
        return value <= slo.target.value;
      case 'saturation':
        return value <= slo.target.value;
      default:
        return false;
    }
  }

  private getWindowKey(slo: SLO): string {
    const now = new Date();
    const windowStart = new Date(
      now.getTime() - this.getWindowDuration(slo) * 1000
    );

    return `${windowStart.toISOString().split('T')[0]}`;
  }

  private getWindowDuration(slo: SLO): number {
    switch (slo.window.unit) {
      case 'seconds':
        return slo.window.duration;
      case 'minutes':
        return slo.window.duration * 60;
      case 'hours':
        return slo.window.duration * 3600;
      case 'days':
        return slo.window.duration * 86400;
      default:
        return slo.window.duration;
    }
  }

  private checkSLOCompliance(slo: SLO): void {
    const key = `${slo.id}_${this.getWindowKey(slo)}`;
    const counts = this.eventCounts.get(key);
    if (!counts) return;

    const total = counts.good + counts.bad;
    if (total === 0) return;

    const compliance = (counts.good / total) * 100;
    const isValid = compliance >= (100 - slo.budget.value);

    if (!isValid) {
      logger.warn('SLO violation detected', {
        sloId: slo.id,
        sloName: slo.name,
        compliance: `${compliance.toFixed(2)}%`,
        target: `>${(100 - slo.budget.value).toFixed(2)}%`,
        goodEvents: counts.good,
        badEvents: counts.bad,
        totalEvents: total,
      }, ['slo', 'alert']);

      // Track error violation
      errorTracker.captureMessage(`SLO Violation: ${slo.name}`, 'warning', {
        extra: {
          sloId: slo.id,
          compliance,
          budgetRemaining: slo.budget.value - (100 - compliance),
        },
        tags: { slo: slo.name },
      });
    }
  }

  public getSLOResult(sloId: string, period?: { start: Date; end: Date }): SLOResult | null {
    const slo = this.slos.get(sloId);
    if (!slo) return null;

    const key = `${slo.id}_${this.getWindowKey(slo)}`;
    const counts = this.eventCounts.get(key) || { good: 0, bad: 0 };
    const total = counts.good + counts.bad;

    if (total === 0) return null;

    const value = slo.target.type === 'error_rate' || slo.target.type === 'availability'
      ? (counts.good / total) * 100
      : slo.target.value;

    const compliance = (counts.good / total) * 100;
    const isValid = compliance >= (100 - slo.budget.value);

    return {
      slo,
      value,
      isValid,
      compliance,
      period: {
        start: new Date().toISOString(),
        end: new Date(Date.now() + this.getWindowDuration(slo) * 1000).toISOString(),
      },
      events: total,
      badEvents: counts.bad,
    };
  }

  public getAllSLOs(): SLO[] {
    return Array.from(this.slos.values());
  }

  public resetCounts(sloId?: string): void {
    if (sloId) {
      this.eventCounts.forEach((_, key) => {
        if (key.startsWith(sloId)) {
          this.eventCounts.delete(key);
        }
      });
    } else {
      this.eventCounts.clear();
    }
  }
}

// Default instances
export const rum = new RealUserMonitoring();
export const sloManager = new SLOManager();

// React hooks
export const useRUM = () => {
  React.useEffect(() => {
    rum.setPageView();
  }, []);
};

export const useSLO = (sloId: string, value: number, dependencies: any[] = []) => {
  React.useEffect(() => {
    sloManager.recordEvent(sloId, value);
  }, [sloId, value, ...dependencies]);
};

export default {
  rum,
  sloManager,
  useRUM,
  useSLO,
};