"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { RequireAdmin } from "@/components/auth/RequireAdmin";

export default function AdminHomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <RequireAdmin />
      <PageHeader
        eyebrow={<Badge tone="zinc">Admin</Badge>}
        title="Admin"
        description="MVP content tools for lessons, classworks, and assignments."
        actions={
          <Button variant="secondary" href="/dashboard">
            Back to app
          </Button>
        }
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <h2 className="text-xl font-extrabold">Lessons</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Create, edit, and delete lessons.
          </p>
          <div className="mt-4">
            <Button href="/admin/lessons">Manage lessons</Button>
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-extrabold">Classworks</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Edit classwork instructions and starter code.
          </p>
          <div className="mt-4">
            <Button href="/admin/classworks">Manage classworks</Button>
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-extrabold">Assignments</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage final assignments and test configs.
          </p>
          <div className="mt-4">
            <Button href="/admin/assignments">Manage assignments</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

