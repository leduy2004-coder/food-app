import LoginForm from "@/app/[locale]/(auth)/login/login-form";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const t = await getTranslations("LoginPage");
  return (
    <div>
      <h1 className="text-xl font-semibold text-center">{t("title")}</h1>
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
