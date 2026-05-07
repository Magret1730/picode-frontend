import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { adminApi } from "@/lib/admin/api";
import { AdminClassworksClient } from "./AdminClassworksClient";

export default async function AdminClassworksPage() {
  const res = await adminApi.classworks.list();
  const classworks = res.ok ? res.data : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageHeader
        eyebrow={<Badge tone="zinc">Admin</Badge>}
        title="Classworks"
        description="Create, edit, and delete classworks (MVP)."
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" href="/admin">
              Back to admin
            </Button>
            <Button variant="ghost" href="/dashboard">
              Back to app
            </Button>
          </div>
        }
      />

      {!res.ok ? (
        <div className="mt-6">
          <Card>
            <p className="font-semibold">Couldn’t load classworks</p>
            <p className="mt-1 text-sm text-muted-foreground">{res.message}</p>
          </Card>
        </div>
      ) : null}

      <div className="mt-6">
        <AdminClassworksClient classworks={classworks} />
      </div>
    </div>
  );
}

