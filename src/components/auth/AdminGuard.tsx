"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { AuthGateLoader } from "@/components/auth/AuthGateLoader";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAuthLoading, isAuthenticated, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const returnPath = pathname && pathname !== "/login" ? pathname : "/admin";

  useEffect(() => {
    if (isAuthLoading) return;
    if (!isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(returnPath)}`);
      return;
    }
    if (user?.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [isAuthLoading, isAuthenticated, user?.role, router, returnPath]);

  if (isAuthLoading || !isAuthenticated) {
    return <AuthGateLoader />;
  }

  if (user?.role !== "admin") {
    return <AuthGateLoader />;
  }

  return <>{children}</>;
}
