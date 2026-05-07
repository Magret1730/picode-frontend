import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function AuthForm({
  title,
  subtitle,
  submitLabel,
}: {
  title: string;
  subtitle: string;
  submitLabel: string;
}) {
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <Card>
        <h1 className="text-2xl font-extrabold">{title}</h1>
        <p className="mt-1 text-sm text-[color:var(--text-2)]">{subtitle}</p>

        <form className="mt-6 space-y-4">
          <Field label="Email" type="email" placeholder="you@picode.dev" />
          <Field label="Password" type="password" placeholder="••••••••" />
          <Button className="w-full" type="submit">
            {submitLabel}
          </Button>
          <p className="text-center text-xs text-[color:var(--text-2)]">
            MVP: mock auth only (no backend wired yet)
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
}: {
  label: string;
  type: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[color:var(--text-2)]">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-2 text-sm text-[color:var(--text)] outline-none placeholder:text-[color:var(--text-2)] focus:ring-2 focus:ring-[color:var(--brand-blue)]"
      />
    </label>
  );
}

