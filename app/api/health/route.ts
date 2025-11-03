import { getVersionInfo } from "@/lib/version";

export async function GET() {
  const v = getVersionInfo();
  return new Response(JSON.stringify({ ok: true, ...v }), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
}