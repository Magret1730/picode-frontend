export type ApiOk<T> = { ok: true; data: T };
export type ApiErr = {
  ok: false;
  status?: number;
  message: string;
  cause?: unknown;
};
export type ApiResult<T> = ApiOk<T> | ApiErr;

export function getApiBaseUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) return null;
  return url.replace(/\/+$/, "");
}

export async function fetchJson<T>(
  path: string,
  options?: RequestInit & { timeoutMs?: number },
): Promise<ApiResult<T>> {
  const base = getApiBaseUrl();
  if (!base) {
    return {
      ok: false,
      message: "API URL not configured (NEXT_PUBLIC_API_URL).",
    };
  }

  const controller = new AbortController();
  const timeoutMs = options?.timeoutMs ?? 3500;
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${base}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        "content-type": "application/json",
        ...(options?.headers ?? {}),
      },
      // Avoid caching “backend is offline” responses during dev.
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");
    const payload = isJson ? await res.json().catch(() => null) : null;

    if (!res.ok) {
      const maybeMessage =
        payload && typeof payload === "object" && "message" in payload
          ? String((payload as { message?: unknown }).message)
          : null;
      return {
        ok: false,
        status: res.status,
        message: maybeMessage || res.statusText || "Request failed",
      };
    }

    return { ok: true, data: payload as T };
  } catch (cause) {
    return {
      ok: false,
      message: "Could not reach the API. Using offline mode.",
      cause,
    };
  } finally {
    clearTimeout(id);
  }
}

