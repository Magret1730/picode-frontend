import { Card } from "@/components/ui/Card";

export function AuthGateLoader() {
  return (
    <div className="mx-auto flex min-h-[40vh] max-w-lg flex-col items-center justify-center px-4 py-16">
      <Card className="w-full border-border/70 bg-card/80 p-8 text-center shadow-soft backdrop-blur-sm">
        <div
          className="mx-auto mb-4 h-10 w-10 animate-pulse rounded-full bg-brand-blue/20 ring-2 ring-brand-blue/30"
          aria-hidden
        />
        <p className="text-base font-semibold text-foreground">Checking your account…</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Hang tight while we verify your session.
        </p>
      </Card>
    </div>
  );
}
