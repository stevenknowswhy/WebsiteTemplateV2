import * as Sentry from "@sentry/nextjs";

const release = process.env.SENTRY_RELEASE || process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA;

Sentry.init({
  dsn: process.env.SENTRY_DSN || undefined,
  enabled: !!process.env.SENTRY_DSN,
  release,
  environment: process.env.SENTRY_ENV || process.env.NODE_ENV,
  tracesSampler: (ctx) => {
    const name = ctx.transactionContext.name || "";
    // Heavier sampling for API & /app routes
    if (/^((GET|POST|PUT|DELETE) \/api\/)|^GET \/app\//.test(name)) {
      return Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0.1);
    }
    return Number(process.env.SENTRY_LOW_PRIORITY_SAMPLE ?? 0.05);
  },
  sampleRate: Number(process.env.SENTRY_ERROR_SAMPLE_RATE ?? 1.0),
  profilesSampleRate: Number(process.env.SENTRY_PROFILES_SAMPLE_RATE ?? 0),
  beforeSend(event) {
    if (event.request?.headers) {
      delete event.request.headers["cookie"];
      delete event.request.headers["authorization"];
    }
    return event;
  },
});