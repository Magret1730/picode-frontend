"use client";

import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { AdminLessonRow } from "@/lib/admin/api";
import { createLesson, deleteLesson, updateLesson } from "./actions";

export function AdminLessonsClient({ lessons }: { lessons: AdminLessonRow[] }) {
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <h2 className="text-xl font-extrabold">Create lesson</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Required fields only for MVP.
        </p>

        <form
          className="mt-4 grid gap-3"
          action={(fd) =>
            startTransition(async () => {
              const res = await createLesson(fd);
              setMessage(res.message);
            })
          }
        >
          <label className="grid gap-1 text-sm">
            <span className="font-semibold">Level ID</span>
            <input
              name="levelId"
              required
              className="w-full rounded-2xl border border-border bg-card px-3 py-2"
              placeholder="uuid"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-semibold">Title</span>
            <input
              name="title"
              required
              className="w-full rounded-2xl border border-border bg-card px-3 py-2"
              placeholder="What is HTML?"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-semibold">Slug</span>
            <input
              name="slug"
              required
              className="w-full rounded-2xl border border-border bg-card px-3 py-2"
              placeholder="what-is-html"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-semibold">Goal</span>
            <input
              name="goal"
              required
              className="w-full rounded-2xl border border-border bg-card px-3 py-2"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-semibold">Explanation</span>
            <textarea
              name="explanation"
              required
              rows={4}
              className="w-full rounded-2xl border border-border bg-card px-3 py-2"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-semibold">Example code (optional)</span>
            <textarea
              name="exampleCode"
              rows={4}
              className="w-full rounded-2xl border border-border bg-card px-3 py-2 font-mono text-xs"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-semibold">Order</span>
            <input
              name="orderIndex"
              required
              type="number"
              min={1}
              defaultValue={1}
              className="w-full rounded-2xl border border-border bg-card px-3 py-2"
            />
          </label>

          <Button disabled={pending} type="submit">
            {pending ? "Saving..." : "Create"}
          </Button>

          {message ? (
            <p className="text-sm text-muted-foreground">{message}</p>
          ) : null}
        </form>
      </Card>

      <div className="lg:col-span-2 grid gap-3">
        {lessons.length ? (
          lessons.map((l) => (
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
                  action={(fd) =>
                    startTransition(async () => {
                      const res = await updateLesson(l.id, fd);
                      setMessage(res.message);
                    })
                  }
                >
                  <label className="grid gap-1 text-sm">
                    <span className="font-semibold">Title</span>
                    <input
                      name="title"
                      defaultValue={l.title}
                      className="w-full rounded-2xl border border-border bg-card px-3 py-2"
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span className="font-semibold">Slug</span>
                    <input
                      name="slug"
                      defaultValue={l.slug}
                      className="w-full rounded-2xl border border-border bg-card px-3 py-2"
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span className="font-semibold">Goal</span>
                    <input
                      name="goal"
                      defaultValue={l.goal}
                      className="w-full rounded-2xl border border-border bg-card px-3 py-2"
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span className="font-semibold">Explanation</span>
                    <textarea
                      name="explanation"
                      defaultValue={l.explanation}
                      rows={4}
                      className="w-full rounded-2xl border border-border bg-card px-3 py-2"
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span className="font-semibold">Example code</span>
                    <textarea
                      name="exampleCode"
                      defaultValue={l.example_code}
                      rows={4}
                      className="w-full rounded-2xl border border-border bg-card px-3 py-2 font-mono text-xs"
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span className="font-semibold">Order</span>
                    <input
                      name="orderIndex"
                      defaultValue={l.order_index}
                      type="number"
                      min={1}
                      className="w-full rounded-2xl border border-border bg-card px-3 py-2"
                    />
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <Button disabled={pending} type="submit">
                      {pending ? "Saving..." : "Save changes"}
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      disabled={pending}
                      onClick={() =>
                        startTransition(async () => {
                          const res = await deleteLesson(l.id);
                          setMessage(res.message);
                        })
                      }
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
  );
}

