"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { useAuth } from "@/components/providers/AuthProvider";
import { adminApi, type AdminLessonRow } from "@/lib/admin/api";

export default function AdminLessonsPageClient() {
  const { token, user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [lessons, setLessons] = useState<AdminLessonRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const authToken = token ?? "";

  async function refresh() {
    if (!authToken || !isAdmin) return;
    setLoading(true);
    try {
      const res = await adminApi.lessons.list(authToken);
      if (!res.ok) {
        setMessage(res.message);
        setLessons([]);
        return;
      }
      setLessons(res.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken, isAdmin]);

  const sorted = useMemo(
    () => lessons.slice().sort((a, b) => (b.updated_at > a.updated_at ? 1 : -1)),
    [lessons],
  );

  async function onCreate(fd: FormData) {
    if (!authToken) return;
    const body = {
      levelId: String(fd.get("levelId") ?? "").trim(),
      title: String(fd.get("title") ?? "").trim(),
      slug: String(fd.get("slug") ?? "").trim(),
      goal: String(fd.get("goal") ?? "").trim(),
      explanation: String(fd.get("explanation") ?? "").trim(),
      exampleCode: String(fd.get("exampleCode") ?? ""),
      orderIndex: Number(String(fd.get("orderIndex") ?? "1").trim() || 1),
    };

    if (!body.levelId || !body.title || !body.slug || !body.goal || !body.explanation) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const res = await adminApi.lessons.create(authToken, body);
    setMessage(res.ok ? "Lesson created." : res.message);
    if (res.ok) await refresh();
  }

  async function onUpdate(id: string, fd: FormData) {
    if (!authToken) return;
    const patch: Record<string, unknown> = {
      title: String(fd.get("title") ?? "").trim(),
      slug: String(fd.get("slug") ?? "").trim(),
      goal: String(fd.get("goal") ?? "").trim(),
      explanation: String(fd.get("explanation") ?? "").trim(),
      exampleCode: String(fd.get("exampleCode") ?? ""),
      orderIndex: Number(String(fd.get("orderIndex") ?? "").trim() || 0) || undefined,
    };

    const res = await adminApi.lessons.update(authToken, id, patch);
    setMessage(res.ok ? "Lesson updated." : res.message);
    if (res.ok) await refresh();
  }

  async function onDelete(id: string) {
    if (!authToken) return;
    const res = await adminApi.lessons.remove(authToken, id);
    setMessage(res.ok ? "Lesson deleted." : res.message);
    if (res.ok) await refresh();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageHeader
        eyebrow={<Badge tone="zinc">Admin</Badge>}
        title="Lessons"
        description="Create, edit, and delete lessons (admin only)."
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
          <h2 className="text-xl font-extrabold">Create lesson</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Required fields only for MVP.
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
            <Input name="slug" label="Slug" placeholder="what-is-html" required />
            <Input name="goal" label="Goal" required />
            <Textarea name="explanation" label="Explanation" rows={4} required />
            <Textarea
              name="exampleCode"
              label="Example code (optional)"
              rows={4}
              mono
            />
            <Input name="orderIndex" label="Order" type="number" required defaultValue="1" />
            <Button type="submit" disabled={!authToken || loading}>
              {loading ? "Loading..." : "Create"}
            </Button>
          </form>
        </Card>

        <div className="lg:col-span-2 grid gap-3">
          {loading ? (
            <Card>
              <p className="text-sm text-muted-foreground">Loading lessons…</p>
            </Card>
          ) : sorted.length ? (
            sorted.map((l) => (
              <Card key={l.id}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-lg font-extrabold">{l.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      <span className="font-semibold">id:</span> {l.id}
                    </p>
                  </div>
                  <Badge tone="zinc">order {l.order_index}</Badge>
                </div>

                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-semibold text-foreground">
                    Edit
                  </summary>
                  <form
                    className="mt-3 grid gap-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      onUpdate(l.id, new FormData(e.currentTarget));
                    }}
                  >
                    <Input name="title" label="Title" defaultValue={l.title} />
                    <Input name="slug" label="Slug" defaultValue={l.slug} />
                    <Input name="goal" label="Goal" defaultValue={l.goal} />
                    <Textarea
                      name="explanation"
                      label="Explanation"
                      rows={4}
                      defaultValue={l.explanation}
                    />
                    <Textarea
                      name="exampleCode"
                      label="Example code"
                      rows={4}
                      mono
                      defaultValue={l.example_code}
                    />
                    <Input
                      name="orderIndex"
                      label="Order"
                      type="number"
                      defaultValue={String(l.order_index)}
                    />
                    <div className="flex flex-wrap gap-2">
                      <Button type="submit" disabled={!authToken}>
                        Save changes
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => onDelete(l.id)}
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
              <p className="font-semibold">No lessons yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Create your first lesson using the form.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
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

