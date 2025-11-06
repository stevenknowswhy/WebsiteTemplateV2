function parseHeaders(h: string): Record<string,string> {
  return h.split(",").reduce((acc, kv) => {
    const [k, v] = kv.split("=").map(s => s?.trim());
    if (k && v) acc[k] = v;
    return acc;
  }, {} as Record<string,string>);
}

export async function shipLog(payload: unknown) {
  if (!process.env.LOG_DRAIN_URL) return;
  const sample = Number(process.env.LOG_DRAIN_SAMPLE_RATE ?? 0.2);
  if (Math.random() > sample) return;

  try {
    const headers = { "content-type": "application/json", ...parseHeaders(process.env.LOG_DRAIN_HEADERS || "") };
    // Do not await — keep request non-blocking
    fetch(process.env.LOG_DRAIN_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(() => {});
  } catch { /* ignore */ }
}