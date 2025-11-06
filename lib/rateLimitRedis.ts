import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { resolveProfile } from "@/ratelimit.config";

const redis = Redis.fromEnv();

function instanceFor(windowMs: number, limit: number) {
  // sliding window
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, `${windowMs} ms`),
    analytics: true,
    prefix: "rl"
  });
}

const cache = new Map<string, Ratelimit>();
function getLimiter(windowMs: number, limit: number) {
  const key = `${windowMs}:${limit}`;
  if (!cache.has(key)) cache.set(key, instanceFor(windowMs, limit));
  return cache.get(key)!;
}

/**
 * Rate limit by (ip || sessionId) and route profile
 */
export async function checkRateLimit(method: string, path: string, id: string) {
  const prof = resolveProfile(method, path);
  const rl = getLimiter(prof.windowMs, prof.limit);
  const key = `${method}:${path}:${id}`;
  const result = await rl.limit(key);
  return result; // { success, remaining, reset, limit }
}

export type RateLimitDecision = Awaited<ReturnType<typeof checkRateLimit>>;