export async function register() {
  // Start OTEL only if endpoint configured
  if (process.env.OTEL_EXPORTER_OTLP_ENDPOINT) {
    const { startOtelNode } = await import("./otel.server");
    startOtelNode();
  }
  // If you also want browser traces -> opt-in:
  // if (typeof window !== "undefined") (await import("./otel.client")).startOtelWeb();
}