import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { mockCourses } from "@/lib/mock-data";

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">Courses</h1>
      <p className="mt-1 text-zinc-700">
        Choose your adventure. Start with HTML, then add CSS magic.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockCourses.map((c) => (
          <Card key={c.id} className="flex flex-col gap-3">
            <h2 className="text-xl font-extrabold">{c.title}</h2>
            <p className="text-sm text-zinc-700">{c.description}</p>
            <div className="mt-auto">
              <Button href={`/courses/${c.slug}`}>Open</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

