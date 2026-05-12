import Link from "next/link";
import { AuthAwareNavLink } from "@/components/auth/AuthAwareNavLink";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--card)]">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 sm:items-start">
        <p>
          <span className="font-extrabold text-[color:var(--text)]">Picode</span>
          <span className="text-[color:var(--text-2)]">
            {" "}
            — Where kids build the web.
          </span>
        </p>
        <div className="text-sm text-[color:var(--text-2)] sm:text-right">
          <p className="font-semibold text-[color:var(--text)]">Quick links</p>
          <div className="mt-2 flex flex-wrap gap-2 sm:justify-end">
            <AuthAwareNavLink
              className="rounded-2xl px-3 py-2 hover:bg-[color:var(--surface-2)]"
              href="/courses"
            >
              Courses
            </AuthAwareNavLink>
            <Link
              className="rounded-2xl px-3 py-2 hover:bg-[color:var(--surface-2)]"
              href="/login"
            >
              Log in
            </Link>
            <Link
              className="rounded-2xl px-3 py-2 hover:bg-[color:var(--surface-2)]"
              href="/register"
            >
              Start
            </Link>
          </div>
          <p className="mt-3 text-xs text-[color:var(--text-2)]">
            MVP UI using mock data
          </p>
        </div>
      </div>
    </footer>
  );
}

