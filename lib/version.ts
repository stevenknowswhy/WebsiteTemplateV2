export function getVersionInfo() {
  return {
    release: process.env.SENTRY_RELEASE || process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || "dev",
    env: process.env.SENTRY_ENV || process.env.NODE_ENV || "development",
    buildTime: process.env.BUILD_TIME || "",
    service: process.env.OTEL_SERVICE_NAME || "forhem",
  };
}