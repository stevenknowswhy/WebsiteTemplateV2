// Browser OpenTelemetry - disabled by default due to CSP/privacy implications
// Uncomment and configure NEXT_PUBLIC_OTEL_EXPORTER_OTLP_ENDPOINT to enable
/*
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-web";

let started = false;

export function startOtelWeb() {
  if (started) return;
  started = true;

  if (!process.env.NEXT_PUBLIC_OTEL_EXPORTER_OTLP_ENDPOINT) return;

  const exporter = new OTLPTraceExporter({
    url: `${process.env.NEXT_PUBLIC_OTEL_EXPORTER_OTLP_ENDPOINT!.replace(/\/$/, "")}/v1/traces`,
    headers: {}, // Avoid sending secrets from browser
  });

  const provider = new WebTracerProvider();

  provider.addSpanProcessor(new BatchSpanProcessor(exporter));
  provider.register();
}
*/