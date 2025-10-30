import z from "zod";

export const MessageRes = z
  .object({
    message: z.string(),
  })
  .strict();

export type MessageResType = z.TypeOf<typeof MessageRes>;

export const ApiResponse = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    code: z.number(),
    result: schema,
    message: z.string().optional(),
    status: z.union([z.string(), z.number()]).optional(),
  });

export const PageResponse = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    currentPage: z.number(),
    pageSize: z.number(),
    totalElements: z.number(),
    totalPages: z.number(),
    data: z.array(schema),
  });
