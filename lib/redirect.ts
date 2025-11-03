const ALLOWED = new Set(["/", "/dashboard", "/settings", "/pricing"]);
export function safeReturnPath(next?: string | null) {
  if (!next) return "/dashboard";
  if (next.startsWith("http://") || next.startsWith("https://")) return "/dashboard";
  const clean = next.split("#")[0].split("?")[0];
  return ALLOWED.has(clean) ? clean : "/dashboard";
}