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

export const CategoryRes = ApiResponse(z.array(CategoryItem));

export type CategoryItemType = z.infer<typeof CategoryItem>;
export type CategoryResType = z.infer<typeof CategoryRes>;