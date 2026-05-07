import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { CodePlayground } from "@/components/playground/CodePlayground";
import { getClasswork } from "@/lib/mock-data";
import { notFound } from "next/navigation";

export default async function ClassworkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const classwork = getClasswork(id);
  if (!classwork) return notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
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

      <div className="mt-6">
        <CodePlayground
          title="Code playground"
          instructions="Write your code, run it to preview, then submit for friendly feedback."
          requirements={classwork.requirements}
          starterCode={classwork.starterCode}
        />
      </div>
    </div>
  );
}

