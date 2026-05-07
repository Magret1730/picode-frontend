import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-extrabold">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--picode-pink)] text-white shadow-sm">
            P
          </span>
          <span className="text-lg">Picode</span>
          <span className="hidden sm:inline">
            <Badge tone="yellow">Where kids build the web.</Badge>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/courses"
            className="rounded-xl px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
          >
            Courses
          </Link>
          <Link
            href="/progress"
            className="rounded-xl px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
          >
            Progress
          </Link>
          <Button className="hidden sm:inline-flex" variant="ghost" href="/login">
            Log in
          </Button>
          <Button href="/register">Start</Button>
        </nav>
      </div>
    </header>
  );
}

