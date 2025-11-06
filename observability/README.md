# SLO Spec

- `slo.json` defines availability, latency, error-rate, DSR, and client INP objectives.
- Point your provisioning tool at this file to create/refresh dashboards and alerts.
- Indicators are generic; map to your provider (Sentry / Datadog / Honeycomb / Better Stack).

## Mapping examples
- `http_status` → uptime/synthetic or logs query rate of 2xx vs others
- `latency_p95` → OTEL traces or provider APM (route dimension)
- `error_rate` → logs or Sentry over time
- `web_vitals_inp_p75` → RUM if enabled (or Lighthouse CI as proxy)