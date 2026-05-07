import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { mockCourses } from "@/lib/mock-data";

export default function ProgressPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Progress</h1>
          <p className="mt-1 text-zinc-700">
            Your XP and badges will show here (mock for now).
          </p>
        </div>
        <Button variant="secondary" href="/dashboard">
          Back to dashboard
        </Button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {mockCourses.map((c) => (
          <Card key={c.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold">{c.title}</h2>
                <p className="mt-1 text-sm text-zinc-700">{c.description}</p>
              </div>
              <span className="rounded-full bg-[color:var(--picode-mint)]/20 px-3 py-1 text-sm font-bold text-zinc-900">
                XP: 0
              </span>
            </div>
            <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-zinc-100">
              <div className="h-full w-[10%] rounded-full bg-[color:var(--picode-blue)]" />
            </div>
            <p className="mt-2 text-sm text-zinc-600">10% complete (mock)</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

