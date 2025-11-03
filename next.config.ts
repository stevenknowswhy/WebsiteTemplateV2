import type { NextConfig } from "next";

const mkCsp = (enforce = true) => {
  // Start tight but compatible with Next (allow 'unsafe-inline' for styles only)
  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self'",                   // no inline/eval
    "connect-src 'self' https:",           // allow APIs/wss if needed: wss:
    "object-src 'none'",
    "upgrade-insecure-requests"
  ];
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

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders }
    ];
  }
};

export default nextConfig;
