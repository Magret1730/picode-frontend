import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { getLessonById, getNextLesson } from "@/lib/mock-data";
import { apiLessonById } from "@/lib/api/picode";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default async function LessonByIdPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const apiRes = await apiLessonById(lessonId);
  const lesson = apiRes.ok
    ? {
        id: apiRes.data.id,
        courseSlug: apiRes.data.course_slug,
        slug: apiRes.data.slug,
        title: apiRes.data.title,
        orderIndex: apiRes.data.order_index,
        goal: apiRes.data.goal,
        explanation: apiRes.data.explanation,
        exampleCode: apiRes.data.example_code,
        classworkId: apiRes.data.classwork_id ?? undefined,
      }
    : getLessonById(lessonId);
  if (!lesson) return notFound();

  const next = getNextLesson(lessonId);
  const offline = !apiRes.ok;

  return (
    <ProtectedRoute>
    <div className="mx-auto max-w-4xl px-4 py-10">
      <PageHeader
        eyebrow={<Badge tone="blue">Lesson</Badge>}
        title={lesson.title}
        description={lesson.goal}
        actions={
          <Button variant="secondary" href={`/courses/${lesson.courseSlug}`}>
            Back to course
          </Button>
        }
      />

      {offline ? (
        <div className="mt-6">
          <Card className="flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold">Offline mode</p>
              <p className="text-sm text-muted-foreground">
                Backend API not available yet. Showing mock lesson content.
              </p>
            </div>
            <Badge tone="zinc">Mock data</Badge>
          </Card>
        </div>
      ) : null}

      <Card className="mt-6">
        <h2 className="text-xl font-extrabold">Goal</h2>
        <p className="mt-2 text-muted-foreground">{lesson.goal}</p>

        <h2 className="mt-6 text-xl font-extrabold">Explanation</h2>
        <p className="mt-2 text-muted-foreground">{lesson.explanation}</p>

        {lesson.exampleCode ? (
          <>
            <h2 className="mt-6 text-xl font-extrabold">Example code</h2>
            <pre className="mt-2 overflow-auto rounded-3xl border border-border bg-surface-2 p-4 text-sm text-foreground">
              <code>{lesson.exampleCode}</code>
            </pre>
          </>
        ) : null}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {lesson.classworkId ? (
              <Button href={`/classworks/${lesson.classworkId}`}>
                Do classwork
              </Button>
            ) : (
              <Button href={`/courses/${lesson.courseSlug}`}>Continue</Button>
            )}
            <Button variant="ghost" href="/progress">
              View progress
            </Button>
          </div>

          {next ? (
            <Button variant="secondary" href={`/lessons/${next.id}`}>
              Next lesson
            </Button>
          ) : (
            <Badge tone="mint">Course complete (mock)</Badge>
          )}
        </div>
      </Card>
    </div>
    </ProtectedRoute>
  );
}

