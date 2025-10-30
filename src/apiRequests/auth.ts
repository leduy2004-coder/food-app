import http from "@/lib/http";

import {
  LoginBodyType,
  LoginRes,
  RegisterBodyType,
  RegisterResType,
  UserResType,
} from "@/schemaValidations/auth.schema";
import { MessageResType } from "@/schemaValidations/common.schema";

const authApiRequest = {
  login: (body: LoginBodyType) =>
    http.post<LoginRes>("/api/v1/auth/auth2/authenticate", body),
  register: (body: RegisterBodyType) =>
    http.post<RegisterResType>("/api/v1/auth/users/register", body),
  auth: (body: { sessionToken: string; expiresAt: string ; role: string}) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),
  getUserFromNextServerToServer: (id: string, sessionToken: string) =>
    http.get<UserResType>(`/api/v1/auth/users/get-user?id=${id}`, {
      headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
    }),
  logoutFromNextServerToServer: (sessionToken: string) =>
    http.post<MessageResType>(
      "/api/v1/auth/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),
  logoutFromNextClientToNextServer: ( 
    force?: boolean | undefined,
    signal?: AbortSignal | undefined
  ) =>
    http.post<MessageResType>(
      "/api/auth/logout",
      {
        force,
      },
      {
        baseUrl: "",
        signal,
      }
    ),
};

export default authApiRequest;
