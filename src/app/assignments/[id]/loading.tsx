import { Card } from "@/components/ui/Card";

export default function LoadingAssignment() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="h-10 w-80 rounded-3xl bg-surface-2" />
      <div className="mt-2 h-5 w-[34rem] rounded-3xl bg-surface-2" />
      <Card className="mt-6 animate-pulse">
        <div className="h-8 w-56 rounded-2xl bg-surface-2" />
        <div className="mt-4 h-52 w-full rounded-3xl bg-surface-2" />
      </Card>
    </div>
  );
}

