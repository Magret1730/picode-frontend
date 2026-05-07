import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";

export default async function ClassworkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <PageHeader
        title="Classwork"
        description={`ID: ${id} (mock)`}
        actions={
          <Button variant="secondary" href="/courses">
            Back to courses
          </Button>
        }
      />

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="text-xl font-extrabold">Instructions</h2>
          <p className="mt-2 text-muted-foreground">
            Write your code on the right, then run checks.
          </p>
          <ul className="mt-4 list-disc pl-5 text-sm text-muted-foreground">
            <li>Add the required elements</li>
            <li>Make sure text isn’t empty</li>
            <li>For images, include alt text</li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-xl font-extrabold">Code</h2>
          <textarea
            className="mt-3 h-64 w-full rounded-3xl border border-border bg-surface-2 p-3 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-[color:var(--brand-blue)]"
            defaultValue={`<!doctype html>\n<html>\n  <head>\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello!</h1>\n  </body>\n</html>`}
          />
          <div className="mt-3 flex gap-2">
            <Button>Run checks (mock)</Button>
            <Button variant="ghost" href="/progress">
              Save progress (mock)
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

