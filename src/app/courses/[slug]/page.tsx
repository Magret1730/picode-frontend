import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCourseBySlug, getLessonsForCourse } from "@/lib/mock-data";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return notFound();

  const lessons = getLessonsForCourse(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageHeader
        title={course.title}
        description={course.description}
        actions={
          <Button variant="secondary" href="/courses">
            Back to courses
          </Button>
        }
      />

      <h2 className="mt-8 text-xl font-extrabold">Lessons</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {lessons.length === 0 ? (
          <Card>
            <p className="text-[color:var(--text-2)]">
              Lessons will appear here soon. (Mock data is partial for now.)
            </p>
          </Card>
        ) : (
          lessons.map((l) => (
            <Card key={l.id} className="flex flex-col gap-2">
              <h3 className="text-lg font-extrabold">{l.title}</h3>
              <p className="text-sm text-[color:var(--text-2)]">{l.goal}</p>
              <div className="mt-auto flex gap-2">
                <Button href={`/courses/${slug}/lessons/${l.slug}`}>Open</Button>
                {l.classworkId ? (
                  <Button variant="ghost" href={`/classworks/${l.classworkId}`}>
                    Classwork
                  </Button>
                ) : null}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

