import { NextResponse } from "next/server";
import { getRequestId } from "@/lib/requestId";
import { logError } from "@/lib/logger";

type Handler = (req: Request, requestId: string) => Promise<Response> | Response;

export function withApiHandler(handler: Handler) {
  return async (req: Request) => {
    const requestId = getRequestId(req);
    try {
      const res = await handler(req, requestId);
      if (!res.headers.get("cache-control")) res.headers.set("cache-control", "no-store");
      res.headers.set("x-request-id", requestId);
      return res;
    } catch (err: any) {
      logError(requestId, err, { route: new URL(req.url).pathname });
      const status = err?.statusCode || 500;
      const code = err?.code || "INTERNAL_ERROR";
      const body = { ok: false, code, requestId };
      const res = NextResponse.json(body, { status });
      res.headers.set("x-request-id", requestId);
      return res;
    }
  };
}