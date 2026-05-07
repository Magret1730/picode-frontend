import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getLesson } from "@/lib/mock-data";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}) {
  const { slug, lessonSlug } = await params;
  const lesson = getLesson(slug, lessonSlug);
  if (!lesson) return notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">{lesson.title}</h1>
          <p className="mt-1 text-zinc-700">{lesson.goal}</p>
        </div>
        <Button variant="secondary" href={`/courses/${slug}`}>
          Back to course
        </Button>
      </div>

      <Card className="mt-6">
        <h2 className="text-xl font-extrabold">Explanation</h2>
        <p className="mt-2 text-zinc-700">{lesson.explanation}</p>

        {lesson.exampleCode ? (
          <>
            <h3 className="mt-6 text-lg font-extrabold">Example</h3>
            <pre className="mt-2 overflow-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm">
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
  );
}

