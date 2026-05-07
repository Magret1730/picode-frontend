"use client";

import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { AdminClassworkRow } from "@/lib/admin/api";
import { createClasswork, deleteClasswork, updateClasswork } from "./actions";

function requirementsToTextarea(req: unknown): string {
  if (Array.isArray(req)) return req.map(String).join("\n");
  if (typeof req === "string") return req;
  if (req && typeof req === "object") return Object.values(req as any).map(String).join("\n");
  return "";
}

export function AdminClassworksClient({
  classworks,
}: {
  classworks: AdminClassworkRow[];
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <h2 className="text-xl font-extrabold">Create classwork</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Use one requirement per line.
        </p>

        <form
          className="mt-4 grid gap-3"
          action={(fd) =>
            startTransition(async () => {
              const res = await createClasswork(fd);
              setMessage(res.message);
            })
          }
        >
          <label className="grid gap-1 text-sm">
            <span className="font-semibold">Lesson ID</span>
            <input
              name="lessonId"
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
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-semibold">Instructions</span>
            <textarea
              name="instructions"
              required
              rows={4}
              className="w-full rounded-2xl border border-border bg-card px-3 py-2"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-semibold">Requirements</span>
            <textarea
              name="requirements"
              rows={4}
              className="w-full rounded-2xl border border-border bg-card px-3 py-2"
              placeholder="Add one per line"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-semibold">Starter code</span>
            <textarea
              name="starterCode"
              rows={6}
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
        {classworks.length ? (
          classworks.map((cw) => (
            <Card key={cw.id}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-lg font-extrabold">{cw.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    <span className="font-semibold">id:</span> {cw.id}
                  </p>
                </div>
                <Badge tone="zinc">order {cw.order_index}</Badge>
              </div>

              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-semibold text-foreground">
                  Edit
                </summary>
                <form
                  className="mt-3 grid gap-3"
                  action={(fd) =>
                    startTransition(async () => {
                      const res = await updateClasswork(cw.id, fd);
                      setMessage(res.message);
                    })
                  }
                >
                  <label className="grid gap-1 text-sm">
                    <span className="font-semibold">Title</span>
                    <input
                      name="title"
                      defaultValue={cw.title}
                      className="w-full rounded-2xl border border-border bg-card px-3 py-2"
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span className="font-semibold">Instructions</span>
                    <textarea
                      name="instructions"
                      defaultValue={cw.instructions}
                      rows={4}
                      className="w-full rounded-2xl border border-border bg-card px-3 py-2"
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span className="font-semibold">Requirements</span>
                    <textarea
                      name="requirements"
                      defaultValue={requirementsToTextarea(cw.requirements)}
                      rows={4}
                      className="w-full rounded-2xl border border-border bg-card px-3 py-2"
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span className="font-semibold">Starter code</span>
                    <textarea
                      name="starterCode"
                      defaultValue={cw.starter_code}
                      rows={6}
                      className="w-full rounded-2xl border border-border bg-card px-3 py-2 font-mono text-xs"
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span className="font-semibold">Order</span>
                    <input
                      name="orderIndex"
                      defaultValue={cw.order_index}
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
                          const res = await deleteClasswork(cw.id);
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
            <p className="font-semibold">No classworks yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Create your first classwork using the form.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

