type AdminResult<T> = { ok: true; data: T } | { ok: false; message: string };

function getBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) throw new Error("NEXT_PUBLIC_API_URL is not set");
  return base.replace(/\/+$/, "");
}

async function adminFetch<T>(
  path: string,
  token: string,
  init?: RequestInit,
): Promise<AdminResult<T>> {
  try {
    const res = await fetch(`${getBaseUrl()}${path}`, {
      ...init,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type") ?? "";
    const payload =
      contentType.includes("application/json")
        ? await res.json().catch(() => null)
        : null;

    if (!res.ok) {
      const msg =
        payload && typeof payload === "object" && "message" in payload
          ? String((payload as { message?: unknown }).message)
          : res.statusText || "Request failed";
      return { ok: false, message: msg };
    }

    return { ok: true, data: payload as T };
  } catch (e) {
    return { ok: false, message: "Could not reach the backend API." };
  }
}

export type AdminLessonRow = {
  id: string;
  level_id: string;
  title: string;
  slug: string;
  goal: string;
  explanation: string;
  example_code: string;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export type AdminClassworkRow = {
  id: string;
  lesson_id: string;
  title: string;
  instructions: string;
  requirements: unknown;
  starter_code: string;
  test_config: unknown;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export type AdminAssignmentRow = {
  id: string;
  level_id: string;
  title: string;
  instructions: string;
  requirements: unknown;
  starter_code: string;
  test_config: unknown;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export const adminApi = {
  lessons: {
    list: (token: string) =>
      adminFetch<AdminLessonRow[]>("/admin/lessons", token),
    create: (token: string, body: any) =>
      adminFetch<AdminLessonRow>("/admin/lessons", token, {
        method: "POST",
        body: JSON.stringify(body),
      }),
    update: (token: string, id: string, body: any) =>
      adminFetch<AdminLessonRow>(`/admin/lessons/${encodeURIComponent(id)}`, token, {
        method: "PUT",
        body: JSON.stringify(body),
      }),
    remove: (token: string, id: string) =>
      adminFetch<{ ok: true }>(`/admin/lessons/${encodeURIComponent(id)}`, token, {
        method: "DELETE",
      }),
  },
  classworks: {
    list: (token: string) =>
      adminFetch<AdminClassworkRow[]>("/admin/classworks", token),
    create: (token: string, body: any) =>
      adminFetch<AdminClassworkRow>("/admin/classworks", token, {
        method: "POST",
        body: JSON.stringify(body),
      }),
    update: (token: string, id: string, body: any) =>
      adminFetch<AdminClassworkRow>(
        `/admin/classworks/${encodeURIComponent(id)}`,
        token,
        { method: "PUT", body: JSON.stringify(body) },
      ),
    remove: (token: string, id: string) =>
      adminFetch<{ ok: true }>(`/admin/classworks/${encodeURIComponent(id)}`, token, {
        method: "DELETE",
      }),
  },
  assignments: {
    list: (token: string) =>
      adminFetch<AdminAssignmentRow[]>("/admin/assignments", token),
    create: (token: string, body: any) =>
      adminFetch<AdminAssignmentRow>("/admin/assignments", token, {
        method: "POST",
        body: JSON.stringify(body),
      }),
    update: (token: string, id: string, body: any) =>
      adminFetch<AdminAssignmentRow>(
        `/admin/assignments/${encodeURIComponent(id)}`,
        token,
        { method: "PUT", body: JSON.stringify(body) },
      ),
    remove: (token: string, id: string) =>
      adminFetch<{ ok: true }>(`/admin/assignments/${encodeURIComponent(id)}`, token, {
        method: "DELETE",
      }),
  },
};

