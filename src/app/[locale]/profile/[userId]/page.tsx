import authApiRequest from "@/apiRequests/auth";
import { Metadata } from "next";
import { cache } from "react";
import envConfig from "@/config";
import { ProfileInfo } from "@/components/profile";
import Product from "./product/page";
import { cookies } from "next/headers";

const getDetail = cache(authApiRequest.getUserFromNextServerToServer);

type Props = {
  params: Promise<{ userId: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = props.params;
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  // Lấy thông tin user theo id
  const { payload } = await getDetail((await params).userId, sessionToken!);
  const user = payload.result;

  const url = `${envConfig.NEXT_PUBLIC_URL}/profile/${user.id}`;

  return {
    title: user.nickName,
    description: `Profile của ${user.nickName}`,
    openGraph: {
      title: user.nickName,
      description: `Profile của ${user.nickName}`,
      url,
      images: [
        {
          url: `/placeholder-profile.jpg`, // nếu user có avatar thì thay bằng user.avatar
        },
      ],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProductDetail(props: Props) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  const params = await props.params;
  let user = null;
  console.log(sessionToken);
  try {
    const { payload } = await getDetail(params.userId, sessionToken!);

    user = payload.result;
  } catch (error) {}

  return (
    <div>
      {!user && <div>Không tìm thấy sản thông tin</div>}
      {user && (
        <div className="container mx-auto px-6 py-8">
          <h1 className="mb-6 text-3xl font-bold text-gray-800">
            Hồ sơ cá nhân
          </h1>

          <ProfileInfo
            nickName={user?.nickName || ""}
            email={user?.email || ""}
          />

          <Product userId={user.id} />
        </div>
      )}
    </div>
  );
}
