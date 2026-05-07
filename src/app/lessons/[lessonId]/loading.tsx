import { Card } from "@/components/ui/Card";

export default function LoadingLesson() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="h-10 w-72 rounded-3xl bg-surface-2" />
      <div className="mt-2 h-5 w-[30rem] rounded-3xl bg-surface-2" />
      <Card className="mt-6 animate-pulse">
        <div className="h-6 w-28 rounded-2xl bg-surface-2" />
        <div className="mt-3 h-4 w-full rounded-2xl bg-surface-2" />
        <div className="mt-2 h-4 w-5/6 rounded-2xl bg-surface-2" />
        <div className="mt-6 h-6 w-40 rounded-2xl bg-surface-2" />
        <div className="mt-3 h-28 w-full rounded-3xl bg-surface-2" />
      </Card>
    </div>
  );
}

