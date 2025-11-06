import { ZodSchema } from "zod";

export async function parseJson<T>(req: Request, schema: ZodSchema<T>) {
  let data: unknown;
  try { data = await req.json(); }
  catch { throw Object.assign(new Error("INVALID_JSON"), { statusCode: 400, code: "INVALID_JSON" }); }

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    throw Object.assign(new Error("INVALID_INPUT"), { statusCode: 400, code: "INVALID_INPUT" });
  }
  return parsed.data;
}