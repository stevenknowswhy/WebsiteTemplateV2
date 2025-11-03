import { supabaseAdmin } from "@/lib/db";

export async function auditLog(opts: {
  requestId: string;
  actorUserId: string;           // who initiated the DSR (usually same as subject)
  subjectUserId: string;         // whose data is acted on
  action: "DSR_EXPORT" | "DSR_DELETE";
  outcome: "SUCCESS" | "FAIL" | "QUEUED";
  details?: Record<string, unknown>;
}) {
  const { error } = await supabaseAdmin.from("audit_logs").insert({
    request_id: opts.requestId,
    actor_user_id: opts.actorUserId,
    subject_user_id: opts.subjectUserId,
    action: opts.action,
    outcome: opts.outcome,
    details: opts.details ?? {},
  });
  if (error) {
    // eslint-disable-next-line no-console
    console.error("audit log insert failed", error);
  }
}