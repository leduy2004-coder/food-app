"use client";
import productApiRequest from "@/apiRequests/product";
import { ProductResType } from "@/schemaValidations/product.schema";

import { useEffect, useState } from "react";
import ProductAddButton from "../../_components/product-add-button";
import ProductCard from "../../_components/product-card";

type Props = {
  userId: string;
};

const Product = ({ userId }: Props) => {
  const [products, setProducts] = useState<ProductResType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getAllProduct = async () => {
      try {
        setIsLoading(true);
        const { payload } = await productApiRequest.getListByUser(userId);
        setProducts(payload.result.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getAllProduct();
  }, []);
  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Sản phẩm</h2>
        <ProductAddButton userId={userId} />
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">Đang tải sản phẩm...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                userId={userId}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>

          {/* <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => {
              setPage(newPage);
              refreshProducts(newPage);
            }}
          /> */}
        </>
      )}
    </section>
  );
};

export default Product;
