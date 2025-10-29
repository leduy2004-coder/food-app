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
export type RegisterResType = Promise<z.infer<typeof ApiResponse>>;

export const UserProfile = z.object({
  id: z.string(),
  nickName: z.string(),
  email: z.string(),
  roles: z.array(
    z.object({ id: z.string(), name: z.string(), code: z.string() })
  ),
});

export type UserProfileType = z.infer<typeof UserProfile>;

// Dành riêng cho login (có thêm token)
export const UserProfileToken = UserProfile.extend({
  access_token: z.string(),
  refresh_token: z.string(),
});

export type LoginResType = z.infer<typeof UserProfileToken>;

// API response types
export const UserRes = ApiResponse(UserProfile);
export const UserProfileTokenType = ApiResponse(UserProfileToken);

export type LoginRes = z.infer<typeof UserProfileTokenType>;

export type UserResType = z.TypeOf<typeof UserRes>;

export const LoginBody = z
  .object({ username: z.string(), password: z.string().max(100) })
  .strict();
export type LoginBodyType = z.TypeOf<typeof LoginBody>;
