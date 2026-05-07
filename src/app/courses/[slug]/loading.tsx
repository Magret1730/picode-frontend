import { Card } from "@/components/ui/Card";

export default function LoadingCourseDetail() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="h-10 w-72 rounded-3xl bg-surface-2" />
      <div className="mt-2 h-5 w-[32rem] rounded-3xl bg-surface-2" />

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <Card className="animate-pulse lg:col-span-2">
          <div className="h-5 w-40 rounded-2xl bg-surface-2" />
          <div className="mt-4 h-6 w-56 rounded-2xl bg-surface-2" />
          <div className="mt-5 h-14 w-full rounded-3xl bg-surface-2" />
        </Card>
        <Card className="animate-pulse">
          <div className="h-5 w-28 rounded-2xl bg-surface-2" />
          <div className="mt-4 h-10 w-44 rounded-2xl bg-surface-2" />
          <div className="mt-3 h-16 w-full rounded-3xl bg-surface-2" />
        </Card>
      </div>
    </div>
  );
}

