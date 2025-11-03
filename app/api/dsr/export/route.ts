import { NextResponse } from "next/server";
import { withApiHandler } from "@/lib/withApiHandler";
import { httpError } from "@/lib/errors";
import { supabaseAdmin } from "@/lib/db";
import { auditLog } from "@/lib/audit";

/**
 * Export user's data as JSON snapshot.
 * Auth expectation: You have a session/user id available via your auth layer.
 * Replace `getUserId` with your real implementation.
 */
async function getUserId(req: Request): Promise<string | null> {
  // TODO: integrate with your auth provider (cookies, headers, supabase auth, next-auth, clerk, etc.)
  const id = req.headers.get("x-user-id"); // placeholder for now
  return id;
}

export const GET = withApiHandler(async (req, requestId) => {
  const userId = await getUserId(req);
  if (!userId) throw httpError("UNAUTHORIZED", 401);

  // Gather data from your app tables. Example with made-up tables:
  const data: Record<string, unknown> = {};
  const queries = {
    profile: supabaseAdmin.from("profiles").select("*").eq("id", userId).single(),
    subscriptions: supabaseAdmin.from("subscriptions").select("*").eq("user_id", userId),
    invoices: supabaseAdmin.from("invoices").select("*").eq("user_id", userId),
    events: supabaseAdmin.from("events").select("*").eq("user_id", userId).limit(1000),
  };

  const [profile, subs, invoices, events] = await Promise.all([
    queries.profile, queries.subscriptions, queries.invoices, queries.events
  ]);

  if (profile.error) throw httpError("INTERNAL_ERROR", 500, profile.error.message);
  if (subs.error) throw httpError("INTERNAL_ERROR", 500, subs.error.message);
  if (invoices.error) throw httpError("INTERNAL_ERROR", 500, invoices.error.message);
  if (events.error) throw httpError("INTERNAL_ERROR", 500, events.error.message);

  data.profile = profile.data;
  data.subscriptions = subs.data;
  data.invoices = invoices.data;
  data.events = events.data;

  await auditLog({
    requestId,
    actorUserId: userId,
    subjectUserId: userId,
    action: "DSR_EXPORT",
    outcome: "SUCCESS",
    details: { sizes: {
      subscriptions: (subs.data as any[])?.length ?? 0,
      invoices: (invoices.data as any[])?.length ?? 0,
      events: (events.data as any[])?.length ?? 0,
    }},
  });

  return new NextResponse(JSON.stringify({ ok: true, requestId, data }), {
    status: 200,
    headers: { "content-type": "application/json", "x-request-id": requestId },
  });
});