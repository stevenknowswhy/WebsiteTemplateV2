import { ENV } from "@/lib/env";
export async function GET() {
  // minimal readiness check: env parsed + optional pings, etc.
  return new Response(JSON.stringify({ ok: true, env: ENV.NODE_ENV }), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
}