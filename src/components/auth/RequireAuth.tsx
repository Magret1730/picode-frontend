"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

export function RequireAuth() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (user) return;
    router.replace(`/login?next=${encodeURIComponent(pathname || "/dashboard")}`);
  }, [loading, user, router, pathname]);

  return null;
}

