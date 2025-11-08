import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const isDev = process.env.NODE_ENV !== 'production';

const scriptSrc = [
  "'self'",
  "'unsafe-eval'",               // Next dev/HMR
  "https://maps.googleapis.com",
  "https://maps.gstatic.com",
];
if (isDev) scriptSrc.push("'unsafe-inline'"); // dev only

const csp = `
  default-src 'self';
  script-src ${scriptSrc.join(' ')};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://*.googleapis.com https://*.gstatic.com;
  connect-src 'self' https://*.googleapis.com https://*.gstatic.com;
  font-src 'self' https://fonts.gstatic.com data: https://cdnjs.cloudflare.com https://r2cdn.perplexity.ai https://ka-f.fontawesome.com;
  frame-src 'self' https://*.google.com https://*.gstatic.com;
  worker-src 'self' blob:;
`.replace(/\s{2,}/g, ' ').trim();

const securityHeaders = [
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" }
];

const base: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders }
    ];
  }
};

module.exports = withBundleAnalyzer(base);