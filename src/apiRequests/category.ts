import http from "@/lib/http";
import { CategoryResType } from "@/schemaValidations/category.schema";

const categoryApiRequest = {
  getAllCategoriesAPI: () =>
    http.get<CategoryResType>("/api/v1/product/categories/get-all"),
};

export default categoryApiRequest;
