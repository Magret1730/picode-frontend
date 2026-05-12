"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { useAuth } from "@/components/providers/AuthProvider";
import { adminApi, type AdminAssignmentRow } from "@/lib/admin/api";
import { AdminGuard } from "@/components/auth/AdminGuard";

function requirementsToTextarea(req: unknown): string {
  if (Array.isArray(req)) return req.map(String).join("\n");
  if (typeof req === "string") return req;
  if (req && typeof req === "object")
    return Object.values(req as any).map(String).join("\n");
  return "";
}

export default function AdminAssignmentsPage() {
  const { token, user } = useAuth();
  const isAdmin = user?.role === "admin";
  const authToken = token ?? "";

  const [rows, setRows] = useState<AdminAssignmentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  async function refresh() {
    if (!authToken || !isAdmin) return;
    setLoading(true);
    try {
      const res = await adminApi.assignments.list(authToken);
      if (!res.ok) {
        setMessage(res.message);
        setRows([]);
        return;
      }
      setRows(res.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken, isAdmin]);

  const sorted = useMemo(
    () => rows.slice().sort((a, b) => (b.updated_at > a.updated_at ? 1 : -1)),
    [rows],
  );

  async function onCreate(fd: FormData) {
    if (!authToken) return;
    const requirementsText = String(fd.get("requirements") ?? "").trim();
    const requirements = requirementsText
      ? requirementsText
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const body = {
      levelId: String(fd.get("levelId") ?? "").trim(),
      title: String(fd.get("title") ?? "").trim(),
      instructions: String(fd.get("instructions") ?? "").trim(),
      starterCode: String(fd.get("starterCode") ?? ""),
      requirements,
      orderIndex: Number(String(fd.get("orderIndex") ?? "1").trim() || 1),
    };

    if (!body.levelId || !body.title || !body.instructions) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const res = await adminApi.assignments.create(authToken, body);
    setMessage(res.ok ? "Assignment created." : res.message);
    if (res.ok) await refresh();
  }

  async function onUpdate(id: string, fd: FormData) {
    if (!authToken) return;
    const requirementsText = String(fd.get("requirements") ?? "").trim();
    const patch: Record<string, unknown> = {
      title: String(fd.get("title") ?? "").trim(),
      instructions: String(fd.get("instructions") ?? "").trim(),
      starterCode: String(fd.get("starterCode") ?? ""),
      orderIndex:
        Number(String(fd.get("orderIndex") ?? "").trim() || 0) || undefined,
    };
    if (requirementsText) {
      patch.requirements = requirementsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    const res = await adminApi.assignments.update(authToken, id, patch);
    setMessage(res.ok ? "Assignment updated." : res.message);
    if (res.ok) await refresh();
  }

  async function onDelete(id: string) {
    if (!authToken) return;
    const res = await adminApi.assignments.remove(authToken, id);
    setMessage(res.ok ? "Assignment deleted." : res.message);
    if (res.ok) await refresh();
  }

  return (
    <AdminGuard>
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageHeader
        eyebrow={<Badge tone="zinc">Admin</Badge>}
        title="Assignments"
        description="Create, edit, and delete assignments (admin only)."
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

      {message ? (
        <div className="mt-6">
          <Card>
            <p className="text-sm text-muted-foreground">{message}</p>
          </Card>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <h2 className="text-xl font-extrabold">Create assignment</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Use one requirement per line.
          </p>

          <form
            className="mt-4 grid gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              onCreate(new FormData(e.currentTarget));
              e.currentTarget.reset();
            }}
          >
            <Input name="levelId" label="Level ID" placeholder="uuid" required />
            <Input name="title" label="Title" required />
            <Textarea name="instructions" label="Instructions" rows={4} required />
            <Textarea name="requirements" label="Requirements" rows={4} />
            <Textarea name="starterCode" label="Starter code" rows={6} mono />
            <Input
              name="orderIndex"
              label="Order"
              type="number"
              required
              defaultValue="1"
            />
            <Button type="submit" disabled={!authToken || loading}>
              {loading ? "Loading..." : "Create"}
            </Button>
          </form>
        </Card>

        <div className="lg:col-span-2 grid gap-3">
          {loading ? (
            <Card>
              <p className="text-sm text-muted-foreground">Loading assignments…</p>
            </Card>
          ) : sorted.length ? (
            sorted.map((a) => (
              <Card key={a.id}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-lg font-extrabold">{a.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      <span className="font-semibold">id:</span> {a.id}
                    </p>
                  </div>
                  <Badge tone="zinc">order {a.order_index}</Badge>
                </div>

                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-semibold text-foreground">
                    Edit
                  </summary>
                  <form
                    className="mt-3 grid gap-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      onUpdate(a.id, new FormData(e.currentTarget));
                    }}
                  >
                    <Input name="title" label="Title" defaultValue={a.title} />
                    <Textarea
                      name="instructions"
                      label="Instructions"
                      rows={4}
                      defaultValue={a.instructions}
                    />
                    <Textarea
                      name="requirements"
                      label="Requirements"
                      rows={4}
                      defaultValue={requirementsToTextarea(a.requirements)}
                    />
                    <Textarea
                      name="starterCode"
                      label="Starter code"
                      rows={6}
                      mono
                      defaultValue={a.starter_code}
                    />
                    <Input
                      name="orderIndex"
                      label="Order"
                      type="number"
                      defaultValue={String(a.order_index)}
                    />
                    <div className="flex flex-wrap gap-2">
                      <Button type="submit" disabled={!authToken}>
                        Save changes
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => onDelete(a.id)}
                        disabled={!authToken}
                      >
                        Delete
                      </Button>
                    </div>
                  </form>
                </details>
              </Card>
            ))
          ) : (
            <Card>
              <p className="font-semibold">No assignments yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Create your first assignment using the form.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
    </AdminGuard>
  );
}

function Input({
  name,
  label,
  placeholder,
  required,
  type,
  defaultValue,
}: {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-semibold">{label}</span>
      <input
        name={name}
        required={required}
        type={type ?? "text"}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full rounded-2xl border border-border bg-card px-3 py-2"
      />
    </label>
  );
}

function Textarea({
  name,
  label,
  rows,
  required,
  mono,
  defaultValue,
}: {
  name: string;
  label: string;
  rows: number;
  required?: boolean;
  mono?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-semibold">{label}</span>
      <textarea
        name={name}
        required={required}
        rows={rows}
        defaultValue={defaultValue}
        className={[
          "w-full rounded-2xl border border-border bg-card px-3 py-2",
          mono ? "font-mono text-xs" : "",
        ].join(" ")}
      />
    </label>
  );
}

