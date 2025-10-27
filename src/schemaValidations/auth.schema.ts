import z from "zod";
import { ApiResponse } from "./common.schema";
export const RegisterBody = z
  .object({
    username: z.string().trim().min(2).max(256),
    nickName: z.string().trim().min(2).max(256),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    status: z.boolean().optional(),
    roles: z.array(
    z.object({
      code: z.string(),
    })
  ),
  })
  .strict();

export type RegisterBodyType = z.infer<typeof RegisterBody>;

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
    username: z.string(),
    password: z.string().max(100),
  })
  .strict();
export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = ApiResponse(UserProfileToken);
export type LoginResType = z.TypeOf<typeof LoginRes>;

export type UserProfile = z.infer<typeof UserProfileToken>;

export const SlideSessionBody = z.object({}).strict();
export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>;

export const SlideSessionRes = UserProfileToken;
export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>;
