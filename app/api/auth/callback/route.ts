import { NextResponse } from "next/server";
import { safeReturnPath } from "@/lib/redirect";

export async function GET(req: Request) {
  const url = new URL(req.url);
  // ... perform your auth exchange / session cookie set ...
  const next = safeReturnPath(url.searchParams.get("returnTo") || url.searchParams.get("next"));
  return NextResponse.redirect(new URL(next, url.origin));
}