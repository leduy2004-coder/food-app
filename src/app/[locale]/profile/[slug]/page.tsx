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

function extractUserIdFromSlug(slug: string | undefined): string {
  console.log("=== DEBUG extractUserIdFromSlug ===");
  console.log("1. Input slug:", slug);
  console.log("2. Type of slug:", typeof slug);

  if (!slug) {
    console.error("Slug is undefined or null");
    return "";
  }

  const temp = slug.split(".html")[0] ?? "";
  console.log("3. After removing .html:", temp);

  const parts = temp.split("-");
  console.log("4. Parts after split:", parts);

  const userId = parts[parts.length - 1] ?? "";
  console.log("5. Extracted userId:", userId);

  if (!userId || userId.trim() === "") {
    console.error("Invalid slug format:", slug);
    return "";
  }

  return userId;
}
// Fetch user data with error handling
async function fetchUserData(userId: string, sessionToken?: string) {
  try {
    const { payload } = await getDetail(userId, sessionToken ?? "");
    return payload.result;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  const userId = extractUserIdFromSlug(slug);

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const user = await fetchUserData(userId, sessionToken);

  const url = `${envConfig.NEXT_PUBLIC_URL}/${locale}/profile/${slug}`;

  // Default metadata if user not found
  if (!user) {
    return {
      title: "Profile Not Found",
      description: "User profile not found",
      alternates: {
        canonical: url,
      },
    };
  }

  return {
    title: user.nickName,
    description: `Profile của ${user.nickName}`,
    openGraph: {
      title: user.nickName,
      description: `Profile của ${user.nickName}`,
      url,
      siteName: "Your Site Name",
      images: [
        {
          url: `/placeholder-profile.jpg`,
          width: 1200,
          height: 630,
          alt: `${user.nickName}'s profile picture`,
        },
      ],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: user.nickName,
      description: `Profile của ${user.nickName}`,
      images: [`/placeholder-profile.jpg`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProductDetail({ params }: Props) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  const userId = extractUserIdFromSlug(slug);

  const t = await getTranslations({
    locale: locale,
    namespace: "ProfilePage",
  });

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const user = await fetchUserData(userId, sessionToken);

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold">{t("notFound")}</h1>
          <p className="text-gray-600">{t("userNotFoundMessage")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="mb-6 text-3xl font-bold">{t("title")}</h1>

      <ProfileInfo
        nickName={user.nickName}
        email={user.email}
        locale={locale}
      />

      <Product userId={user.id} />
    </div>
  );
}
