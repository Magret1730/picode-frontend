"use client";

import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { AdminAssignmentRow } from "@/lib/admin/api";
import { createAssignment, deleteAssignment, updateAssignment } from "./actions";

function requirementsToTextarea(req: unknown): string {
  if (Array.isArray(req)) return req.map(String).join("\n");
  if (typeof req === "string") return req;
  if (req && typeof req === "object")
    return Object.values(req as any).map(String).join("\n");
  return "";
}

export function AdminAssignmentsClient({
  assignments,
}: {
  assignments: AdminAssignmentRow[];
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <h2 className="text-xl font-extrabold">Create assignment</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Use one requirement per line.
        </p>

        <form
          className="mt-4 grid gap-3"
          action={(fd) =>
            startTransition(async () => {
              const res = await createAssignment(fd);
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
        {assignments.length ? (
          assignments.map((a) => (
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
                  action={(fd) =>
                    startTransition(async () => {
                      const res = await updateAssignment(a.id, fd);
                      setMessage(res.message);
                    })
                  }
                >
                  <label className="grid gap-1 text-sm">
                    <span className="font-semibold">Title</span>
                    <input
                      name="title"
                      defaultValue={a.title}
                      className="w-full rounded-2xl border border-border bg-card px-3 py-2"
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span className="font-semibold">Instructions</span>
                    <textarea
                      name="instructions"
                      defaultValue={a.instructions}
                      rows={4}
                      className="w-full rounded-2xl border border-border bg-card px-3 py-2"
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span className="font-semibold">Requirements</span>
                    <textarea
                      name="requirements"
                      defaultValue={requirementsToTextarea(a.requirements)}
                      rows={4}
                      className="w-full rounded-2xl border border-border bg-card px-3 py-2"
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span className="font-semibold">Starter code</span>
                    <textarea
                      name="starterCode"
                      defaultValue={a.starter_code}
                      rows={6}
                      className="w-full rounded-2xl border border-border bg-card px-3 py-2 font-mono text-xs"
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span className="font-semibold">Order</span>
                    <input
                      name="orderIndex"
                      defaultValue={a.order_index}
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
                          const res = await deleteAssignment(a.id);
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
            <p className="font-semibold">No assignments yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Create your first assignment using the form.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

