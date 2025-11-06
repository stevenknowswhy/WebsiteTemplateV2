import * as Sentry from "@sentry/nextjs";

const release = process.env.SENTRY_RELEASE || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;

Sentry.init({
  dsn: process.env.SENTRY_DSN || undefined,
  enabled: !!process.env.SENTRY_DSN,
  release,
  environment: process.env.SENTRY_ENV || process.env.NODE_ENV,
  // Transaction (trace) sampling at runtime
  tracesSampler: (ctx) => {
    // Lower sample on marketing pages; higher for app/API
    const name = ctx.transactionContext.name || "";
    if (/^GET \/($|pricing|privacy|terms)/.test(name)) return Number(process.env.SENTRY_LOW_PRIORITY_SAMPLE ?? 0.05);
    return Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0.1);
  },
  // Error event sampling (avoid noise)
  sampleRate: Number(process.env.SENTRY_ERROR_SAMPLE_RATE ?? 1.0),
  profilesSampleRate: Number(process.env.SENTRY_PROFILES_SAMPLE_RATE ?? 0),
  integrations: (integrations) => integrations,
  beforeSend(event) {
    // Redact potentially sensitive fields defensively
    if (event.request?.headers) {
      delete event.request.headers["cookie"];
      delete event.request.headers["authorization"];
    }
    return event;
  },
});