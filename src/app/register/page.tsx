import { Suspense } from "react";
import { AuthForm } from "@/components/forms/AuthForm";
import { AuthGateLoader } from "@/components/auth/AuthGateLoader";

export default function RegisterPage() {
  return (
    <Suspense fallback={<AuthGateLoader />}>
      <AuthForm
        title="Let’s get started!"
        subtitle="Create your account and earn your first badge."
        submitLabel="Create account"
        mode="register"
      />
    </Suspense>
  );
}
