export function getRequestId(req: Request): string {
  const hdr = (name: string) => req.headers.get(name) || "";
  return (
    hdr("x-request-id") ||
    hdr("cf-ray") ||
    hdr("x-amzn-trace-id") ||
    crypto.randomUUID()
  );
}