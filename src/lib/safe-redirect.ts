/**
 * Returns a safe in-app path for post-login redirects, or null if untrusted.
 */
export function getSafeRedirectPath(raw: string | null | undefined): string | null {
  if (raw == null || typeof raw !== "string") return null;
  const t = raw.trim();
  if (!t.startsWith("/") || t.startsWith("//")) return null;
  if (t.includes("://")) return null;
  return t;
}
