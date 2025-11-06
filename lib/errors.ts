export type ErrorCode =
  | "INVALID_JSON"
  | "INVALID_INPUT"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMIT"
  | "THIRD_PARTY"
  | "TIMEOUT"
  | "INTERNAL_ERROR";

export class AppError extends Error {
  code: ErrorCode;
  statusCode: number;
  operational: boolean;
  details?: Record<string, unknown>;

  constructor(code: ErrorCode, statusCode: number, message?: string, operational = true, details?: Record<string, unknown>) {
    super(message || code);
    this.code = code;
    this.statusCode = statusCode;
    this.operational = operational;
    this.details = details;
  }
}

export const httpError = (code: ErrorCode, status: number, msg?: string, details?: Record<string,unknown>) =>
  new AppError(code, status, msg, true, details);

// Quick classifier for foreign errors
export function classifyUnknown(err: any): AppError {
  if (err instanceof AppError) return err;
  const msg = String(err?.message || err);
  if (/timeout/i.test(msg)) return new AppError("TIMEOUT", 504, msg);
  if (/not\s*found/i.test(msg)) return new AppError("NOT_FOUND", 404, msg);
  return new AppError("INTERNAL_ERROR", 500, msg, false);
}