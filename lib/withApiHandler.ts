import { NextResponse } from "next/server";
import { getRequestId } from "@/lib/requestId";
import { logError } from "@/lib/logger";
import { AppError, classifyUnknown } from "@/lib/errors";
import * as Sentry from "@sentry/nextjs";

type Handler = (req: Request, requestId: string) => Promise<Response> | Response;

export function withApiHandler(handler: Handler) {
  return async (req: Request) => {
    const requestId = getRequestId(req);
    const route = new URL(req.url).pathname;
    try {
      const res = await handler(req, requestId);
      if (!res.headers.get("cache-control")) res.headers.set("cache-control", "no-store");
      res.headers.set("x-request-id", requestId);
      return res;
    } catch (raw: any) {
      const err = classifyUnknown(raw);
      const status = err.statusCode;
      const body = { ok: false, code: err.code, requestId };

      // Structured log + Sentry capture
      logError(requestId, err, { route, status, code: err.code });
      Sentry.withScope((scope) => {
        scope.setTag("route", route);
        scope.setTag("code", err.code);
        scope.setTag("request_id", requestId);
        scope.setLevel(err.operational ? "warning" : "error");
        Sentry.captureException(err);
      });

      const res = NextResponse.json(body, { status });
      res.headers.set("x-request-id", requestId);
      return res;
    }
  };
}