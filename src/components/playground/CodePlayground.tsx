"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { apiRunSubmissionTests } from "@/lib/api/picode";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

type TestResult = { name: string; passed: boolean; message: string };

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
  requirements: string[];
  starterCode: string;
  languageLabel?: string;
  submission: { userId: string } & (
    | { classworkId: string; assignmentId?: never }
    | { assignmentId: string; classworkId?: never }
  );
  onCompleteHref?: string;
  onCompleteLabel?: string;
  className?: string;
}) {
  const [code, setCode] = useState(starterCode);
  const [srcDoc, setSrcDoc] = useState<string>("");
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

      const res = await apiRunSubmissionTests({
        ...submission,
        submittedCode: code,
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
          <ul className="mt-3 grid gap-2">
            {requirements.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-card ring-1 ring-border">
                  ✓
                </span>
                <span className="text-muted-foreground">{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          <Button onClick={runCode}>Run code</Button>
          <Button variant="secondary" onClick={submit} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
          <Button variant="ghost" onClick={() => setCode(starterCode)}>
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

