"use server";

import { revalidatePath } from "next/cache";
import { adminApi } from "@/lib/admin/api";

function pick(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export async function createClasswork(formData: FormData) {
  const lessonId = pick(formData, "lessonId");
  const title = pick(formData, "title");
  const instructions = pick(formData, "instructions");
  const starterCode = String(formData.get("starterCode") ?? "");
  const requirementsText = String(formData.get("requirements") ?? "").trim();
  const orderIndex = Number(pick(formData, "orderIndex") || "1");

  if (!lessonId || !title || !instructions) {
    return { ok: false as const, message: "Please fill in all required fields." };
  }

  const requirements = requirementsText
    ? requirementsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const res = await adminApi.classworks.create({
    lessonId,
    title,
    instructions,
    starterCode,
    requirements,
    orderIndex,
  });
  if (!res.ok) return { ok: false as const, message: res.message };

  revalidatePath("/admin/classworks");
  return { ok: true as const, message: "Classwork created." };
}

export async function updateClasswork(id: string, formData: FormData) {
  const patch: Record<string, unknown> = {};
  const title = pick(formData, "title");
  const instructions = pick(formData, "instructions");
  const starterCode = String(formData.get("starterCode") ?? "");
  const requirementsText = String(formData.get("requirements") ?? "").trim();
  const orderIndexRaw = pick(formData, "orderIndex");

  if (title) patch.title = title;
  if (instructions) patch.instructions = instructions;
  patch.starterCode = starterCode;
  if (requirementsText) {
    patch.requirements = requirementsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (orderIndexRaw) patch.orderIndex = Number(orderIndexRaw);

  const res = await adminApi.classworks.update(id, patch);
  if (!res.ok) return { ok: false as const, message: res.message };

  revalidatePath("/admin/classworks");
  return { ok: true as const, message: "Classwork updated." };
}

export async function deleteClasswork(id: string) {
  const res = await adminApi.classworks.remove(id);
  if (!res.ok) return { ok: false as const, message: res.message };

  revalidatePath("/admin/classworks");
  return { ok: true as const, message: "Classwork deleted." };
}

