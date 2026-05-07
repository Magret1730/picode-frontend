"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/components/providers/AuthProvider";

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
  const { login, register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ageGroup, setAgeGroup] = useState("8-10");
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
          ageGroup,
        });
      } else {
        await login({ email: trimmedEmail, password });
      }
      router.push("/dashboard");
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
        <p className="mt-1 text-sm text-[color:var(--text-2)]">{subtitle}</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          {mode === "register" ? (
            <>
              <Field
                label="Name"
                value={name}
                onChange={setName}
                placeholder="Demo Student"
              />
              <Field
                label="Age group"
                value={ageGroup}
                onChange={setAgeGroup}
                placeholder="8-10"
              />
            </>
          ) : null}

          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="student@example.com"
          />
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
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

          <p className="text-center text-xs text-[color:var(--text-2)]">
            {pathname === "/login" ? (
              <>
                New here?{" "}
                <Link className="underline" href="/register">
                  Create an account
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link className="underline" href="/login">
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
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[color:var(--text-2)]">
        {label}
      </span>
      <input
        type={type ?? "text"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-2 text-sm text-[color:var(--text)] outline-none placeholder:text-[color:var(--text-2)] focus:ring-2 focus:ring-[color:var(--brand-blue)]"
      />
    </label>
  );
}

