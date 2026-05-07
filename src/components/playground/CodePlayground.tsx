"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { apiRunSubmissionTests } from "@/lib/api/picode";
import { useAuth } from "@/components/providers/AuthProvider";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

type TestResult = { name: string; passed: boolean; message: string };

function normalizeRequirements(input: unknown): string[] {
  if (Array.isArray(input)) return input.map((v) => String(v)).filter((s) => s.trim().length > 0);
  if (typeof input === "string") {
    const s = input.trim();
    return s ? [s] : [];
  }
  if (!input) return [];
  if (typeof input === "object") {
    const obj = input as Record<string, unknown>;
    const values = Object.values(obj).flatMap((v) => {
      if (typeof v === "string") return [v];
      if (v && typeof v === "object") {
        const maybeLabel = (v as { label?: unknown }).label;
        if (typeof maybeLabel === "string") return [maybeLabel];
        return Object.values(v as Record<string, unknown>).map(String);
      }
      return [String(v)];
    });
    return values.map((s) => String(s)).filter((s) => s.trim().length > 0);
  }
  return [String(input)].filter((s) => s.trim().length > 0);
}

export function CodePlayground({
  title,
  instructions,
  requirements,
  starterCode,
  languageLabel = "HTML + CSS",
  submission,
  onCompleteHref,
  onCompleteLabel = "Continue",
  className,
}: {
  title: string;
  instructions: string;
  requirements: unknown;
  starterCode: string;
  languageLabel?: string;
  submission?: { classworkId: string; assignmentId?: never } | { assignmentId: string; classworkId?: never };
  onCompleteHref?: string;
  onCompleteLabel?: string;
  className?: string;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [code, setCode] = useState(starterCode ?? "");
  const [srcDoc, setSrcDoc] = useState<string>("");
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const safeRequirements = useMemo(
    () => normalizeRequirements(requirements),
    [requirements],
  );

  useEffect(() => {
    const incoming = starterCode ?? "";
    if (incoming && !code) {
      setCode(incoming);
    }
  }, [starterCode, code]);

  const iframeDoc = useMemo(() => {
    if (!srcDoc) return "";
    // Prevent student JS from running in MVP preview.
    return srcDoc.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
  }, [srcDoc]);

  function runCode() {
    setSrcDoc(code);
    setResults(null);
    setSubmitError(null);
  }

  async function submit() {
    setSubmitting(true);
    try {
      setSubmitError(null);

      if (!submission) {
        setSubmitError(
          "This activity is in offline mode right now. Connect to the backend to submit.",
        );
        return;
      }

      if (!loading && !user) {
        setSubmitError("Please log in to submit your work.");
        router.push("/login");
        return;
      }

      const trimmed = code.trim();
      if (!trimmed) {
        setSubmitError("Add some code before submitting.");
        return;
      }

      const payload = {
        ...(submission && "classworkId" in submission
          ? { classworkId: submission.classworkId, assignmentId: null as null }
          : { assignmentId: submission.assignmentId, classworkId: null as null }),
        userId: user?.id ?? "",
        submittedCode: code,
      };

      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.log("Submitting payload", payload);
      }

      const res = await apiRunSubmissionTests({
        userId: payload.userId,
        classworkId: payload.classworkId ?? undefined,
        assignmentId: payload.assignmentId ?? undefined,
        submittedCode: payload.submittedCode,
      });

      if (!res.ok) {
        setSubmitError(res.message || "We couldn't run checks right now.");
        return;
      }

      setResults(res.data.results);
    } finally {
      setSubmitting(false);
    }
  }

  const passed = results ? results.every((r) => r.passed) : null;
  const xpEarned = passed ? 10 : 0;

  return (
    <div className={cn("grid gap-4 lg:grid-cols-2", className)}>
      <Card className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="blue">{languageLabel}</Badge>
              {passed === null ? null : passed ? (
                <Badge tone="mint">All checks passed</Badge>
              ) : (
                <Badge tone="pink">Needs a tiny fix</Badge>
              )}
            </div>
            <h2 className="mt-3 text-2xl font-extrabold">{title}</h2>
            <p className="mt-1 text-muted-foreground">{instructions}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-surface-2 p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Requirements
          </p>
          {safeRequirements.length ? (
            <ul className="mt-3 grid gap-2">
              {safeRequirements.map((r, idx) => (
                <li key={`${idx}-${r}`} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-card ring-1 ring-border">
                    ✓
                  </span>
                  <span className="text-muted-foreground">{r}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              No requirements listed yet.
            </p>
          )}
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          <Button onClick={runCode}>Run code</Button>
          <Button variant="secondary" onClick={submit} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
          <Button variant="ghost" onClick={() => setCode(starterCode ?? "")}>
            Reset
          </Button>
        </div>

        {submitError ? (
          <div className="rounded-3xl border border-border bg-surface-2 p-4">
            <p className="text-sm font-semibold">Couldn’t run checks</p>
            <p className="mt-1 text-sm text-muted-foreground">{submitError}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Tip: make sure the backend is running and `NEXT_PUBLIC_API_URL` is
              set.
            </p>
          </div>
        ) : null}

        {results ? (
          <div className="rounded-3xl border border-border bg-surface-2 p-4">
            <p className="text-sm font-semibold text-muted-foreground">
              Test results
            </p>
            <div className="mt-3 grid gap-2">
              {results.map((r) => (
                <div
                  key={r.name}
                  className="rounded-3xl border border-border bg-card p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold">{r.name}</p>
                    <Badge tone={r.passed ? "mint" : "pink"}>
                      {r.passed ? "Passed" : "Try again"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {r.message}
                  </p>
                </div>
              ))}
            </div>

            {passed ? (
              <div className="mt-4 rounded-3xl border border-border bg-card p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-extrabold">
                      🎉 You did it! Great job!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      You earned{" "}
                      <span className="font-semibold text-foreground">
                        +{xpEarned} XP
                      </span>
                      .
                    </p>
                  </div>
                  <Button href={onCompleteHref ?? "/dashboard"}>
                    {onCompleteLabel}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-3xl border border-border bg-card p-4">
                <p className="font-semibold">You’re super close!</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fix one hint at a time, then press{" "}
                  <span className="font-semibold text-foreground">Submit</span>{" "}
                  again.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-3xl border border-border bg-surface-2 p-4">
            <p className="text-sm font-semibold text-muted-foreground">
              Friendly feedback
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Click <span className="font-semibold text-foreground">Run code</span>{" "}
              to see your page, then{" "}
              <span className="font-semibold text-foreground">Submit</span> to
              get feedback.
            </p>
          </div>
        )}
      </Card>

      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <Badge tone="yellow">Live preview</Badge>
            <p className="mt-2 text-sm text-muted-foreground">
              Your page appears here after you run code.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-surface-2 p-3">
          <div className="h-72 overflow-hidden rounded-2xl bg-card ring-1 ring-border">
            <iframe
              title="preview"
              className="h-full w-full"
              sandbox="allow-forms allow-modals allow-popups-to-escape-sandbox"
              srcDoc={iframeDoc}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-surface-2 p-3">
          <div className="overflow-hidden rounded-2xl ring-1 ring-border">
            <MonacoEditor
              height="420px"
              defaultLanguage="html"
              value={code}
              onChange={(v) => setCode(v ?? "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                wordWrap: "on",
                automaticLayout: true,
              }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            MVP: editor theme is dark for readability (independent of app theme).
          </p>
        </div>
      </Card>
    </div>
  );
}

