import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as Sentry from '@sentry/nextjs';
import { errorTracker, captureError, captureMessage, withErrorTracking } from '@/lib/error-tracking';

// Mock Sentry
vi.mock('@sentry/nextjs', () => ({
  init: vi.fn(),
  captureException: vi.fn(() => ({ event_id: 'test-event-id' })),
  captureMessage: vi.fn(() => ({ event_id: 'test-event-id' })),
  setUser: vi.fn(),
  addBreadcrumb: vi.fn(),
  startSpan: vi.fn((name, config, callback) => {
    const mockSpan = { setStatus: vi.fn() };
    return callback(mockSpan);
  }),
  withScope: vi.fn((callback) => {
    const scope = {
      setUser: vi.fn(),
      setTag: vi.fn(),
      setExtra: vi.fn(),
      addBreadcrumb: vi.fn(),
    };
    callback(scope);
  }),
}));

// Mock logger
vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
  },
}));

describe('ErrorTrackingService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    errorTracker.resetErrorCounts();
  });

  it('should capture exceptions', () => {
    const error = new Error('Test error');
    const context = { userId: '123', route: '/api/test' };

    const eventId = errorTracker.captureException(error, context);

    expect(Sentry.captureException).toHaveBeenCalledWith(error, expect.objectContaining({
      contexts: {
        custom: {
          userId: '123',
          route: '/api/test',
          errorCount: 1,
        },
      },
    }));

    expect(eventId).toBe('test-event-id');
  });

  it('should capture messages', () => {
    const message = 'Test message';
    const context = { userId: '123', route: '/api/test' };

    const eventId = errorTracker.captureMessage(message, 'error', context);

    expect(Sentry.captureMessage).toHaveBeenCalledWith(message, 'error', expect.objectContaining({
      contexts: {
        custom: {
          userId: '123',
          route: '/api/test',
        },
      },
    }));

    expect(eventId).toBe('test-event-id');
  });

  it('should respect sampling rate', () => {
    const lowRateTracker = errorTracker;
    lowRateTracker.updateConfig({ sampleRate: 0.0 });

    const error = new Error('Test error');
    const eventId = lowRateTracker.captureException(error);

    expect(Sentry.captureException).not.toHaveBeenCalled();
    expect(eventId).toBeUndefined();
  });

  it('should ignore errors based on patterns', () => {
    const networkError = new Error('Network Error');
    const eventId = errorTracker.captureException(networkError);

    expect(Sentry.captureException).not.toHaveBeenCalled();
    expect(eventId).toBeUndefined();
  });

  it('should track error counts', () => {
    const error = new Error('Test error');

    errorTracker.captureException(error);
    errorTracker.captureException(error);
    errorTracker.captureException(error);

    const counts = errorTracker.getErrorCounts();
    expect(counts['Error']).toBe(3);
  });

  it('should set user context', () => {
    const user = { id: '123', email: 'test@example.com' };

    errorTracker.setUser(user);

    expect(Sentry.setUser).toHaveBeenCalledWith(user);
  });

  it('should support transaction wrapping', async () => {
    const mockFn = vi.fn().mockResolvedValue('success');
    const context = { route: '/api/test' };

    const result = await errorTracker.withTransaction(
      'test transaction',
      'http.client',
      mockFn,
      context
    );

    expect(result).toBe('success');
    expect(Sentry.startSpan).toHaveBeenCalledWith(
      {
        name: 'test transaction',
        op: 'http.client',
        tags: { route: '/api/test' },
      },
      expect.any(Function)
    );
  });

  it('should handle transaction errors', async () => {
    const error = new Error('Transaction error');
    const mockFn = vi.fn().mockRejectedValue(error);

    await expect(
      errorTracker.withTransaction('test', 'op', mockFn)
    ).rejects.toThrow(error);

    expect(Sentry.captureException).toHaveBeenCalledWith(error, undefined);
  });

  it('should rate limit errors', () => {
    // This test simulates hitting the rate limit
    const error = new Error('Rate limit test');

    // Simulate 100+ errors
    for (let i = 0; i < 110; i++) {
      errorTracker.captureException(error);
    }

    expect(Sentry.captureException).toHaveBeenCalledTimes(100);
  });
});

describe('Error Tracking Helpers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should provide captureError helper', () => {
    const error = new Error('Test error');
    captureError(error);

    expect(Sentry.captureException).toHaveBeenCalledWith(error, undefined);
  });

  it('should provide captureMessage helper', () => {
    captureMessage('Test message', 'warning');

    expect(Sentry.captureMessage).toHaveBeenCalledWith('Test message', 'warning', undefined);
  });

  it('should provide withErrorTracking helper', async () => {
    const mockFn = vi.fn().mockResolvedValue('result');

    await withErrorTracking('test', 'op', mockFn);

    expect(Sentry.startSpan).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalled();
  });
});