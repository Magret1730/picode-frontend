"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

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
  className,
}: {
  title: string;
  instructions: string;
  requirements: string[];
  starterCode: string;
  languageLabel?: string;
  className?: string;
}) {
  const [code, setCode] = useState(starterCode);
  const [srcDoc, setSrcDoc] = useState<string>("");
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const iframeDoc = useMemo(() => {
    if (!srcDoc) return "";
    // Prevent student JS from running in MVP preview.
    return srcDoc.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
  }, [srcDoc]);

  function runCode() {
    setSrcDoc(code);
    setResults(null);
  }

  async function submit() {
    setSubmitting(true);
    try {
      // MVP: local, safe DOM-based checks (no random failures).
      const mocked: TestResult[] = runMvpChecks(code, requirements);
      await new Promise((r) => setTimeout(r, 500));
      setResults(mocked);
    } finally {
      setSubmitting(false);
    }
  }

  const passed = results ? results.every((r) => r.passed) : null;

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

function runMvpChecks(submittedCode: string, requirements: string[]): TestResult[] {
  const doc = parseHtmlForChecks(submittedCode);

  function has(sel: string) {
    return Boolean(doc.querySelector(sel));
  }
  function hasAttr(sel: string, attr: string) {
    const el = doc.querySelector(sel);
    return Boolean(el?.getAttribute(attr)?.trim());
  }
  function textNotEmpty(sel: string) {
    const el = doc.querySelector(sel);
    return Boolean((el?.textContent ?? "").trim());
  }
  function bodyNotEmpty() {
    return Boolean((doc.body?.textContent ?? "").trim());
  }

  return requirements.map((r) => {
    const key = r.toLowerCase();

    // Map the common Picode MVP requirements to DOM checks.
    const check =
      key.includes("title") ? { ok: has("title") || doc.title.trim().length > 0, name: "Page title" } :
      key.includes("main heading") || key.includes("(h1)") || key.includes("heading (h1)") || key.includes("one main heading") || key.includes("add a heading")
        ? { ok: has("h1") && textNotEmpty("h1"), name: "Heading" }
        : key.includes("smaller heading") || key.includes("(h2)") || key.includes("h2")
          ? { ok: has("h2") && textNotEmpty("h2"), name: "Smaller heading" }
          : key.includes("paragraph") || key.includes("(p)")
            ? { ok: doc.querySelectorAll("p").length > 0 && bodyNotEmpty(), name: "Paragraph" }
            : key.includes("image") || key.includes("(img)")
              ? { ok: has("img") && hasAttr("img", "src"), name: "Image" }
              : key.includes("alt")
                ? { ok: has("img") && hasAttr("img", "alt"), name: "Image alt text" }
                : key.includes("link") || key.includes("(a)") || key.includes("href")
                  ? { ok: has("a") && hasAttr("a", "href"), name: "Link" }
                  : key.includes("unordered list") || key.includes("(ul)")
                    ? { ok: has("ul"), name: "Unordered list" }
                    : key.includes("ordered list") || key.includes("(ol)")
                      ? { ok: has("ol"), name: "Ordered list" }
                      : key.includes("list") || key.includes("hobbies")
                        ? { ok: has("ul") || has("ol"), name: "List" }
                        : { ok: bodyNotEmpty(), name: "Content" };

    return {
      name: r,
      passed: check.ok,
      message: check.ok
        ? "Great! That part looks good."
        : "Almost there! Double-check this requirement.",
    };
  });
}

function parseHtmlForChecks(submitted: string): Document {
  const trimmed = submitted.trim();
  const isFullDoc =
    /<html[\s>]/i.test(trimmed) ||
    /<!doctype[\s>]/i.test(trimmed) ||
    /<head[\s>]/i.test(trimmed) ||
    /<body[\s>]/i.test(trimmed);

  const html = isFullDoc
    ? trimmed
    : `<!doctype html><html><head></head><body>${trimmed}</body></html>`;

  // DOMParser does NOT execute scripts.
  const parser = new DOMParser();
  return parser.parseFromString(html, "text/html");
}

