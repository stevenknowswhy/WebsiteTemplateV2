import { NextResponse } from "next/server";
import { withApiHandler } from "@/lib/withApiHandler";
import { httpError } from "@/lib/errors";
import { supabaseAdmin } from "@/lib/db";
import { auditLog } from "@/lib/audit";

// Replace with your real auth
async function getUserId(req: Request): Promise<string | null> {
  return req.headers.get("x-user-id");
}

/**
 * Soft-delete example:
 * - set profiles.deleted_at = now()
 * - anonymize PII (email/name) where possible
 * - delete non-essential derived data (events/logs)
 * NOTE: Confirm legal requirements before hard-deleting.
 */
export const POST = withApiHandler(async (req, requestId) => {
  const userId = await getUserId(req);
  if (!userId) throw httpError("UNAUTHORIZED", 401);

  // Wrap in a pseudo-transaction (Supabase PostgREST batches per table; for real tx, use RPC)
  const updates = [];

  updates.push(
    supabaseAdmin.from("profiles")
      .update({ deleted_at: new Date().toISOString(), email: null, name: null })
      .eq("id", userId)
  );

  updates.push(
    supabaseAdmin.from("events")
      .delete()
      .eq("user_id", userId)
  );

  updates.push(
    supabaseAdmin.from("subscriptions")
      .update({ status: "canceled" })
      .eq("user_id", userId)
  );

  const results = await Promise.all(updates);
  const failed = results.find(r => (r as any)?.error);
  if (failed) {
    await auditLog({
      requestId,
      actorUserId: userId,
      subjectUserId: userId,
      action: "DSR_DELETE",
      outcome: "FAIL",
      details: { error: (failed as any).error?.message },
    });
    throw httpError("INTERNAL_ERROR", 500, (failed as any).error?.message);
  }

  await auditLog({
    requestId,
    actorUserId: userId,
    subjectUserId: userId,
    action: "DSR_DELETE",
    outcome: "SUCCESS",
  });

  return NextResponse.json({ ok: true, requestId }, { status: 200 });
});