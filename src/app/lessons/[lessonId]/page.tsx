import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { getLessonById, getNextLesson } from "@/lib/mock-data";

export default async function LessonByIdPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = getLessonById(lessonId);
  if (!lesson) return notFound();

  const next = getNextLesson(lessonId);

  return (
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
  );
}

