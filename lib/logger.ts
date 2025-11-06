import { v4 as uuidv4 } from 'uuid';
import { getOtelTraceIds } from "@/lib/trace";
import { shipLog } from "@/lib/logShip";

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  context?: Record<string, any>;
  userId?: string;
  requestId?: string;
  sessionId?: string;
  userAgent?: string;
  ip?: string;
  traceId?: string;
  spanId?: string;
  tags?: string[];
}

export interface LoggerConfig {
  minLevel: LogLevel;
  enableConsole: boolean;
  enableStructured: boolean;
  enableRemote: boolean;
  enableOtel: boolean;
  samplingRate: number;
}

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LogLevelPriority = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

class Logger {
  private config: LoggerConfig;
  private currentRequestId?: string;
  private currentSessionId?: string;
  private buffer: LogEntry[] = [];
  private flushInterval?: NodeJS.Timeout;

  constructor(config: LoggerConfig) {
    this.config = config;
    this.startFlushInterval();
  }

  private startFlushInterval() {
    if (this.config.enableRemote) {
      this.flushInterval = setInterval(() => {
        this.flush();
      }, 5000); // Flush every 5 seconds
    }
  }

  private shouldLog(level: LogLevel): boolean {
    if (Math.random() > this.config.samplingRate) {
      return false;
    }
    return LogLevelPriority[level] >= LogLevelPriority[this.config.minLevel];
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, any>,
    tags?: string[]
  ): LogEntry {
    let traceId, spanId;
    if (this.config.enableOtel) {
      try {
        ({ traceId, spanId } = getOtelTraceIds());
      } catch (error) {
        // Fallback if OpenTelemetry is not available
        traceId = undefined;
        spanId = undefined;
      }
    }

    return {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      userId: this.currentSessionId?.split(':')[0],
      requestId: this.currentRequestId,
      sessionId: this.currentSessionId,
      traceId,
      spanId,
      tags,
    };
  }

  protected async log(level: LogLevel, message: string, context?: Record<string, any>, tags?: string[]) {
    if (!this.shouldLog(level)) {
      return;
    }

    const entry = this.createLogEntry(level, message, context, tags);

    // Console logging
    if (this.config.enableConsole) {
      this.logToConsole(entry);
    }

    // Structured logging
    if (this.config.enableStructured) {
      this.buffer.push(entry);

      // Immediately flush error logs
      if (level === 'error') {
        await this.flush();
      }
    }

    // Remote logging (handled by flush interval)
  }

  private logToConsole(entry: LogEntry) {
    const timestamp = new Date(entry.timestamp).toLocaleTimeString();
    const prefix = `[${timestamp}] [${entry.level.toUpperCase()}]`;

    if (entry.requestId) {
      const message = `${prefix} [${entry.requestId}] ${entry.message}`;

      switch (entry.level) {
        case 'error':
          console.error(message, entry.context || '');
          break;
        case 'warn':
          console.warn(message, entry.context || '');
          break;
        case 'info':
          console.info(message, entry.context || '');
          break;
        case 'debug':
          console.debug(message, entry.context || '');
          break;
      }
    } else {
      const message = `${prefix} ${entry.message}`;

      switch (entry.level) {
        case 'error':
          console.error(message, entry.context || '');
          break;
        case 'warn':
          console.warn(message, entry.context || '');
          break;
        case 'info':
          console.info(message, entry.context || '');
          break;
        case 'debug':
          console.debug(message, entry.context || '');
          break;
      }
    }
  }

  private async flush() {
    if (this.buffer.length === 0) {
      return;
    }

    const logsToFlush = [...this.buffer];
    this.buffer = [];

    if (this.config.enableRemote) {
      try {
        // Use existing shipLog function for backward compatibility
        for (const log of logsToFlush) {
          shipLog({
            ts: log.timestamp,
            level: log.level,
            message: log.message,
            requestId: log.requestId,
            traceId: log.traceId,
            spanId: log.spanId,
            ...log.context,
          });
        }
      } catch (error) {
        // If remote logging fails, log to console as fallback
        console.error('Failed to send logs to remote endpoint:', error);
        // Put logs back in buffer for retry
        this.buffer.unshift(...logsToFlush);
      }
    }
  }

  // Public API
  debug(message: string, context?: Record<string, any>, tags?: string[]) {
    this.log('debug', message, context, tags);
  }

  info(message: string, context?: Record<string, any>, tags?: string[]) {
    this.log('info', message, context, tags);
  }

  warn(message: string, context?: Record<string, any>, tags?: string[]) {
    this.log('warn', message, context, tags);
  }

  error(message: string, context?: Record<string, any>, tags?: string[]) {
    this.log('error', message, context, tags);
  }

  // Request/Session tracking
  withRequest(requestId: string): Logger {
    this.currentRequestId = requestId;
    return this;
  }

  withSession(sessionId: string): Logger {
    this.currentSessionId = sessionId;
    return this;
  }

  withoutRequest(): Logger {
    this.currentRequestId = undefined;
    return this;
  }

  withoutSession(): Logger {
    this.currentSessionId = undefined;
    return this;
  }

  // Batch operations
  async flushLogs(): Promise<void> {
    await this.flush();
  }

  // Configuration updates
  updateConfig(newConfig: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  // Cleanup
  destroy(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    this.flush(); // Flush remaining logs
  }
}

// Default logger instance
export const logger = new Logger({
  minLevel: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  enableConsole: true,
  enableStructured: true,
  enableRemote: process.env.NODE_ENV === 'production',
  enableOtel: false, // Disabled until OpenTelemetry is properly set up
  samplingRate: 1.0,
});

// Request-specific logger for API routes
export const createRequestLogger = (requestId: string): Logger => {
  return new Logger({
    minLevel: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    enableConsole: true,
    enableStructured: true,
    enableRemote: process.env.NODE_ENV === 'production',
    enableOtel: false,
    samplingRate: 1.0,
  }).withRequest(requestId);
};

// Middleware helper for Next.js API routes
export const withLogging = (handler: Function) => {
  return async (req: Request, res: Response) => {
    const requestId = uuidv4();
    const requestLogger = createRequestLogger(requestId);

    try {
      requestLogger.info('API request started', {
        method: req.method,
        url: req.url,
        headers: Object.fromEntries(req.headers.entries()),
      });

      const result = await handler(req, res);

      requestLogger.info('API request completed', {
        status: res.status,
        method: req.method,
        url: req.url,
      });

      return result;
    } catch (error) {
      requestLogger.error('API request failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        method: req.method,
        url: req.url,
      });
      throw error;
    }
  };
};

// Legacy compatibility functions
export function log(level: "info" | "error" | "warn", requestId: string | undefined, message: string, extra?: Record<string, unknown>) {
  if (requestId) {
    const loggerWithRequest = logger.withRequest(requestId);
    switch (level) {
      case 'info':
        loggerWithRequest.info(message, extra);
        break;
      case 'error':
        loggerWithRequest.error(message, extra);
        break;
      case 'warn':
        loggerWithRequest.warn(message, extra);
        break;
    }
  } else {
    switch (level) {
      case 'info':
        logger.info(message, extra);
        break;
      case 'error':
        logger.error(message, extra);
        break;
      case 'warn':
        logger.warn(message, extra);
        break;
    }
  }
}

export const logError = (requestId: string, err: unknown, extra?: Record<string, unknown>) =>
  logger.withRequest(requestId).error(
    (err as any)?.message || String(err),
    { stack: (err as any)?.stack, ...extra }
  );

export const logInfo = (requestId: string | undefined, message: string, extra?: Record<string, unknown>) => {
  if (requestId) {
    logger.withRequest(requestId).info(message, extra);
  } else {
    logger.info(message, extra);
  }
};

export default logger;