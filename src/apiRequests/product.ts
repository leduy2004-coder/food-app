import http from "@/lib/http";
import { MessageResType } from "@/schemaValidations/common.schema";
import {
  CloudinaryListRes,
  CreateProductBodyType,
  ProductListResType,
  ProductResApiType,
  ProductResType,
  UpdateProductBodyType,
  UpdateProductImageBodyType,
} from "@/schemaValidations/product.schema";

const productApiRequest = {
  getListByUser: (userId: string) =>
    http.get<ProductListResType>(
      `/api/v1/product/get-products-by-user/${userId}`
    ),
  getDetail: (productId: string) =>
    http.get<ProductResApiType>(`/api/v1/product/get-detail-product/${productId}`),

  create: (body: CreateProductBodyType, files?: File[]) => {
    const formData = new FormData();

    const requestBlob = new Blob([JSON.stringify(body)], {
      type: "application/json",
    });
    formData.append("request", requestBlob);

    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }

    return http.post<ProductResType>("/api/v1/product/create", formData);
  },

  updateContent: (body: UpdateProductBodyType) =>
    http.patch<ProductResType>("/api/v1/product/update/content", body),

  updateImage: (body: UpdateProductImageBodyType, files?: File[]) => {
    const formData = new FormData();

    const requestBlob = new Blob([JSON.stringify(body)], {
      type: "application/json",
    });
    formData.append("request", requestBlob);

    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }

    return http.post<CloudinaryListRes>(
      "/api/v1/product/update/image",
      formData
    );
  },

  delete: (productId: string) =>
    http.delete<MessageResType>(
      `/api/v1/product/delete?productId=${productId}`
    ),
};

export default productApiRequest;
