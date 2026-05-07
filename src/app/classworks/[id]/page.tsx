import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { CodePlayground } from "@/components/playground/CodePlayground";
import { getClasswork } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { apiClasswork } from "@/lib/api/picode";
import { RequireAuth } from "@/components/auth/RequireAuth";

export default async function ClassworkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const apiRes = await apiClasswork(id);
  const classwork = apiRes.ok ? apiRes.data : getClasswork(id);
  if (!classwork) return notFound();
  const offline = !apiRes.ok;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <RequireAuth />
      <PageHeader
        eyebrow={<Badge tone="blue">Classwork</Badge>}
        title={classwork.title}
        description={classwork.instructions}
        actions={
          <Button variant="secondary" href="/courses">
            Back to courses
          </Button>
        }
      />

      {offline ? (
        <div className="mt-6">
          <CodeInfoBanner />
        </div>
      ) : null}

      <div className="mt-6">
        <CodePlayground
          title="Code playground"
          instructions="Write your code, run it to preview, then submit for friendly feedback."
          requirements={classwork.requirements ?? []}
          starterCode={classwork.starterCode ?? ""}
          submission={apiRes.ok ? { classworkId: id } : undefined}
          onCompleteHref="/dashboard"
          onCompleteLabel="Continue"
        />
      </div>
    </div>
  );
}

function CodeInfoBanner() {
  return (
    <Card className="flex items-center justify-between gap-3">
      <div>
        <p className="font-semibold">Offline mode</p>
        <p className="text-sm text-muted-foreground">
          Backend API not available yet. Using mock classwork data.
        </p>
      </div>
      <Badge tone="zinc">Mock data</Badge>
    </Card>
  );
}

