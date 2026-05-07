import { AuthForm } from "@/components/forms/AuthForm";

export default function RegisterPage() {
  return (
    <AuthForm
      title="Let’s get started!"
      subtitle="Create your account and earn your first badge."
      submitLabel="Create account"
      mode="register"
    />
  );
}

