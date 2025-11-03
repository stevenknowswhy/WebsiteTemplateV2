const buckets = new Map<string, { count: number; ts: number }>();

export function allow(ip: string, limit = 60, windowMs = 60_000) {
  const now = Date.now();
  const rec = buckets.get(ip);
  if (!rec || now - rec.ts > windowMs) {
    buckets.set(ip, { count: 1, ts: now });
    return true;
  }
  if (rec.count >= limit) return false;
  rec.count++;
  return true;
}