import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { mockCourses } from "@/lib/mock-data";
import { apiCourses } from "@/lib/api/picode";
import { Badge } from "@/components/ui/Badge";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ProtectedHrefButton } from "@/components/auth/ProtectedHrefButton";

export default function CoursesPage() {
  // Server component: try API first, fall back to mock.
  // If backend endpoints aren't implemented yet (404/offline), UI still works.
  const coursesPromise = apiCourses();

  return (
    <ProtectedRoute>
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageHeader
        title="Courses"
        description="Choose your adventure. Start with HTML, then add CSS magic."
        actions={<ProtectedHrefButton variant="secondary" href="/dashboard">Dashboard</ProtectedHrefButton>}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <CoursesGrid coursesPromise={coursesPromise} />
      </div>
    </div>
    </ProtectedRoute>
  );
}

async function CoursesGrid({
  coursesPromise,
}: {
  coursesPromise: ReturnType<typeof apiCourses>;
}) {
  const res = await coursesPromise;
  const offline = !res.ok;
  const courses = res.ok && Array.isArray(res.data) ? res.data : mockCourses;

  return (
    <>
      {offline ? (
        <div className="lg:col-span-3">
          <Card className="flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold">Offline mode</p>
              <p className="text-sm text-muted-foreground">
                Backend API not available yet. Showing mock courses.
              </p>
            </div>
            <Badge tone="zinc">Mock data</Badge>
          </Card>
        </div>
      ) : null}

      {courses.map((c) => (
          <Card key={c.id} className="flex flex-col gap-3">
            <h2 className="text-xl font-extrabold">{c.title}</h2>
            <p className="text-sm text-[color:var(--text-2)]">{c.description}</p>
            <div className="mt-2 rounded-3xl border border-border bg-surface-2 p-4">
              <ProgressBar
                value={c.slug === "html-beginner" ? 35 : 10}
                label="Progress"
              />
            </div>
            <div className="mt-auto">
              <Button href={`/courses/${c.slug}`}>Open</Button>
            </div>
          </Card>
        ))}
    </>
  );
}

