"use client";
import productApiRequest from "@/apiRequests/product";
import { ProductResType } from "@/schemaValidations/product.schema";
import { useEffect, useState } from "react";
import ProductAddButton from "../../_components/product-add-button";
import ProductCard from "../../_components/product-card";
import { Box, CircularProgress } from "@mui/material";
import SimplePagination from "@/components/pagination/pagination";

type Props = {
  userId: string;
};

const Product = ({ userId }: Props) => {
  const [products, setProducts] = useState<ProductResType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10); // Fixed page size
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        setIsLoading(true);
        const { payload } = await productApiRequest.getListByUser(
          userId,
          page,
          pageSize
        );
        setProducts(payload.result.data);
        setTotalPages(payload.result.totalPages);
        setTotalElements(payload.result.totalElements);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getAllProduct();
  }, [userId, page, pageSize]);

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setTotalElements((prev) => prev - 1);

    // Nếu xóa hết sản phẩm ở page hiện tại và không phải page 1
    if (products.length === 1 && page > 1) {
      setPage(page - 1);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Sản phẩm</h2>
        <ProductAddButton userId={userId} />
      </div>

      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={300}
        >
          <CircularProgress />
        </Box>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          Chưa có sản phẩm nào. Hãy thêm sản phẩm mới!
        </p>
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

          <SimplePagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalElements}
            itemsPerPage={pageSize}
            onPageChange={handlePageChange}
            size="large"
          />
        </>
      )}
    </section>
  );
};

export default Product;
