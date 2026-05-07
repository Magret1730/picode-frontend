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
        <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>

        <form className="mt-6 space-y-4">
          <Field label="Email" type="email" placeholder="you@picode.dev" />
          <Field label="Password" type="password" placeholder="••••••••" />
          <Button className="w-full" type="submit">
            {submitLabel}
          </Button>
          <p className="text-center text-xs text-zinc-500">
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
      <span className="text-sm font-semibold text-zinc-700">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--picode-blue)]"
      />
    </label>
  );
}

