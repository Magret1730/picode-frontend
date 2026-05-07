import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { apiUserProgress } from "@/lib/api/picode";
import { mockCourses } from "@/lib/mock-data";

type BadgeDef = {
  id: string;
  title: string;
  description: string;
  tone: "blue" | "mint" | "pink" | "yellow" | "zinc";
};

const badgeExamples: BadgeDef[] = [
  {
    id: "html-starter",
    title: "HTML Starter",
    description: "Completed your first HTML lesson.",
    tone: "blue",
  },
  {
    id: "css-explorer",
    title: "CSS Explorer",
    description: "Styled your first page with CSS.",
    tone: "mint",
  },
  {
    id: "web-builder",
    title: "Web Builder",
    description: "Finished an assignment project.",
    tone: "yellow",
  },
  {
    id: "creative-coder",
    title: "Creative Coder",
    description: "Earned 50+ XP by practicing.",
    tone: "pink",
  },
];

function getEncouragement(xpTotal: number) {
  if (xpTotal >= 80) return "You’re on fire. Keep building!";
  if (xpTotal >= 40) return "Amazing progress — your skills are growing fast.";
  if (xpTotal >= 10) return "Nice start! A little practice every day adds up.";
  return "Ready to begin? Complete a lesson to earn XP.";
}

export default async function ProgressPage() {
  const apiRes = await apiUserProgress("demo-user");
  const offline = !apiRes.ok;

  const xpTotal = apiRes.ok ? apiRes.data.xpTotal : 20;
  const encouragement = getEncouragement(xpTotal);

  const courseCards = mockCourses.map((c) => {
    const apiCourse = apiRes.ok
      ? apiRes.data.courseSummaries.find((s) => s.courseSlug === c.slug)
      : null;

    const completedLessons = apiCourse?.lessonsCompleted ?? (c.slug === "html-beginner" ? 1 : 0);
    const completedAssignments =
      apiCourse?.assignmentsCompleted ?? (c.slug === "css-beginner" ? 1 : 0);

    const lessonsTotal = 5;
    const assignmentsTotal = 2;
    const totalItems = lessonsTotal + assignmentsTotal;
    const doneItems = Math.min(totalItems, completedLessons + completedAssignments);
    const pct = totalItems ? Math.round((doneItems / totalItems) * 100) : 0;

    return {
      course: c,
      xp: apiCourse?.xp ?? (c.slug === "html-beginner" ? 10 : 10),
      completedLessons,
      completedAssignments,
      pct,
    };
  });

  const earnedBadges = badgeExamples.filter((b) => {
    if (!apiRes.ok) {
      return b.id === "html-starter" || b.id === "web-builder";
    }
    const hasAnyLesson = apiRes.data.completedLessons.length > 0;
    const hasAnyAssignment = apiRes.data.completedAssignments.length > 0;
    const hasAnyCss = apiRes.data.completedLessons.some((l) => l.courseSlug === "css-beginner");
    const has50xp = apiRes.data.xpTotal >= 50;

    if (b.id === "html-starter") return hasAnyLesson;
    if (b.id === "css-explorer") return hasAnyCss;
    if (b.id === "web-builder") return hasAnyAssignment;
    if (b.id === "creative-coder") return has50xp;
    return false;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageHeader
        title="Progress"
        description="XP, badges, and completed work — all in one place."
        actions={
          <Button variant="secondary" href="/dashboard">
            Back to dashboard
          </Button>
        }
      />

      {offline ? (
        <div className="mt-6">
          <Card className="flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold">Offline mode</p>
              <p className="text-sm text-muted-foreground">
                Backend progress isn’t available right now. Showing example progress.
              </p>
            </div>
            <Badge tone="zinc">Mock data</Badge>
          </Card>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Total XP
              </p>
              <p className="mt-1 text-3xl font-extrabold">{xpTotal}</p>
              <p className="mt-2 text-sm text-muted-foreground">{encouragement}</p>
            </div>
            <Badge tone="mint">Leveling up</Badge>
          </div>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-muted-foreground">Badges</p>
          <div className="mt-3 grid gap-2">
            {earnedBadges.length ? (
              earnedBadges.map((b) => (
                <div
                  key={b.id}
                  className="rounded-3xl border border-border bg-surface-2 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-extrabold">{b.title}</p>
                    <Badge tone={b.tone}>Earned</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {b.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No badges yet — complete a lesson to earn your first one!
              </p>
            )}
          </div>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {courseCards.map(({ course, xp, completedLessons, completedAssignments, pct }) => (
          <Card key={course.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold">{course.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {course.description}
                </p>
              </div>
              <Badge tone="yellow">XP: {xp}</Badge>
            </div>
            <div className="mt-4">
              <ProgressBar value={pct} />
              <p className="mt-2 text-sm text-muted-foreground">
                {pct}% complete • Lessons: {completedLessons} • Assignments:{" "}
                {completedAssignments}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Card>
          <p className="text-sm font-semibold text-muted-foreground">
            Completed lessons
          </p>
          <div className="mt-3 grid gap-2">
            {apiRes.ok && apiRes.data.completedLessons.length ? (
              apiRes.data.completedLessons.slice(0, 8).map((l) => (
                <div
                  key={l.lessonId}
                  className="rounded-3xl border border-border bg-surface-2 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{l.lessonTitle}</p>
                    <Badge tone="mint">+{l.xp} XP</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {l.courseTitle}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No completed lessons yet. Your first win is waiting!
              </p>
            )}
          </div>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-muted-foreground">
            Completed assignments
          </p>
          <div className="mt-3 grid gap-2">
            {apiRes.ok && apiRes.data.completedAssignments.length ? (
              apiRes.data.completedAssignments.slice(0, 8).map((a) => (
                <div
                  key={a.assignmentId}
                  className="rounded-3xl border border-border bg-surface-2 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{a.assignmentTitle}</p>
                    <Badge tone="yellow">+{a.xp} XP</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {a.courseTitle}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No completed assignments yet — you’ll unlock these after a few lessons.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

