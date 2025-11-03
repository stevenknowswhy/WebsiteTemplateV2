import { getOtelTraceIds } from "@/lib/trace";
import { shipLog } from "@/lib/logShip";

export function log(level: "info" | "error" | "warn", requestId: string | undefined, message: string, extra?: Record<string, unknown>) {
  const { traceId, spanId } = getOtelTraceIds();
  const payload = {
    ts: new Date().toISOString(),
    level,
    message,
    requestId,
    traceId,
    spanId,
    ...extra,
  };
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(payload));
  shipLog(payload);
}

export const logError = (requestId: string, err: unknown, extra?: Record<string, unknown>) =>
  log("error", requestId, (err as any)?.message || String(err), { stack: (err as any)?.stack, ...extra });

export const logInfo = (requestId: string | undefined, message: string, extra?: Record<string, unknown>) =>
  log("info", requestId, message, extra);