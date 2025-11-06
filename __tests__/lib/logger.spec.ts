import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logger, createRequestLogger, Logger } from '@/lib/logger';

// Mock the dependencies
vi.mock('@/lib/trace', () => ({
  getOtelTraceIds: () => ({
    traceId: 'test-trace-id',
    spanId: 'test-span-id',
  }),
}));

vi.mock('@/lib/logShip', () => ({
  shipLog: vi.fn(),
}));

describe('Logger', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create a logger instance', () => {
    expect(logger).toBeInstanceOf(Logger);
  });

  it('should log messages at different levels', () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});

    logger.debug('Debug message');
    logger.info('Info message');
    logger.warn('Warning message');
    logger.error('Error message');

    expect(consoleSpy).toHaveBeenCalledTimes(3); // debug is below info level in production config
  });

  it('should include context in logs', () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});

    logger.info('Message with context', { userId: '123', action: 'login' });

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('[INFO] Message with context'),
      { userId: '123', action: 'login' }
    );
  });

  it('should support request tracking', () => {
    const requestLogger = createRequestLogger('test-request-id');
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});

    requestLogger.info('Request-specific message');

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('[INFO] [test-request-id] Request-specific message')
    );
  });

  it('should handle async log flushing', async () => {
    const shipLogMock = vi.fn();
    vi.doMock('@/lib/logShip', () => ({
      shipLog: shipLogMock,
    }));

    const testLogger = new Logger({
      minLevel: 'info',
      enableConsole: false,
      enableStructured: true,
      enableRemote: true,
      enableOtel: false,
      samplingRate: 1.0,
    });

    testLogger.info('Test message');

    // Advance timers to trigger flush
    vi.advanceTimersByTime(6000);

    // Wait for async operations
    await vi.waitFor(() => {
      expect(shipLogMock).toHaveBeenCalled();
    });
  });

  it('should respect sampling rate', () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});

    const samplingLogger = new Logger({
      minLevel: 'info',
      enableConsole: true,
      enableStructured: false,
      enableRemote: false,
      enableOtel: false,
      samplingRate: 0.0, // 0% sampling
    });

    samplingLogger.info('This should not appear');

    expect(consoleSpy).not.toHaveBeenCalled();
  });
});