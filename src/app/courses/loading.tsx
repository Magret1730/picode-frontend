import { Card } from "@/components/ui/Card";

export default function LoadingCourses() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="h-10 w-56 rounded-3xl bg-surface-2" />
      <div className="mt-2 h-5 w-96 rounded-3xl bg-surface-2" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-6 w-40 rounded-2xl bg-surface-2" />
            <div className="mt-3 h-4 w-full rounded-2xl bg-surface-2" />
            <div className="mt-2 h-4 w-3/4 rounded-2xl bg-surface-2" />
            <div className="mt-5 h-12 w-full rounded-3xl bg-surface-2" />
          </Card>
        ))}
      </div>
    </div>
  );
}

