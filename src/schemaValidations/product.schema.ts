import { ApiResponse } from "./common.schema";
import z from "zod";

export const CreateProductBody = z.object({
  name: z.string().min(1).max(256),
  price: z.number(),
  description: z.string().max(10000),
  categoryId: z.string(),
});

export type CreateProductBodyType = z.TypeOf<typeof CreateProductBody>;

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  categoryId: z.string(),
  imgUrl: z.array(
    z.object({
      fileName: z.string(),
      url: z.string(),
    })
  ),
  user: z.object({
    email: z.string(),
    nickName: z.string(),
    id: z.string(),
  }),
});
export const ProductRes = ApiResponse(ProductSchema);
export type ProductResApiType = z.TypeOf<typeof ProductRes>;
export type ProductResType = z.TypeOf<typeof ProductSchema>;

export const ProductListRes = ApiResponse(
  z.object({
    data: z.array(ProductSchema),
    message: z.string(),
  })
);

export type ProductListResType = z.TypeOf<typeof ProductListRes>;

export const UpdateProductBody = CreateProductBody.extend({
  id: z.string(),
});

export type UpdateProductBodyType = z.TypeOf<typeof UpdateProductBody>;

export const ProductParams = z.object({
  id: z.coerce.number(),
});
export type ProductParamsType = z.TypeOf<typeof ProductParams>;

export const ProductId = z.object({
  productId: z.string(),
});

export type UpdateProductImageBodyType = z.TypeOf<typeof ProductId>;

export const CloudRes = ApiResponse(
  z.array(
    z.object({
      productId: z.string(),
    })
  )
);

export type CloudinaryListRes = z.TypeOf<typeof CloudRes>;
