import { getTranslations } from "next-intl/server";

type Props = {
  nickName: string;
  email: string;
  locale: string;
};

export default async function ProfileInfo({ nickName, email, locale }: Props) {
  const t = await getTranslations({ locale, namespace: "ProfilePage" });
  return (
    <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        {t("heading")}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <span className="mb-1 block text-sm text-gray-600">
            {t("nickname")}
          </span>
          <p className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-800">
            {nickName}
          </p>
        </div>
        <div>
          <span className="mb-1 block text-sm text-gray-600">{t("email")}</span>
          <p className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-800">
            {email}
          </p>
        </div>
      </div>
    </section>
  );
}
