import LoginForm from "@/app/[locale]/(auth)/login/login-form";

export default async function LoginPage() {
  return (
    <div>
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
