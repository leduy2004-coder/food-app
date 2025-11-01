import productApiRequest from "@/apiRequests/product";
import ProductAddForm from "@/app/[locale]/profile/_components/product-add-form";
import { cookies } from "next/headers";

import { Metadata } from "next";
import { cache } from "react";

const getDetail = cache(productApiRequest.getDetailFromNextServerToServer);

type Props = {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  const { payload } = await getDetail(params.productId, sessionToken!);
  const product = payload.result;
  return {
    title: "Edit sản phẩm: " + product.name,
    description: product.description,
  };
}

export default async function ProductEdit(props: Props) {
  const params = await props.params;
  let product = null;
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  try {
    const { payload } = await getDetail((await params).productId, sessionToken!);
    console.log(payload)
    product = payload.result;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {}

  return (
    <div>
      {!product && <div>Không tìm thấy sản phẩm</div>}
      {product && <ProductAddForm product={product} />}
    </div>
  );
}
