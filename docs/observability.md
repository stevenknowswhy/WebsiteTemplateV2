# Observability Dashboard — TemplateAppV2

## Core SLOs (start simple)
- **Availability (API):** 99.9% monthly — Source: `GET /api/ready` (status == 200).
- **Latency (p95):**
  - `GET /api/**`: p95 < 800ms
  - `POST /api/**`: p95 < 1200ms
- **Error rate (5xx):** < 0.5% of requests
- **INP (client interactivity):** p75 < 200ms (Lighthouse / RUM if enabled)
- **DSR endpoints:**
  - `/api/dsr/export` p95 < 3s
  - `/api/dsr/delete` p95 < 5s (background work excluded)

## Dashboards (tiles)
1. **Release Overview**
   - Current release (env var), deploy time, commit SHA
   - Error rate by release (Sentry)
2. **API Health**
   - Uptime of `/api/ready` (synthetic ping)
   - 2xx/4xx/5xx stacked over time
   - Top failing routes with codes
3. **Latency**
   - p50/p95/p99 by route (from OTEL traces or edge logs)
   - Breakdown by method (GET/POST)
4. **Errors**
   - Error count by `code` (AppError.code)
   - New issues vs regressions (Sentry)
   - Rate-limit denials (429) by route/ip
5. **Performance (Client)**
   - LCP, CLS, INP trend (if RUM enabled)
   - Bundle size over time (artifact from CI)
6. **Security & Privacy**
   - Count of DSR requests (export/delete) + outcomes
   - CSP violation count (if reporting enabled)
7. **Dependencies**
   - Redis ping success/latency
   - Supabase health query success/latency

## Alerts (initial thresholds)
- **API availability** < 99.9% over 30m → *page*
- **5xx error rate** > 1% 10m rolling → *page*
- **Route latency** p95 > 2x baseline for 15m → *notify*
- **Rate-limit spikes** 429 > baseline + 300% for 10m → *investigate*
- **DSR failure** any 5xx on `/api/dsr/**` → *page*
- **CSP violations** > 20/min → *notify*
- **Ready check** returns 503 → *page*

## Runbooks (link these)
- Incident severity ladder, first responder checklist
- Rollback plan (per service)
- Key dashboards links (API, Errors, Perf, DSR)