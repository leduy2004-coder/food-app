import z from "zod";
import { ApiResponse } from "./common.schema";
export const RegisterBody = z
  .object({
    username: z.string().trim().min(2).max(256),
    nickName: z.string().trim().min(2).max(256),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });
export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const UserProfileToken = z.object({
  id: z.string(),
  access_token: z.string(),
  refresh_token: z.string(),
  nickName: z.string(),
  email: z.string(),
  roles: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      code: z.string(),
    })
  ),
});
export type RegisterResType = Promise<z.infer<typeof ApiResponse>>;

export const LoginBody = z
  .object({
    username: z.string,
    password: z.string().min(6).max(100),
  })
  .strict();
export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = ApiResponse(UserProfileToken);
export type LoginResType = z.TypeOf<typeof LoginRes>;

export const SlideSessionBody = z.object({}).strict();
export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>;

// export const SlideSessionRes = RegisterRes;
// export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>;
