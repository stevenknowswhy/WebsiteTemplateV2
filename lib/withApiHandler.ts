import { NextResponse } from "next/server";

type Handler = (req: Request) => Promise<Response> | Response;

export function withApiHandler(handler: Handler): Handler {
  return async (req: Request) => {
    try {
      const res = await handler(req);
      // ensure JSON responses set a minimal cache policy unless overridden
      if (!res.headers.get("cache-control")) {
        res.headers.set("cache-control", "no-store");
      }
      return res;
    } catch (err: any) {
      // Optionally send to Sentry here
      // Sentry.captureException(err);

      const status = err?.statusCode || 500;
      const code = err?.code || "INTERNAL_ERROR";
      return NextResponse.json({ ok: false, code }, { status });
    }
  };
}