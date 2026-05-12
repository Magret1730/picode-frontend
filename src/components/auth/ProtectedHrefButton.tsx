"use client";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/providers/AuthProvider";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

/**
 * When logged out, navigates to login with redirect back to `href` instead of
 * hitting a protected route first.
 */
export function ProtectedHrefButton({ href, children, variant, className }: Props) {
  const { isAuthLoading, isAuthenticated } = useAuth();
  const dest =
    !isAuthLoading && !isAuthenticated
      ? `/login?redirect=${encodeURIComponent(href)}`
      : href;

  return (
    <Button href={dest} variant={variant} className={className}>
      {children}
    </Button>
  );
}
