import { cache } from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import categoryApiRequest from "@/apiRequests/category";
import CardCategory from "./_components/card-category";
import { CategoriesResType } from "@/schemaValidations/category.schema";
const getDetail = cache(categoryApiRequest.getAllCategoriesAPI);

export default async function Category() {
  let categories: CategoriesResType = [];
  try {
    const { payload } = await getDetail();

    categories = payload.result;
  } catch (error) {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Loại</h2>
        <Link href="/admin/profile/category/add">
          <Button variant="contained" color="primary">
            + Thêm loại
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((item) => (
          <CardCategory item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
