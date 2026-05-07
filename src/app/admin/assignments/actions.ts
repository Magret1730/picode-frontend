"use server";

import { revalidatePath } from "next/cache";
import { adminApi } from "@/lib/admin/api";

function pick(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export async function createAssignment(formData: FormData) {
  const levelId = pick(formData, "levelId");
  const title = pick(formData, "title");
  const instructions = pick(formData, "instructions");
  const starterCode = String(formData.get("starterCode") ?? "");
  const requirementsText = String(formData.get("requirements") ?? "").trim();
  const orderIndex = Number(pick(formData, "orderIndex") || "1");

  if (!levelId || !title || !instructions) {
    return { ok: false as const, message: "Please fill in all required fields." };
  }

  const requirements = requirementsText
    ? requirementsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const res = await adminApi.assignments.create({
    levelId,
    title,
    instructions,
    starterCode,
    requirements,
    orderIndex,
  });
  if (!res.ok) return { ok: false as const, message: res.message };

  revalidatePath("/admin/assignments");
  return { ok: true as const, message: "Assignment created." };
}

export async function updateAssignment(id: string, formData: FormData) {
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

  const res = await adminApi.assignments.update(id, patch);
  if (!res.ok) return { ok: false as const, message: res.message };

  revalidatePath("/admin/assignments");
  return { ok: true as const, message: "Assignment updated." };
}

export async function deleteAssignment(id: string) {
  const res = await adminApi.assignments.remove(id);
  if (!res.ok) return { ok: false as const, message: res.message };

  revalidatePath("/admin/assignments");
  return { ok: true as const, message: "Assignment deleted." };
}

