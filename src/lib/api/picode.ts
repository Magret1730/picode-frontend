import { fetchJson } from "./client";
import type { Assignment, Classwork, Course } from "@/lib/mock-data";

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
  return await fetchJson<
    Array<{
      id: string;
      level_id: string;
      course_slug: string;
      title: string;
      slug: string;
      goal: string;
      explanation: string;
      example_code: string;
      order_index: number;
      classwork_id: string | null;
    }>
  >(
    `/courses/${encodeURIComponent(courseSlug)}/lessons`,
  );
}

export async function apiLessonById(lessonId: string) {
  return await fetchJson<{
    id: string;
    level_id: string;
    course_slug: string;
    title: string;
    slug: string;
    goal: string;
    explanation: string;
    example_code: string;
    order_index: number;
    classwork_id: string | null;
  }>(`/lessons/${encodeURIComponent(lessonId)}`);
}

export async function apiClasswork(classworkId: string) {
  const res = await fetchJson<{
    id: string;
    lesson_id: string;
    title: string;
    instructions: string;
    requirements: unknown;
    starter_code: string;
    test_config: unknown;
    order_index: number;
  }>(`/classworks/${encodeURIComponent(classworkId)}`);

  if (!res.ok) return res;
  return {
    ok: true,
    data: {
      id: res.data.id,
      lessonId: res.data.lesson_id,
      title: res.data.title,
      instructions: res.data.instructions,
      requirements: res.data.requirements as Classwork["requirements"],
      starterCode: res.data.starter_code ?? "",
    },
  };
}

export async function apiAssignment(assignmentId: string) {
  const res = await fetchJson<{
    id: string;
    level_id: string;
    title: string;
    instructions: string;
    requirements: unknown;
    starter_code: string;
    test_config: unknown;
    order_index: number;
  }>(`/assignments/${encodeURIComponent(assignmentId)}`);

  if (!res.ok) return res;
  return {
    ok: true,
    data: {
      id: res.data.id,
      // Backend doesn't currently include course slug; pages only need title/requirements/starterCode.
      courseSlug: "unknown",
      title: res.data.title,
      instructions: res.data.instructions,
      requirements: res.data.requirements as Assignment["requirements"],
      starterCode: res.data.starter_code ?? "",
    },
  };
}

export type RunTestsRequest = {
  userId: string;
  classworkId?: string;
  assignmentId?: string;
  submittedCode: string;
};

export type RunTestsResponse = {
  passed: boolean;
  results: Array<{ name: string; passed: boolean; message: string }>;
};

export async function apiRunSubmissionTests(body: RunTestsRequest) {
  return await fetchJson<RunTestsResponse>("/submissions/run-tests", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

