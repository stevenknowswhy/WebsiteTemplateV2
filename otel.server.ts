// Server OpenTelemetry - disabled due to API compatibility issues
// Uncomment and fix when OTEL API issues are resolved
/*
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { context, trace } from "@opentelemetry/api";

let started = false;

export function startOtelNode() {
  if (started) return;
  started = true;

  const svcName = process.env.OTEL_SERVICE_NAME || "templateappv2";
  const exporter = new OTLPTraceExporter({
    url: `${process.env.OTEL_EXPORTER_OTLP_ENDPOINT?.replace(/\/$/, "")}/v1/traces`,
    headers: parseHeaders(process.env.OTEL_EXPORTER_OTLP_HEADERS || "")
  });

  const provider = new NodeTracerProvider({
    resource: resourceFromAttributes({
      [SemanticResourceAttributes.SERVICE_NAME]: svcName,
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.SENTRY_ENV || process.env.NODE_ENV
    }),
  });

  provider.addSpanProcessor(new BatchSpanProcessor(exporter));
  provider.register();

  // expose tracer for manual spans where useful
  trace.setGlobalTracerProvider(provider);
}
*/

// Placeholder implementation - replace with actual OTEL when API issues are resolved
export function startOtelNode() {
  // No-op implementation for now
  console.log("OpenTelemetry server implementation disabled due to API compatibility issues");
}

function parseHeaders(h: string): Record<string,string> {
  // "key1=value1,key2=value2"
  return h.split(",").reduce((acc, kv) => {
    const [k, v] = kv.split("=").map(s => s?.trim());
    if (k && v) acc[k] = v;
    return acc;
  }, {} as Record<string, string>);
}