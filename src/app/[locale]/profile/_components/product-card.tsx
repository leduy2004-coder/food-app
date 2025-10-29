
import DeleteProduct from "./delete-product";
import { ProductResType } from "@/schemaValidations/product.schema";
import ProductEditButton from "./product-edit-button";
import Image from "@/components/image";

type Props = {
  product: ProductResType;
  userId: string;
};

const ProductCard = ({ product, userId }: Props) => {
  return (
    <article className="rounded-lg border border-gray-200 p-4">
      <Image
        src={product?.imgUrl?.url}
        alt={product.name}
        className="mb-3 h-40 w-full rounded-md"
      />
      <div className="mb-2 font-semibold text-gray-800">{product.name}</div>

      <div className="mb-3 text-gray-600">
        {product.price.toLocaleString()} đ
      </div>
      <div className="flex gap-2">
        <ProductEditButton product={product} userId={userId} />

        <DeleteProduct product={product} />
      </div>
    </article>
  );
};

export default ProductCard;
