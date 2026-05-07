import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { mockCourses } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Student Dashboard</h1>
          <p className="mt-1 text-zinc-700">
            Pick a course and keep your streak going.
          </p>
        </div>
        <Button variant="secondary" href="/progress">
          View progress
        </Button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {mockCourses.map((c) => (
          <Card key={c.id} className="flex flex-col gap-3">
            <div>
              <h2 className="text-xl font-extrabold">{c.title}</h2>
              <p className="mt-1 text-sm text-zinc-700">{c.description}</p>
            </div>
            <div className="mt-auto">
              <Button href={`/courses/${c.slug}`}>Continue</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

