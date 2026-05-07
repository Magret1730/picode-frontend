import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 sm:items-start">
        <p>
          <span className="font-extrabold text-zinc-900">Picode</span>
          <span className="text-zinc-600"> — Where kids build the web.</span>
        </p>
        <div className="text-sm text-zinc-600 sm:text-right">
          <p className="font-semibold text-zinc-900">Quick links</p>
          <div className="mt-2 flex flex-wrap gap-2 sm:justify-end">
            <Link className="rounded-xl px-3 py-2 hover:bg-zinc-100" href="/courses">
              Courses
            </Link>
            <Link className="rounded-xl px-3 py-2 hover:bg-zinc-100" href="/login">
              Log in
            </Link>
            <Link className="rounded-xl px-3 py-2 hover:bg-zinc-100" href="/register">
              Start
            </Link>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            MVP UI using mock data
          </p>
        </div>
      </div>
    </footer>
  );
}

