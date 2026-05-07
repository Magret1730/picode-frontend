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
    mint: "bg-[color:var(--picode-mint)]/15 text-zinc-900",
    blue: "bg-[color:var(--picode-blue)]/15 text-zinc-900",
    yellow: "bg-[color:var(--picode-yellow)]/30 text-zinc-900",
    pink: "bg-[color:var(--picode-pink)]/15 text-zinc-900",
    zinc: "bg-zinc-100 text-zinc-900",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

