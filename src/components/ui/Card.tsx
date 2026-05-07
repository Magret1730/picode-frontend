import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-[var(--shadow-sm)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

