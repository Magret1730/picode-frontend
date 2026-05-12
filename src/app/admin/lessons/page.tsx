import { AdminGuard } from "@/components/auth/AdminGuard";
import AdminLessonsPageClient from "./AdminLessonsPageClient";

export default function AdminLessonsPage() {
  return (
    <AdminGuard>
      <AdminLessonsPageClient />
    </AdminGuard>
  );
}
