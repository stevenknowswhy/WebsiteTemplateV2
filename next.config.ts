import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const mkCsp = (enforce = true) => {
  // Development needs 'unsafe-inline' for Next.js dev scripts
  const isDevelopment = process.env.NODE_ENV === "development";

  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "img-src 'self' data: blob:",
    "font-src 'self' data: https://cdnjs.cloudflare.com https://r2cdn.perplexity.ai https://fonts.googleapis.com https://fonts.gstatic.com https://ka-f.fontawesome.com", // Allow external fonts
    "style-src 'self' 'unsafe-inline'",
    `script-src 'self' ${isDevelopment ? "'unsafe-inline' 'unsafe-eval'" : ""}`, // Allow inline in dev only
    "connect-src 'self' https: wss:",           // Allow websockets
    "object-src 'none'",
    "upgrade-insecure-requests"
  ].filter(directive => directive && directive.trim()); // Remove empty strings

  return {
    key: enforce ? "Content-Security-Policy" : "Content-Security-Policy-Report-Only",
    value: directives.join("; ")
  };
};

const securityHeaders = [
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  mkCsp(true), // switch to false if you need Report-Only during rollout
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" }
];

const base: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders }
    ];
  }
};

module.exports = withBundleAnalyzer(base);
