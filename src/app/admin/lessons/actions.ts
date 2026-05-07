"use server";

import { revalidatePath } from "next/cache";
import { adminApi } from "@/lib/admin/api";

function pick(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export async function createLesson(formData: FormData) {
  const levelId = pick(formData, "levelId");
  const title = pick(formData, "title");
  const slug = pick(formData, "slug");
  const goal = pick(formData, "goal");
  const explanation = pick(formData, "explanation");
  const exampleCode = String(formData.get("exampleCode") ?? "");
  const orderIndex = Number(pick(formData, "orderIndex") || "1");

  if (!levelId || !title || !slug || !goal || !explanation) {
    return {
      ok: false as const,
      message: "Please fill in all required fields.",
    };
  }

  const res = await adminApi.lessons.create({
    levelId,
    title,
    slug,
    goal,
    explanation,
    exampleCode,
    orderIndex,
  });
  if (!res.ok) return { ok: false as const, message: res.message };

  revalidatePath("/admin/lessons");
  return { ok: true as const, message: "Lesson created." };
}

export async function updateLesson(id: string, formData: FormData) {
  const patch: Record<string, unknown> = {};
  const title = pick(formData, "title");
  const slug = pick(formData, "slug");
  const goal = pick(formData, "goal");
  const explanation = pick(formData, "explanation");
  const exampleCode = String(formData.get("exampleCode") ?? "");
  const orderIndexRaw = pick(formData, "orderIndex");

  if (title) patch.title = title;
  if (slug) patch.slug = slug;
  if (goal) patch.goal = goal;
  if (explanation) patch.explanation = explanation;
  patch.exampleCode = exampleCode;
  if (orderIndexRaw) patch.orderIndex = Number(orderIndexRaw);

  const res = await adminApi.lessons.update(id, patch);
  if (!res.ok) return { ok: false as const, message: res.message };

  revalidatePath("/admin/lessons");
  return { ok: true as const, message: "Lesson updated." };
}

export async function deleteLesson(id: string) {
  const res = await adminApi.lessons.remove(id);
  if (!res.ok) return { ok: false as const, message: res.message };

  revalidatePath("/admin/lessons");
  return { ok: true as const, message: "Lesson deleted." };
}

