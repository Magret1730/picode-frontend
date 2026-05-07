import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
  disabled,
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--picode-blue)] disabled:opacity-50 disabled:pointer-events-none";

  const styles: Record<NonNullable<Props["variant"]>, string> = {
    primary:
      "bg-[color:var(--picode-blue)] text-white shadow-sm hover:brightness-95",
    secondary:
      "bg-[color:var(--picode-yellow)] text-zinc-900 shadow-sm hover:brightness-95",
    ghost: "bg-transparent text-zinc-900 hover:bg-zinc-100",
  };

  const cls = cn(base, styles[variant], className);

  if (href) {
    return (
      <Link className={cls} href={href} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
}

