import * as Sentry from '@sentry/nextjs';
import { logger } from './logger';

export interface ErrorContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  userAgent?: string;
  ip?: string;
  route?: string;
  method?: string;
  status?: number;
  tags?: Record<string, string>;
  extra?: Record<string, any>;
}

export interface ErrorTrackingConfig {
  enabled: boolean;
  sampleRate: number;
  ignorePatterns: RegExp[];
  beforeSend?: (event: Sentry.Event) => Sentry.Event | null;
}

class ErrorTrackingService {
  private config: ErrorTrackingConfig;
  private errorCounts: Map<string, number> = new Map();
  private errorTimestamps: Map<string, number[]> = new Map();

  constructor(config: ErrorTrackingConfig) {
    this.config = config;
  }

  private shouldTrackError(error: Error, context?: ErrorContext): boolean {
    if (!this.config.enabled) {
      return false;
    }

    // Check sampling rate
    if (Math.random() > this.config.sampleRate) {
      return false;
    }

    // Check ignore patterns
    const errorMessage = error.message || '';
    const stackTrace = error.stack || '';

    for (const pattern of this.config.ignorePatterns) {
      if (pattern.test(errorMessage) || pattern.test(stackTrace)) {
        return false;
      }
    }

    // Rate limiting per error type
    const errorType = error.name || 'Unknown';
    const now = Date.now();
    const timestamps = this.errorTimestamps.get(errorType) || [];

    // Remove old timestamps (older than 1 hour)
    const recentTimestamps = timestamps.filter(timestamp => now - timestamp < 3600000);
    this.errorTimestamps.set(errorType, recentTimestamps);

    // Limit to 100 errors of the same type per hour
    if (recentTimestamps.length >= 100) {
      return false;
    }

    recentTimestamps.push(now);
    return true;
  }

  private enhanceEventWithContext(event: Sentry.Event, context?: ErrorContext): Sentry.Event {
    if (!context) {
      return event;
    }

    // Add user context
    if (context.userId) {
      event.user = { id: context.userId };
    }

    // Add tags
    if (context.tags) {
      event.tags = { ...event.tags, ...context.tags };
    }

    // Add extra context
    if (context.extra) {
      event.extra = { ...event.extra, ...context.extra };
    }

    // Add request context
    if (context.requestId || context.route || context.method) {
      event.request = {
        ...event.request,
        headers: {
          ...(context.requestId && { 'x-request-id': context.requestId }),
          ...(context.route && { 'x-route': context.route }),
          ...(context.method && { 'x-method': context.method }),
        },
      };
    }

    return event;
  }

  private logErrorToConsole(error: Error, context?: ErrorContext): void {
    const errorPrefix = context?.requestId ? `[${context.requestId}]` : '';
    const routePrefix = context?.route ? ` [${context.route}]` : '';

    logger.error(`${errorPrefix}${routePrefix} ${error.message}`, {
      error: error.message,
      stack: error.stack,
      userId: context?.userId,
      route: context?.route,
      method: context?.method,
      status: context?.status,
      tags: context?.tags,
    }, ['error-tracking']);
  }

  public captureException(error: Error | unknown, context?: ErrorContext): string | undefined {
    let sentryError: Error;

    if (error instanceof Error) {
      sentryError = error;
    } else if (typeof error === 'string') {
      sentryError = new Error(error);
    } else {
      sentryError = new Error(String(error));
    }

    if (!this.shouldTrackError(sentryError, context)) {
      this.logErrorToConsole(sentryError, context);
      return;
    }

    // Increment error count
    const errorType = sentryError.name || 'Unknown';
    const currentCount = this.errorCounts.get(errorType) || 0;
    this.errorCounts.set(errorType, currentCount + 1);

    // Create Sentry event
    const eventId = Sentry.captureException(sentryError);

    // Add context to the already captured event
    Sentry.withScope((scope) => {
      scope.setContext('custom', {
        ...(context as Record<string, any>),
        errorCount: this.errorCounts.get(errorType),
      });

      if (context?.requestId) {
        scope.setTag('request_id', context.requestId);
      }
      if (context?.route) {
        scope.setTag('route', context.route);
      }
      if (context?.method) {
        scope.setTag('method', context.method);
      }
    });

    // Always log to console
    this.logErrorToConsole(sentryError, context);

    return eventId;
  }

  public captureMessage(message: string, level: Sentry.SeverityLevel = 'error', context?: ErrorContext): string | undefined {
    if (!this.config.enabled || Math.random() > this.config.sampleRate) {
      logger.warn(message, { level, context }, ['error-tracking']);
      return;
    }

    const eventId = Sentry.captureMessage(message, level);

    // Add context to the already captured message
    Sentry.withScope((scope) => {
      scope.setContext('custom', context as Record<string, any> || {});
      scope.setLevel(level);
    });

    logger.error(message, { level, context }, ['error-tracking']);

    return eventId;
  }

  public setUser(user: { id?: string; email?: string; [key: string]: any }): void {
    if (this.config.enabled) {
      Sentry.setUser(user);
    }
    logger.info(`User context set: ${user.id || 'anonymous'}`, { user }, ['error-tracking']);
  }

  public clearUser(): void {
    if (this.config.enabled) {
      Sentry.setUser(null);
    }
    logger.info('User context cleared', {}, ['error-tracking']);
  }

  public addBreadcrumb(message: string, category: string, level: Sentry.SeverityLevel = 'info', data?: any): void {
    if (this.config.enabled) {
      Sentry.addBreadcrumb({
        message,
        category,
        level,
        data,
        timestamp: Date.now() / 1000,
      });
    }
    logger.debug(`Breadcrumb: ${message}`, { category, level, data }, ['error-tracking']);
  }

  public withTransaction<T>(
    name: string,
    op: string,
    fn: (span?: Sentry.Span) => Promise<T> | T,
    context?: ErrorContext
  ): Promise<T> {
    if (!this.config.enabled) {
      return Promise.resolve(fn());
    }

    return Sentry.startSpan(
      {
        name,
        op,
      },
      async (span) => {
        // Note: Tags are set using Sentry.withScope instead of directly on span
        // due to TypeScript compatibility issues with the current Sentry version
        Sentry.withScope((scope) => {
          if (context?.route) {
            scope.setTag('route', context.route);
          }
          if (context?.method) {
            scope.setTag('method', context.method);
          }
          if (context?.requestId) {
            scope.setTag('requestId', context.requestId);
          }
        });

        try {
          const result = await fn(span);
          span?.setStatus({ code: 0, message: 'ok' });
          return result;
        } catch (error) {
          span?.setStatus({ code: 2, message: 'internal_error' });
          this.captureException(error as Error, context);
          throw error;
        }
      }
    );
  }

  public getErrorCounts(): Record<string, number> {
    return Object.fromEntries(this.errorCounts);
  }

  public getErrorCountsByType(type: string): number {
    return this.errorCounts.get(type) || 0;
  }

  public resetErrorCounts(): void {
    this.errorCounts.clear();
    this.errorTimestamps.clear();
  }

  public updateConfig(newConfig: Partial<ErrorTrackingConfig>): void {
    this.config = { ...this.config, ...newConfig };
    logger.info('Error tracking config updated', { config: this.config }, ['error-tracking']);
  }
}

// Default instance
export const errorTracker = new ErrorTrackingService({
  enabled: process.env.NODE_ENV === 'production' && !!process.env.SENTRY_DSN,
  sampleRate: Number(process.env.SENTRY_ERROR_SAMPLE_RATE ?? 1.0),
  ignorePatterns: [
    // Network errors that are expected
    /Network Error/i,
    /Failed to fetch/i,
    /Load timeout/i,

    // Browser extensions
    /chrome-extension/i,
    /safari-extension/i,
    /moz-extension/i,

    // Benign errors
    /Non-Error exception captured/i,
    /Non-Error promise rejection captured/i,

    // User errors (404s, etc.)
    /404/i,
    /Not Found/i,

    // React development errors
    /Warning: /i,
  ],
  beforeSend: (event) => {
    // Remove sensitive data
    if (event.request?.headers) {
      delete event.request.headers['cookie'];
      delete event.request.headers['authorization'];
      delete event.request.headers['x-api-key'];
    }

    // Remove sensitive data from extra context
    if (event.contexts?.custom) {
      const custom = event.contexts.custom as any;
      if (custom.headers) {
        delete custom.headers.cookie;
        delete custom.headers.authorization;
        delete custom.headers['x-api-key'];
      }
    }

    return event;
  },
});

// Helper functions
export const captureError = (error: Error | unknown, context?: ErrorContext) => {
  return errorTracker.captureException(error, context);
};

export const captureMessage = (message: string, level?: Sentry.SeverityLevel, context?: ErrorContext) => {
  return errorTracker.captureMessage(message, level, context);
};

export const withErrorTracking = <T>(
  name: string,
  op: string,
  fn: (span?: Sentry.Span) => Promise<T> | T,
  context?: ErrorContext
): Promise<T> => {
  return errorTracker.withTransaction(name, op, fn, context);
};

export const setErrorUser = (user: { id?: string; email?: string; [key: string]: any }) => {
  return errorTracker.setUser(user);
};

export const clearErrorUser = () => {
  return errorTracker.clearUser();
};

export default errorTracker;