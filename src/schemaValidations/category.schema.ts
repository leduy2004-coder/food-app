import z from "zod";
import { ApiResponse } from "./common.schema";

export const CategoryItem = z.object({
  id: z.string(),
  name: z.string(),
  img: z.object({
    fileName: z.string(),
    url: z.string(),
  }),
});
export const CreateCategory = z.object({
  name: z.string(),
});
export const Categories = z.array(CategoryItem)
export const CategoryRes = ApiResponse(Categories);

export type CategoryItemType = z.infer<typeof CategoryItem>;
export type CategoryResType = z.infer<typeof CategoryRes>;
export type CategoriesResType = z.infer<typeof Categories>;
export type CategoryCreateType = z.infer<typeof CreateCategory>;