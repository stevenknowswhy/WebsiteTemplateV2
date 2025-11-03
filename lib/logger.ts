export function logError(requestId: string, err: unknown, context?: Record<string, unknown>) {
  const payload = {
    level: "error",
    requestId,
    message: (err as any)?.message || String(err),
    code: (err as any)?.code,
    stack: (err as any)?.stack,
    ...context,
  };
  // eslint-disable-next-line no-console
  console.error(JSON.stringify(payload));
}