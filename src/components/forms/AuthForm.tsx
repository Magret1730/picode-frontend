"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/components/providers/AuthProvider";
import { getSafeRedirectPath } from "@/lib/safe-redirect";

export function AuthForm({
  title,
  subtitle,
  submitLabel,
  mode,
}: {
  title: string;
  subtitle: string;
  submitLabel: string;
  mode: "login" | "register";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { login, register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Please enter your email.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    if (mode === "register" && !name.trim()) {
      setError("Please enter your name.");
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "register") {
        await register({
          name: name.trim(),
          email: trimmedEmail,
          password,
        });
      } else {
        await login({ email: trimmedEmail, password });
      }
      const rawRedirect =
        searchParams.get("redirect") ?? searchParams.get("next");
      const nextPath = getSafeRedirectPath(rawRedirect) ?? "/dashboard";
      router.push(nextPath);
      router.refresh();
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Something went wrong. Try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <Card>
        <h1 className="text-2xl font-extrabold">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          {mode === "register" ? (
            <Field
              label="Name"
              value={name}
              onChange={setName}
              placeholder="Your display name"
              autoComplete="name"
            />
          ) : null}

          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
            autoComplete="email"
          />
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            autoComplete={mode === "register" ? "new-password" : "current-password"}
          />

          {error ? (
            <div className="rounded-2xl border border-border bg-surface-2 p-3">
              <p className="text-sm font-semibold">Couldn’t sign you in</p>
              <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            </div>
          ) : null}

          <Button className="w-full" type="submit" disabled={submitting}>
            {submitting ? "Working..." : submitLabel}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            {pathname === "/login" ? (
              <>
                New here?{" "}
                <Link
                  className="underline"
                  href={
                    searchParams.toString()
                      ? `/register?${searchParams.toString()}`
                      : "/register"
                  }
                >
                  Create an account
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  className="underline"
                  href={
                    searchParams.toString()
                      ? `/login?${searchParams.toString()}`
                      : "/login"
                  }
                >
                  Log in
                </Link>
              </>
            )}
          </p>
        </form>
      </Card>
    </div>
  );
}

function Field({
  label,
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-muted-foreground">{label}</span>
      <input
        type={type ?? "text"}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-2xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-[color,box-shadow,border-color] placeholder:text-muted-foreground placeholder:opacity-60 focus-visible:border-brand-blue/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-brand-blue/40"
      />
    </label>
  );
}
