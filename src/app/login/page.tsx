import { AuthForm } from "@/components/forms/AuthForm";

export default function LoginPage() {
  return (
    <AuthForm
      title="Welcome back!"
      subtitle="Log in to continue your coding adventure."
      submitLabel="Log in"
    />
  );
}

