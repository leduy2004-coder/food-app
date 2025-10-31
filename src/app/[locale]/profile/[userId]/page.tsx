import authApiRequest from "@/apiRequests/auth";
import { Metadata } from "next";
import { cache } from "react";
import envConfig from "@/config";
import { ProfileInfo } from "@/components/profile";
import Product from "./product/page";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
const getDetail = cache(authApiRequest.getUserFromNextServerToServer);
type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  // Await params để lấy giá trị
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;

  const temp = slug?.split(".html") ?? [];
  const temp1 = (temp[0]?.split("-") ?? []) as string[];
  const userId = temp1[temp1.length - 1] ?? "";

  const { payload } = await getDetail(userId, sessionToken!);
  const user = payload.result;

  const url = `${envConfig.NEXT_PUBLIC_URL}/${locale}/profile/${user.id}`;

  return {
    title: user.nickName,
    description: `Profile của ${user.nickName}`,
    openGraph: {
      title: user.nickName,
      description: `Profile của ${user.nickName}`,
      url,
      images: [
        {
          url: `/placeholder-profile.jpg`,
        },
      ],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProductDetail({ params }: Props) {
  // Await params trước khi sử dụng
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;

  const temp = slug?.split(".html") ?? [];
  const temp1 = (temp[0]?.split("-") ?? []) as string[];
  const userId = temp1[temp1.length - 1] ?? "";

  const t = await getTranslations({
    locale: locale,
    namespace: "ProfilePage",
  });

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  let user = null;
  try {
    const { payload } = await getDetail(userId, sessionToken!);
    user = payload.result;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {}

  return (
    <div>
      {!user && <div>{t("notFound")}</div>}
      {user && (
        <div className="container mx-auto px-6 py-8">
          <h1 className="mb-6 text-3xl font-bold">{t("title")}</h1>

          <ProfileInfo
            nickName={user?.nickName || ""}
            email={user?.email || ""}
            locale={locale}
          />

          <Product userId={user.id} />
        </div>
      )}
    </div>
  );
}
