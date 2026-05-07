import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "mint",
  className,
}: {
  children: React.ReactNode;
  tone?: "mint" | "blue" | "yellow" | "pink" | "zinc";
  className?: string;
}) {
  const tones: Record<NonNullable<typeof tone>, string> = {
    mint: "bg-[color:var(--brand-green)]/15 text-[color:var(--text)]",
    blue: "bg-[color:var(--brand-blue)]/15 text-[color:var(--text)]",
    yellow: "bg-[color:var(--brand-yellow)]/35 text-[color:var(--text)]",
    pink: "bg-[color:var(--brand-pink)]/18 text-[color:var(--text)]",
    zinc: "bg-[color:var(--surface-2)] text-[color:var(--text)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold ring-1 ring-[color:var(--border)]/70",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

