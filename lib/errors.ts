export type ErrorCode =
  | "INVALID_JSON"
  | "INVALID_INPUT"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "RATE_LIMIT"
  | "INTERNAL_ERROR";

export function httpError(code: ErrorCode, statusCode: number, msg?: string) {
  const err = new Error(msg || code);
  // @ts-expect-error enrich
  err.code = code;
  // @ts-expect-error enrich
  err.statusCode = statusCode;
  return err as Error & { code: ErrorCode; statusCode: number };
}