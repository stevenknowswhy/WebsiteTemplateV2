export type RateLimitProfile = {
  windowMs: number; // e.g. 60_000
  limit: number;    // requests per window
};

export const RATE_LIMITS: Record<string, RateLimitProfile> = {
  "POST:/api/auth/": { windowMs: 60_000, limit: 10 },
  "POST:/api/":      { windowMs: 60_000, limit: 30 },
  "GET:/api/":       { windowMs: 60_000, limit: 120 },
  "DEFAULT":         { windowMs: 60_000, limit: 60 }
};

// returns the first profile whose key is a prefix of METHOD:PATH
export function resolveProfile(method: string, path: string): RateLimitProfile {
  const key = `${method.toUpperCase()}:${path}`;
  for (const [prefix, prof] of Object.entries(RATE_LIMITS)) {
    if (prefix === "DEFAULT") continue;
    if (key.startsWith(prefix)) return prof;
  }
  return RATE_LIMITS.DEFAULT;
}