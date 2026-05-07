import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAssignment } from "@/lib/mock-data";

export default async function AssignmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const assignment = getAssignment(id);
  if (!assignment) return notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <PageHeader
        title={assignment.title}
        description={`Final project (mock) for ${assignment.courseSlug}`}
        actions={
          <Button variant="secondary" href={`/courses/${assignment.courseSlug}`}>
            Back to course
          </Button>
        }
      />

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="text-xl font-extrabold">Your mission</h2>
          <p className="mt-2 text-muted-foreground">
            Build your page and make it awesome. When you’re ready, run the
            checks.
          </p>
          <ul className="mt-4 list-disc pl-5 text-sm text-muted-foreground">
            <li>Use headings and paragraphs</li>
            <li>Add images (with alt text)</li>
            <li>Use links and lists when needed</li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-xl font-extrabold">Code</h2>
          <textarea
            className="mt-3 h-64 w-full rounded-3xl border border-border bg-surface-2 p-3 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-[color:var(--brand-blue)]"
            defaultValue={`<!doctype html>\n<html>\n  <head>\n    <title>${assignment.title}</title>\n  </head>\n  <body>\n  </body>\n</html>`}
          />
          <div className="mt-3 flex gap-2">
            <Button>Run checks (mock)</Button>
            <Button variant="ghost" href="/progress">
              View progress
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

