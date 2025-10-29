import http from "@/lib/http";
import {
  CategoryCreateType,
  CategoryResType,
} from "@/schemaValidations/category.schema";

const categoryApiRequest = {
  getAllCategoriesAPI: () =>
    http.get<CategoryResType>("/api/v1/product/categories/get-all"),
  createCategoryAPI: (body: CategoryCreateType, file?: File) => {
    const formData = new FormData();

    const requestBlob = new Blob([JSON.stringify(body)], {
      type: "application/json",
    });
    formData.append("request", requestBlob);

    if (file) {
      formData.append("file", file);
    }

    return http.post<CategoryResType>(
      "/api/v1/product/categories/create",
      formData
    );
  },
};

export default categoryApiRequest;
