import { context, trace } from "@opentelemetry/api";

export function getOtelTraceIds() {
  try {
    const span = trace.getSpan(context.active());
    const ctx = span?.spanContext();
    if (ctx) return { traceId: ctx.traceId, spanId: ctx.spanId };
  } catch {}
  return { traceId: undefined, spanId: undefined };
}

export function makeTraceparent(traceId?: string, spanId?: string, sampled = true) {
  if (!traceId || !spanId) return undefined;
  const version = "00";
  const flags = sampled ? "01" : "00";
  return `${version}-${traceId}-${spanId}-${flags}`;
}