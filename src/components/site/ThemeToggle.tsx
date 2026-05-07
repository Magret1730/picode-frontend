"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = theme === "system" ? resolvedTheme : theme;
  const isDark = current === "dark";

  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--text)] shadow-sm transition hover:bg-[color:var(--surface-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-blue)]",
        className,
      )}
      aria-label={mounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {/* Avoid hydration mismatch by rendering a neutral icon before mount */}
      {!mounted ? (
        <IconSparkle />
      ) : isDark ? (
        <IconSun />
      ) : (
        <IconMoon />
      )}
    </button>
  );
}

function IconSun() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.5A8.5 8.5 0 0 1 11.5 3a6.5 6.5 0 1 0 9.5 9.5Z" />
    </svg>
  );
}

function IconSparkle() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l1.2 3.6L17 7l-3.8 1.4L12 12l-1.2-3.6L7 7l3.8-1.4L12 2Z" />
      <path d="M5 13l.8 2.4L8 16l-2.2.6L5 19l-.8-2.4L2 16l2.2-.6L5 13Z" />
      <path d="M19 13l.8 2.4L22 16l-2.2.6L19 19l-.8-2.4L16 16l2.2-.6L19 13Z" />
    </svg>
  );
}

