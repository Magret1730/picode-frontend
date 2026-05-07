import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { CodePlayground } from "@/components/playground/CodePlayground";
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
        eyebrow={<Badge tone="pink">Final assignment</Badge>}
        description={assignment.instructions ?? `Final project (mock) for ${assignment.courseSlug}`}
        actions={
          <Button variant="secondary" href={`/courses/${assignment.courseSlug}`}>
            Back to course
          </Button>
        }
      />

      <div className="mt-6">
        <CodePlayground
          title="Code playground"
          instructions="Build your final page, preview it, and submit for friendly feedback."
          requirements={assignment.requirements ?? []}
          starterCode={
            assignment.starterCode ??
            `<!doctype html>\n<html>\n  <head>\n    <title>${assignment.title}</title>\n  </head>\n  <body>\n  </body>\n</html>`
          }
        />
      </div>
    </div>
  );
}

