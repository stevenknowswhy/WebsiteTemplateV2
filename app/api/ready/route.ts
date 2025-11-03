import { getVersionInfo } from "@/lib/version";
import { Redis } from "@upstash/redis";
import { supabaseAdmin } from "@/lib/db";

export async function GET() {
  const v = getVersionInfo();
  const checks: Record<string, { ok: boolean; detail?: string }> = {};

  // Redis ping (ignore if not configured)
  try {
    if (process.env.UPSTASH_REDIS_REST_URL) {
      const redis = Redis.fromEnv();
      const pong = await redis.ping();
      checks.redis = { ok: pong === "PONG" };
    } else {
      checks.redis = { ok: true, detail: "not-configured" };
    }
  } catch (e: any) {
    checks.redis = { ok: false, detail: String(e?.message || e) };
  }

  // Supabase simple query (ignore if not configured)
  try {
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { error } = await supabaseAdmin.rpc("now"); // or a trivial select
      checks.supabase = { ok: !error, detail: error?.message };
    } else {
      checks.supabase = { ok: true, detail: "not-configured" };
    }
  } catch (e: any) {
    checks.supabase = { ok: false, detail: String(e?.message || e) };
  }

  const ok = Object.values(checks).every(c => c.ok);
  return new Response(JSON.stringify({ ok, ...v, checks }), {
    status: ok ? 200 : 503,
    headers: { "content-type": "application/json" }
  });
}