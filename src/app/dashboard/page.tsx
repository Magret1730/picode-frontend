import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { mockCourses } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageHeader
        eyebrow={<Badge tone="mint">Welcome back</Badge>}
        title="Student Dashboard"
        description="Pick a course, earn XP, and keep your streak going."
        actions={
          <>
            <Badge tone="yellow">XP: 0</Badge>
            <Button variant="secondary" href="/progress">
              View progress
            </Button>
          </>
        }
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {mockCourses.map((c) => (
          <Card key={c.id} className="flex flex-col gap-3">
            <div>
              <h2 className="text-xl font-extrabold">{c.title}</h2>
              <p className="mt-1 text-sm text-[color:var(--text-2)]">
                {c.description}
              </p>
            </div>
            <div className="mt-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-4">
              <ProgressBar value={10} label="Course progress" />
              <p className="mt-2 text-xs text-[color:var(--text-2)]">
                Keep going — one small win at a time.
              </p>
            </div>
            <div className="mt-auto">
              <Button href={`/courses/${c.slug}`}>Continue</Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold">No submissions yet</h2>
            <p className="mt-1 text-[color:var(--text-2)]">
              Try a classwork to see your results and friendly feedback here.
            </p>
          </div>
          <Button href="/courses">Start a lesson</Button>
        </div>
      </Card>
    </div>
  );
}

