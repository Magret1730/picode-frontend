"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { AuthGateLoader } from "@/components/auth/AuthGateLoader";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const returnPath = pathname && pathname !== "/login" ? pathname : "/dashboard";

  useEffect(() => {
    if (isAuthLoading) return;
    if (!isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(returnPath)}`);
    }
  }, [isAuthLoading, isAuthenticated, router, returnPath]);

  if (isAuthLoading || !isAuthenticated) {
    return <AuthGateLoader />;
  }

  return <>{children}</>;
}
