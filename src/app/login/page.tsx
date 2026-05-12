import { Suspense } from "react";
import { AuthForm } from "@/components/forms/AuthForm";
import { AuthGateLoader } from "@/components/auth/AuthGateLoader";

export default function LoginPage() {
  return (
    <Suspense fallback={<AuthGateLoader />}>
      <AuthForm
        title="Welcome back!"
        subtitle="Log in to continue your coding adventure."
        submitLabel="Log in"
        mode="login"
      />
    </Suspense>
  );
}
