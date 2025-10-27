import RegisterForm from "@/app/[locale]/(auth)/register/register-form";

export default async function RegisterPage() {
  return (
    <div>
      <div className="flex justify-center"> 
        <RegisterForm />
      </div>
    </div>
  );
}
