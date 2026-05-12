import { HeroPlaygroundComposition } from "@/components/landing/HeroPlaygroundComposition";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,color-mix(in_oklab,var(--brand-pink)_16%,transparent),transparent_58%),radial-gradient(circle_at_82%_14%,color-mix(in_oklab,var(--brand-blue)_18%,transparent),transparent_56%),radial-gradient(circle_at_32%_88%,color-mix(in_oklab,var(--brand-green)_12%,transparent),transparent_52%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div className="max-w-xl">
              <Badge tone="yellow">Ages 8–14</Badge>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl sm:leading-[1.08]">
                Coding for kids, made fun.
              </h1>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-relaxed">
                Learn HTML and CSS with tiny lessons, friendly practice, and
                instant feedback.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button className="w-full sm:w-auto sm:min-w-[11rem]" href="/register">
                  Start learning
                </Button>
                <Button
                  className="w-full sm:w-auto sm:min-w-[11rem]"
                  variant="secondary"
                  href="/courses"
                >
                  Explore courses
                </Button>
              </div>
            </div>

            <HeroPlaygroundComposition />
          </div>
        </div>
      </section>

      {/* What kids will learn */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge tone="blue">What kids will learn</Badge>
            <h2 className="mt-3 text-3xl font-extrabold">
              Real web skills, made simple
            </h2>
            <p className="mt-2 text-[color:var(--text-2)]">
              Learn by building. Every step gives friendly feedback.
            </p>
          </div>
          <Button variant="secondary" href="/courses">
            See the lessons
          </Button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <h3 className="text-lg font-extrabold">HTML basics</h3>
            <p className="mt-1 text-sm text-[color:var(--text-2)]">
              Headings, paragraphs, images, links, and lists.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-extrabold">CSS style powers</h3>
            <p className="mt-1 text-sm text-[color:var(--text-2)]">
              Color, fonts, spacing, borders, and backgrounds.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-extrabold">Clean structure</h3>
            <p className="mt-1 text-sm text-[color:var(--text-2)]">
              Make pages easy to read and fun to explore.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-extrabold">Confidence</h3>
            <p className="mt-1 text-sm text-[color:var(--text-2)]">
              Small wins turn into big skills.
            </p>
          </Card>
        </div>
      </section>

      {/* Course preview */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="relative overflow-hidden">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[color:var(--brand-yellow)] blur-2xl opacity-40" />
            <Badge tone="yellow">Course preview</Badge>
            <h3 className="mt-3 text-2xl font-extrabold">HTML Beginner</h3>
            <p className="mt-2 text-[color:var(--text-2)]">
              Build the structure of webpages with friendly, bite-size lessons.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-[color:var(--text-2)]">
              <li>• What is HTML?</li>
              <li>• Headings & paragraphs</li>
              <li>• Images & links</li>
              <li>• Lists</li>
            </ul>
            <div className="mt-5">
              <Button href="/courses/html-beginner">Preview HTML</Button>
            </div>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute -left-16 -bottom-16 h-44 w-44 rounded-full bg-[color:var(--brand-blue)] blur-2xl opacity-35" />
            <Badge tone="blue">Course preview</Badge>
            <h3 className="mt-3 text-2xl font-extrabold">CSS Beginner</h3>
            <p className="mt-2 text-[color:var(--text-2)]">
              Add style magic — colors, fonts, spacing, and more.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-[color:var(--text-2)]">
              <li>• What is CSS?</li>
              <li>• Fonts & text styling</li>
              <li>• Borders & spacing</li>
              <li>• Backgrounds & images</li>
            </ul>
            <div className="mt-5">
              <Button href="/courses/css-beginner">Preview CSS</Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Age groups */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="mt-3 text-3xl font-extrabold">Pick your path</h2>
        <p className="mt-2 text-[color:var(--text-2)]">
          Same skills, different vibes — choose what feels right.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card className="border-[color:var(--picode-yellow)]/40">
            <h3 className="text-xl font-extrabold">Junior</h3>
            <p className="mt-3 text-sm text-[color:var(--text-2)]">
              Short missions and big high-fives. Perfect for first-time coders.
            </p>
          </Card>
          <Card className="border-[color:var(--picode-mint)]/45">
            <h3 className="text-xl font-extrabold">Builder</h3>
            <p className="mt-3 text-sm text-[color:var(--text-2)]">
              Build cool pages with more choices and creative challenges.
            </p>
          </Card>
          <Card className="border-[color:var(--picode-blue)]/40">
            <h3 className="text-xl font-extrabold">Creator</h3>
            <p className="mt-3 text-sm text-[color:var(--text-2)]">
              Level up with bigger projects and stronger design skills.
            </p>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge tone="mint">How it works</Badge>
            <h2 className="mt-3 text-3xl font-extrabold">
              Learn by building, not guessing
            </h2>
            <p className="mt-2 text-[color:var(--text-2)]">
              Write code → run checks → celebrate your win.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Card>
            <h3 className="text-lg font-extrabold">1) Pick a lesson</h3>
            <p className="mt-1 text-sm text-[color:var(--text-2)]">
              A short goal + a tiny example gets you started fast.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-extrabold">2) Do the classwork</h3>
            <p className="mt-1 text-sm text-[color:var(--text-2)]">
              Build a real page. Add headings, images, or styles.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-extrabold">3) Run friendly checks</h3>
            <p className="mt-1 text-sm text-[color:var(--text-2)]">
              Get kid-friendly feedback. Fix one thing at a time.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <Card className="relative overflow-hidden">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[color:var(--brand-pink)] blur-3xl opacity-16" />
          <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-[color:var(--brand-green)] blur-3xl opacity-14" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold">
                Ready to build your first webpage?
              </h2>
              <p className="mt-1 text-[color:var(--text-2)]">
                Start with HTML Beginner and earn your first XP today.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button href="/register">Start learning</Button>
              <Button variant="secondary" href="/courses">
                Browse courses
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
