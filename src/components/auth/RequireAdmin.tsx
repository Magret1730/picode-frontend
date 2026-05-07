"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/components/providers/AuthProvider";

export function RequireAdmin() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(pathname || "/admin")}`);
      return;
    }
    if (user.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [loading, user, router, pathname]);

  if (loading) return null;
  if (!user) return null;
  if (user.role !== "admin") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-extrabold">Access denied</p>
              <p className="mt-1 text-sm text-muted-foreground">
                This page is for admins only.
              </p>
            </div>
            <Badge tone="pink">Admin only</Badge>
          </div>
          <div className="mt-4">
            <Button href="/dashboard">Back to dashboard</Button>
          </div>
        </Card>
      </div>
    );
  }

  return null;
}

