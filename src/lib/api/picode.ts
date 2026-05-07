import { fetchJson } from "./client";
import type { Assignment, Classwork, Course, Lesson } from "@/lib/mock-data";

// These match the DB shape loosely. If an endpoint isn't implemented (404),
// callers should fall back to mock data.
export async function apiHealth() {
  return await fetchJson<{ ok: boolean; db: "up" | "down"; durationMs: number }>(
    "/health",
  );
}

export async function apiCourses() {
  return await fetchJson<Course[]>("/courses");
}

export async function apiCourse(slug: string) {
  return await fetchJson<Course>(`/courses/${encodeURIComponent(slug)}`);
}

export async function apiLessonsForCourse(courseSlug: string) {
  return await fetchJson<Lesson[]>(
    `/courses/${encodeURIComponent(courseSlug)}/lessons`,
  );
}

export async function apiLessonById(lessonId: string) {
  return await fetchJson<Lesson>(`/lessons/${encodeURIComponent(lessonId)}`);
}

export async function apiClasswork(classworkId: string) {
  return await fetchJson<Classwork>(
    `/classworks/${encodeURIComponent(classworkId)}`,
  );
}

export async function apiAssignment(assignmentId: string) {
  return await fetchJson<Assignment>(
    `/assignments/${encodeURIComponent(assignmentId)}`,
  );
}

