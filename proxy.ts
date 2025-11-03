import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const PUBLIC_PATHS = new Set([
  "/",
  "/pricing",
  "/privacy",
  "/terms",
  "/api/health",
  "/api/ready",
  "/api/webhooks/stripe",
  "/favicon.ico"
]);

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Static files & public paths
  if (pathname.startsWith("/_next") || pathname.startsWith("/static")) {
    return NextResponse.next();
  }
  if ([...PUBLIC_PATHS].some(p => pathname === p || pathname.startsWith(p + "/"))) {
    return ensureRequestId(req, withSecurityHeaders(await updateSession(req)));
  }

  // Handle authentication via Supabase
  return ensureRequestId(req, withSecurityHeaders(await updateSession(req)));
}

export const config = {
  matcher: ["/((?!_next|static|.*\\.(?:css|js|png|jpg|jpeg|gif|svg|ico|txt)$).*)"]
};

// Minimal, safe-by-default headers (CSP in Report-Only for now)
function ensureRequestId(req: NextRequest, res: NextResponse) {
  const rid = req.headers.get("x-request-id") || crypto.randomUUID();
  res.headers.set("x-request-id", rid);
  return res;
}

function withSecurityHeaders(res: NextResponse) {
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.headers.set("X-XSS-Protection", "0");
  res.headers.set(
    "Content-Security-Policy-Report-Only",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "connect-src 'self' https:",
      "font-src 'self' data:",
      "frame-ancestors 'none'"
    ].join("; ")
  );
  return res;
}