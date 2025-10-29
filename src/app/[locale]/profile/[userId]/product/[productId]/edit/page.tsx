import productApiRequest from "@/apiRequests/product";
import ProductAddForm from "@/app/[locale]/profile/_components/product-add-form";

import { Metadata } from "next";
import { cache } from "react";

const getDetail = cache(productApiRequest.getDetail);

type Props = {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { payload } = await getDetail(params.productId);
  const product = payload.result;
  return {
    title: "Edit sản phẩm: " + product.name,
    description: product.description,
  };
}

export default async function ProductEdit(props: Props) {
  const params = await props.params;
  let product = null;
  try {
    const { payload } = await getDetail(params.productId);
    product = payload.result;
  } catch (error) {}

  return (
    <div>
      {!product && <div>Không tìm thấy sản phẩm</div>}
      {product && <ProductAddForm product={product} />}
    </div>
  );
}
