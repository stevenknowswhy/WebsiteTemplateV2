import { NextResponse } from "next/server";
import { safeReturnPath } from "@/lib/redirect";
import { authLimiter, getClientIP } from "@/lib/ratelimit";

export async function GET(req: Request) {
  // Apply rate limiting to auth callback (prevents token flooding)
  const ip = getClientIP(req);
  const { success, reset, remaining } = await authLimiter.limit(`auth:${ip}`);

  if (!success) {
    const response = NextResponse.json(
      { error: "Too many authentication attempts" },
      { status: 429 }
    );
    response.headers.set("Retry-After", Math.ceil((reset - Date.now()) / 1000).toString());
    response.headers.set("X-RateLimit-Limit", "10");
    response.headers.set("X-RateLimit-Remaining", remaining.toString());
    response.headers.set("X-RateLimit-Reset", reset.toString());
    return response;
  }

  const url = new URL(req.url);
  // ... perform your auth exchange / session cookie set ...
  const next = safeReturnPath(url.searchParams.get("returnTo") || url.searchParams.get("next"));

  const response = NextResponse.redirect(new URL(next, url.origin));
  // Add rate limit headers for success case
  response.headers.set("X-RateLimit-Limit", "10");
  response.headers.set("X-RateLimit-Remaining", remaining.toString());
  response.headers.set("X-RateLimit-Reset", reset.toString());

  return response;
}