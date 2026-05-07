import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  getAssignmentsForCourse,
  getCourseBySlug,
  getLessonsForCourse,
} from "@/lib/mock-data";
import { apiCourse, apiLessonsForCourse } from "@/lib/api/picode";
import { RequireAuth } from "@/components/auth/RequireAuth";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const apiCourseRes = await apiCourse(slug);
  const apiLessonsRes = await apiLessonsForCourse(slug);

  const course = apiCourseRes.ok ? apiCourseRes.data : getCourseBySlug(slug);
  if (!course) return notFound();

  const lessons = apiLessonsRes.ok
    ? apiLessonsRes.data.map((l) => ({
        id: l.id,
        courseSlug: slug,
        slug: l.slug,
        title: l.title,
        orderIndex: l.order_index,
        goal: l.goal,
        explanation: l.explanation,
        exampleCode: l.example_code,
        classworkId: l.classwork_id ?? undefined,
      }))
    : getLessonsForCourse(slug);
  const assignments = getAssignmentsForCourse(slug);
  const progress = slug === "html-beginner" ? 35 : slug === "css-beginner" ? 10 : 0;
  const firstLesson = lessons[0];
  const offline = !apiCourseRes.ok || !apiLessonsRes.ok;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <RequireAuth />
      <PageHeader
        title={course.title}
        description={course.description}
        actions={
          <div className="flex gap-2">
            {firstLesson ? (
              <Button href={`/lessons/${firstLesson.id}`}>
                {progress > 0 ? "Continue" : "Start"}
              </Button>
            ) : null}
            <Button variant="secondary" href="/courses">
              Back to courses
            </Button>
          </div>
        }
      />

      {offline ? (
        <div className="mt-6">
          <Card className="flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold">Offline mode</p>
              <p className="text-sm text-muted-foreground">
                Backend API not available yet. Showing mock course content.
              </p>
            </div>
            <Badge tone="zinc">Mock data</Badge>
          </Card>
        </div>
      ) : null}

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="mint">Beginner</Badge>
            <Badge tone="yellow">Course</Badge>
          </div>
          <h2 className="mt-3 text-2xl font-extrabold">Your progress</h2>
          <p className="mt-1 text-muted-foreground">
            Keep going — one small win at a time.
          </p>
          <div className="mt-5 rounded-3xl border border-border bg-surface-2 p-5">
            <ProgressBar value={progress} label="Progress" />
            <p className="mt-2 text-xs text-muted-foreground">
              Finish lessons and classworks to increase your progress.
            </p>
          </div>
        </Card>

        <Card>
          <Badge tone="pink">Assignments</Badge>
          <h2 className="mt-3 text-2xl font-extrabold">Final projects</h2>
          <p className="mt-1 text-muted-foreground">
            Show what you learned with a bigger build.
          </p>
          <div className="mt-4 grid gap-2">
            {assignments.map((a) => (
              <Link
                key={a.id}
                href={`/assignments/${a.id}`}
                className="rounded-3xl border border-border bg-surface-2 p-4 transition hover:brightness-95"
              >
                <p className="font-semibold">{a.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Final assignment (mock)
                </p>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <h2 className="mt-10 text-2xl font-extrabold">Lessons</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {lessons.length === 0 ? (
          <Card>
            <p className="text-muted-foreground">
              Lessons will appear here soon. (Mock data is partial for now.)
            </p>
          </Card>
        ) : (
          lessons.map((l) => (
            <Card key={l.id} className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-extrabold">{l.title}</h3>
                <Badge tone="zinc">#{l.orderIndex}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{l.goal}</p>
              <div className="mt-auto flex flex-wrap gap-2">
                <Button href={`/lessons/${l.id}`}>Open lesson</Button>
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

