import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { adminApi } from "@/lib/admin/api";
import { AdminLessonsClient } from "./AdminLessonsClient";

export default async function AdminLessonsPage() {
  const res = await adminApi.lessons.list();
  const lessons = res.ok ? res.data : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageHeader
        eyebrow={<Badge tone="zinc">Admin</Badge>}
        title="Lessons"
        description="Create, edit, and delete lessons (MVP)."
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
            <p className="font-semibold">Couldn’t load lessons</p>
            <p className="mt-1 text-sm text-muted-foreground">{res.message}</p>
            <p className="mt-3 text-xs text-muted-foreground">
              Tip: set `ADMIN_KEY` on the frontend server, and ensure the backend
              is running.
            </p>
          </Card>
        </div>
      ) : null}

      <div className="mt-6">
        <AdminLessonsClient lessons={lessons} />
      </div>
    </div>
  );
}

