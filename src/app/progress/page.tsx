import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { mockCourses } from "@/lib/mock-data";

export default function ProgressPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageHeader
        title="Progress"
        description="Your XP and badges will show here (mock for now)."
        actions={
          <Button variant="secondary" href="/dashboard">
            Back to dashboard
          </Button>
        }
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {mockCourses.map((c) => (
          <Card key={c.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold">{c.title}</h2>
                <p className="mt-1 text-sm text-[color:var(--text-2)]">
                  {c.description}
                </p>
              </div>
              <span className="rounded-full bg-[color:var(--brand-green)]/15 px-3 py-1 text-sm font-extrabold text-[color:var(--text)] ring-1 ring-[color:var(--border)]/70">
                XP: 0
              </span>
            </div>
            <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-[color:var(--surface-2)]">
              <div className="h-full w-[10%] rounded-full bg-[color:var(--brand-blue)]" />
            </div>
            <p className="mt-2 text-sm text-[color:var(--text-2)]">
              10% complete (mock)
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

