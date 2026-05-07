import "server-only";

type AdminResult<T> = { ok: true; data: T } | { ok: false; message: string };

function getBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) throw new Error("NEXT_PUBLIC_API_URL is not set");
  return base.replace(/\/+$/, "");
}

function getAdminKey(): string {
  return process.env.ADMIN_KEY ?? process.env.NEXT_ADMIN_KEY ?? "dev-admin";
}

async function adminFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<AdminResult<T>> {
  try {
    const res = await fetch(`${getBaseUrl()}${path}`, {
      ...init,
      headers: {
        "content-type": "application/json",
        "X-Admin-Key": getAdminKey(),
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
    list: () => adminFetch<AdminLessonRow[]>("/admin/lessons"),
    create: (body: any) =>
      adminFetch<AdminLessonRow>("/admin/lessons", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    update: (id: string, body: any) =>
      adminFetch<AdminLessonRow>(`/admin/lessons/${encodeURIComponent(id)}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }),
    remove: (id: string) =>
      adminFetch<{ ok: true }>(`/admin/lessons/${encodeURIComponent(id)}`, {
        method: "DELETE",
      }),
  },
  classworks: {
    list: () => adminFetch<AdminClassworkRow[]>("/admin/classworks"),
    create: (body: any) =>
      adminFetch<AdminClassworkRow>("/admin/classworks", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    update: (id: string, body: any) =>
      adminFetch<AdminClassworkRow>(
        `/admin/classworks/${encodeURIComponent(id)}`,
        { method: "PUT", body: JSON.stringify(body) },
      ),
    remove: (id: string) =>
      adminFetch<{ ok: true }>(`/admin/classworks/${encodeURIComponent(id)}`, {
        method: "DELETE",
      }),
  },
  assignments: {
    list: () => adminFetch<AdminAssignmentRow[]>("/admin/assignments"),
    create: (body: any) =>
      adminFetch<AdminAssignmentRow>("/admin/assignments", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    update: (id: string, body: any) =>
      adminFetch<AdminAssignmentRow>(
        `/admin/assignments/${encodeURIComponent(id)}`,
        { method: "PUT", body: JSON.stringify(body) },
      ),
    remove: (id: string) =>
      adminFetch<{ ok: true }>(`/admin/assignments/${encodeURIComponent(id)}`, {
        method: "DELETE",
      }),
  },
};

