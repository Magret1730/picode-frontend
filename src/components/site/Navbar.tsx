"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { useAuth } from "@/components/providers/AuthProvider";

export function Navbar() {
  const { user, logout, loading } = useAuth();

  return (
    <header className="sticky top-0 z-10 border-b border-[color:var(--border)] bg-[color:var(--bg)]/75 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-extrabold">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[color:var(--brand-pink)] text-white shadow-[var(--shadow-sm)]">
            P
          </span>
          <span className="text-lg">Picode</span>
          <span className="hidden sm:inline">
            <Badge tone="yellow">Where kids build the web.</Badge>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/courses"
            className="rounded-2xl px-3 py-2 text-sm font-semibold text-[color:var(--text-2)] hover:bg-[color:var(--surface-2)]"
          >
            Courses
          </Link>
          <Link
            href="/progress"
            className="rounded-2xl px-3 py-2 text-sm font-semibold text-[color:var(--text-2)] hover:bg-[color:var(--surface-2)]"
          >
            Progress
          </Link>
          <ThemeToggle className="ml-1" />
          {loading ? null : user ? (
            <>
              <Button
                className="hidden sm:inline-flex"
                variant="ghost"
                href="/dashboard"
              >
                Dashboard
              </Button>
              <Button variant="secondary" onClick={logout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                className="hidden sm:inline-flex"
                variant="ghost"
                href="/login"
              >
                Log in
              </Button>
              <Button href="/register">Start</Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

