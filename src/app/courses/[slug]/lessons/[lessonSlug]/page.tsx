import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { getLesson } from "@/lib/mock-data";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}) {
  const { slug, lessonSlug } = await params;
  const lesson = getLesson(slug, lessonSlug);
  if (!lesson) return notFound();

  return (
    <ProtectedRoute>
    <div className="mx-auto max-w-4xl px-4 py-10">
      <PageHeader
        title={lesson.title}
        description={lesson.goal}
        actions={
          <Button variant="secondary" href={`/courses/${slug}`}>
            Back to course
          </Button>
        }
      />

      <Card className="mt-6">
        <h2 className="text-xl font-extrabold">Explanation</h2>
        <p className="mt-2 text-[color:var(--text-2)]">{lesson.explanation}</p>

        {lesson.exampleCode ? (
          <>
            <h3 className="mt-6 text-lg font-extrabold">Example</h3>
            <pre className="mt-2 overflow-auto rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-4 text-sm text-[color:var(--text)]">
              <code>{lesson.exampleCode}</code>
            </pre>
          </>
        ) : null}

        <div className="mt-6 flex gap-2">
          {lesson.classworkId ? (
            <Button href={`/classworks/${lesson.classworkId}`}>
              Do the classwork
            </Button>
          ) : null}
          <Button variant="ghost" href="/progress">
            Check progress
          </Button>
        </div>
      </Card>
    </div>
    </ProtectedRoute>
  );
}

