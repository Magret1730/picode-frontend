import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[color:var(--picode-mint)]" />
            Learn HTML + CSS the fun way
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Build awesome webpages,
            <span className="text-[color:var(--picode-pink)]"> one badge</span> at
            a time.
          </h1>
          <p className="mt-4 text-lg text-zinc-700">
            Picode helps students learn by doing. Each lesson gives you a quick
            goal, a tiny example, and a challenge you can finish today.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/register">Start learning</Button>
            <Button variant="secondary" href="/courses">
              Browse courses
            </Button>
          </div>
        </div>

        <Card className="relative overflow-hidden">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[color:var(--picode-yellow)] blur-2xl opacity-60" />
          <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-[color:var(--picode-blue)] blur-2xl opacity-50" />

          <h2 className="text-xl font-extrabold">Today’s mini-mission</h2>
          <p className="mt-2 text-zinc-700">
            Make a profile page with a title, a picture, and a link.
          </p>
          <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-sm text-zinc-800">
            {"<h1>Your Name</h1>\n<p>About me…</p>\n<img alt=\"Me\" />\n<a href=\"https://…\">My site</a>"}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm font-semibold text-zinc-700">
              Earn: <span className="text-[color:var(--picode-pink)]">+10 XP</span>
            </p>
            <Button href="/dashboard">Go to dashboard</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
