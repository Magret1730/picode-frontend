"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/** Logged-out users go to login with redirect instead of the protected path first. */
export function AuthAwareNavLink({ href, children, className }: Props) {
  const { isAuthLoading, isAuthenticated } = useAuth();
  const dest =
    !isAuthLoading && !isAuthenticated
      ? `/login?redirect=${encodeURIComponent(href)}`
      : href;

  return (
    <Link href={dest} className={className}>
      {children}
    </Link>
  );
}
