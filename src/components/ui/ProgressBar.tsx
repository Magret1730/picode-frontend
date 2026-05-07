import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  label,
  className,
}: {
  value: number; // 0..100
  label?: string;
  className?: string;
}) {
  const safe = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-[color:var(--text-2)]">{label}</span>
          <span className="font-extrabold text-[color:var(--text)]">{safe}%</span>
        </div>
      ) : null}
      <div className="h-3 w-full overflow-hidden rounded-full bg-[color:var(--surface-2)]">
        <div
          className="h-full rounded-full bg-[color:var(--brand-blue)]"
          style={{ width: `${safe}%` }}
        />
      </div>
    </div>
  );
}

