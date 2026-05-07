import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { mockCourses } from "@/lib/mock-data";

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageHeader
        title="Courses"
        description="Choose your adventure. Start with HTML, then add CSS magic."
        actions={<Button variant="secondary" href="/dashboard">Dashboard</Button>}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockCourses.map((c) => (
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
      </div>
    </div>
  );
}

