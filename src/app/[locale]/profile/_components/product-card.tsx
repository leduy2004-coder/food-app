import DeleteProduct from "./delete-product";
import { ProductResType } from "@/schemaValidations/product.schema";
import ProductEditButton from "./product-edit-button";
import Image from "@/components/image";

type Props = {
  product: ProductResType;
  userId: string;
  onDelete?: (productId: string) => void; 
};

const ProductCard = ({ product, userId, onDelete }: Props) => {
  return (
    <article className="rounded-lg border border-gray-200 p-4">
      <div className="relative mb-3 h-40 w-full">
        <Image
          src={product?.imgUrl[0]?.url}
          alt={product.name}
          className="rounded-md"
          loading="eager"
        />
      </div>
      <div className="mb-2 font-semibold text-gray-800">{product.name}</div>

      <div className="mb-3 text-gray-600">
        {product.price.toLocaleString()} đ
      </div>
      <div className="flex gap-2">
        <ProductEditButton product={product} userId={userId} />

        <DeleteProduct product={product} onDeleteSuccess={onDelete} />
      </div>
    </article>
  );
};

export default ProductCard;
