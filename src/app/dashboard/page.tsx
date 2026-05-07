import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { mockCourses } from "@/lib/mock-data";

export default function DashboardPage() {
  const student = {
    name: "Coder",
    xp: 120,
    badges: [
      { id: "badge_first", name: "First Page", tone: "yellow" as const },
      { id: "badge_lists", name: "List Builder", tone: "mint" as const },
      { id: "badge_styles", name: "Style Spark", tone: "pink" as const },
    ],
  };

  const courseProgress = [
    {
      slug: "html-beginner",
      progress: 35,
      next: {
        title: "Headings and Paragraphs",
        href: "/courses/html-beginner/lessons/headings-and-paragraphs",
      },
      message: "You’re building strong foundations. Keep it up!",
    },
    {
      slug: "css-beginner",
      progress: 10,
      next: {
        title: "What Is CSS?",
        href: "/courses/css-beginner/lessons/what-is-css",
      },
      message: "Nice start! A little color goes a long way.",
    },
  ] as const;

  const continueLearning = courseProgress
    .slice()
    .sort((a, b) => b.progress - a.progress)[0];

  const recentActivity: Array<{
    id: string;
    title: string;
    detail: string;
    when: string;
    tone: "blue" | "mint" | "yellow" | "pink" | "zinc";
  }> = [
    {
      id: "act_1",
      title: "Opened lesson",
      detail: "What Is HTML?",
      when: "Today",
      tone: "blue" as const,
    },
    {
      id: "act_2",
      title: "Completed classwork",
      detail: "Create your first webpage",
      when: "Yesterday",
      tone: "mint" as const,
    },
    {
      id: "act_3",
      title: "Earned badge",
      detail: "First Page",
      when: "2 days ago",
      tone: "yellow" as const,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* 1) Welcome hero */}
      <Card className="relative overflow-hidden">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[color:var(--brand-blue)] blur-3xl opacity-10" />
        <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-[color:var(--brand-pink)] blur-3xl opacity-10" />
        <div className="relative">
          <PageHeader
            eyebrow={<Badge tone="mint">Welcome back</Badge>}
            title={`Hi, ${student.name}!`}
            description="Ready for a quick win today? Pick up where you left off."
            actions={
              <>
                <Badge tone="yellow">XP: {student.xp}</Badge>
                <Button variant="secondary" href="/progress">
                  View progress
                </Button>
              </>
            }
          />
        </div>
      </Card>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {/* 2) Continue learning */}
        <Card className="lg:col-span-2">
          <Badge tone="blue">Continue learning</Badge>
          <h2 className="mt-3 text-2xl font-extrabold">
            Next up: {continueLearning.next.title}
          </h2>
          <p className="mt-2 text-[color:var(--text-2)]">
            {continueLearning.message}
          </p>
          <div className="mt-5 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-5">
            <ProgressBar
              value={continueLearning.progress}
              label="Current course progress"
            />
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-[color:var(--text-2)]">
                Tip: finish one small task, then run checks.
              </p>
              <Button href={continueLearning.next.href}>Continue</Button>
            </div>
          </div>
        </Card>

        {/* 4) XP + badges */}
        <Card>
          <Badge tone="yellow">XP & badges</Badge>
          <h2 className="mt-3 text-2xl font-extrabold">You’re leveling up</h2>
          <p className="mt-2 text-[color:var(--text-2)]">
            Every lesson earns XP. Badges celebrate your wins.
          </p>

          <div className="mt-5 grid gap-3">
            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-4">
              <p className="text-sm font-semibold text-[color:var(--text-2)]">
                Total XP
              </p>
              <p className="mt-1 text-3xl font-extrabold">{student.xp}</p>
              <p className="mt-1 text-xs text-[color:var(--text-2)]">
                Nice work — keep the streak going.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-[color:var(--text-2)]">
                Badges
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {student.badges.map((b) => (
                  <Badge key={b.id} tone={b.tone}>
                    {b.name}
                  </Badge>
                ))}
              </div>
              <p className="mt-3 text-xs text-[color:var(--text-2)]">
                New badges unlock as you complete classworks.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* 3) Course progress */}
      <section className="mt-10">
        <div className="flex items-end justify-between gap-3">
          <div>
            <Badge tone="mint">Course progress</Badge>
            <h2 className="mt-3 text-2xl font-extrabold">
              Keep building your skills
            </h2>
            <p className="mt-1 text-[color:var(--text-2)]">
              Two beginner courses — structured, simple, and fun.
            </p>
          </div>
          <Button variant="secondary" href="/courses">
            Browse courses
          </Button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {mockCourses.map((c) => {
            const prog =
              courseProgress.find((p) => p.slug === c.slug)?.progress ?? 0;
            const nextTitle =
              courseProgress.find((p) => p.slug === c.slug)?.next.title ??
              "Lessons coming soon";
            return (
              <Card key={c.id} className="flex flex-col gap-4">
                <div>
                  <h3 className="text-xl font-extrabold">{c.title}</h3>
                  <p className="mt-1 text-sm text-[color:var(--text-2)]">
                    {c.description}
                  </p>
                </div>
                <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-5">
                  <ProgressBar value={prog} label="Progress" />
                  <p className="mt-2 text-xs text-[color:var(--text-2)]">
                    Next: <span className="font-semibold">{nextTitle}</span>
                  </p>
                </div>
                <div className="mt-auto flex gap-2">
                  <Button href={`/courses/${c.slug}`}>Open course</Button>
                  <Button variant="ghost" href="/progress">
                    Progress
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 5) Recent activity */}
      <section className="mt-10">
        <div className="flex items-end justify-between gap-3">
          <div>
            <Badge tone="pink">Recent activity</Badge>
            <h2 className="mt-3 text-2xl font-extrabold">Your latest wins</h2>
            <p className="mt-1 text-[color:var(--text-2)]">
              A quick timeline of what you’ve been doing.
            </p>
          </div>
        </div>

        <Card className="mt-6">
          {recentActivity.length === 0 ? (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-extrabold">Nothing yet — let’s go!</h3>
                <p className="mt-1 text-[color:var(--text-2)]">
                  Start a classwork to see friendly feedback and a progress boost.
                </p>
              </div>
              <Button href="/courses">Start a lesson</Button>
            </div>
          ) : (
            <ul className="grid gap-3">
              {recentActivity.map((a) => (
                <li
                  key={a.id}
                  className="flex flex-col gap-2 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone={a.tone}>{a.title}</Badge>
                      <p className="truncate font-semibold">{a.detail}</p>
                    </div>
                    <p className="mt-1 text-sm text-[color:var(--text-2)]">
                      {a.when}
                    </p>
                  </div>
                  <Button variant="ghost" href="/progress">
                    See progress
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>

      {/* 6) Motivational CTA */}
      <section className="mt-10">
        <Card className="relative overflow-hidden">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[color:var(--brand-green)] blur-3xl opacity-12" />
          <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-[color:var(--brand-yellow)] blur-3xl opacity-14" />
          <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold">
                Tiny steps. Big progress.
              </h2>
              <p className="mt-1 text-[color:var(--text-2)]">
                Pick one lesson, finish one classwork, and celebrate one win.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button href="/courses">Choose a lesson</Button>
              <Button variant="secondary" href="/progress">
                See your progress
              </Button>
            </div>
          </div>
        </Card>
      </section>

      <div className="h-12" />
    </div>
  );
}

