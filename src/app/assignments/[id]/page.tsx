import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { CodePlayground } from "@/components/playground/CodePlayground";
import { getAssignment } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { apiAssignment } from "@/lib/api/picode";
import { RequireAuth } from "@/components/auth/RequireAuth";

export default async function AssignmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const apiRes = await apiAssignment(id);
  const assignment = apiRes.ok ? apiRes.data : getAssignment(id);
  if (!assignment) return notFound();
  const offline = !apiRes.ok;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <RequireAuth />
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

      {offline ? (
        <div className="mt-6">
          <Card className="flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold">Offline mode</p>
              <p className="text-sm text-muted-foreground">
                Backend API not available yet. Using mock assignment data.
              </p>
            </div>
            <Badge tone="zinc">Mock data</Badge>
          </Card>
        </div>
      ) : null}

      <div className="mt-6">
        <CodePlayground
          title="Code playground"
          instructions="Build your final page, preview it, and submit for friendly feedback."
          requirements={assignment.requirements ?? []}
          starterCode={
            assignment.starterCode ??
            `<!doctype html>\n<html>\n  <head>\n    <title>${assignment.title}</title>\n  </head>\n  <body>\n  </body>\n</html>`
          }
          submission={apiRes.ok ? { assignmentId: id } : undefined}
          onCompleteHref="/dashboard"
          onCompleteLabel="Back to dashboard"
        />
      </div>
    </div>
  );
}

