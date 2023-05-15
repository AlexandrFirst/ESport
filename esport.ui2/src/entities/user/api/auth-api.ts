import axios from "axios";

import { Api, storageService } from "@/shared/config";
import { AuthToken } from "@/shared/constants";
import { ApiContext } from "@/shared/types";

import { IRegisterRequest, IRegisterResponse } from "./types/register";
import { ILoginRequest, ILoginResponse } from "./types/login";
import { GetUserResponse } from "./types/get-user";

const authApi = axios.create({ baseURL: "/api/auth" });

export const AuthService = (ctx?: ApiContext) => {
  const instance = Api({ ctx, baseURL: process.env.NEXT_PUBLIC_LOGIN_API_URL });

  return {
    register(registerRequest: IRegisterRequest) {
      return instance.post<IRegisterResponse>("/register", registerRequest);
    },

    async login(loginRequest: ILoginRequest): Promise<ILoginResponse> {
      const { data } = await instance.post<ILoginResponse>(
        `/apiLogin`,
        loginRequest
      );
      storageService(ctx).setToken(AuthToken, data.token);
      return data;
    },

    confirm(token: string): Promise<void> {
      return authApi.get(
        `${process.env.NEXT_PUBLIC_LOGIN_API_URL}/confirm?token=${token}`
      );
    },

    async getUser() {
      return instance.get<GetUserResponse>("/info");
    },

    async logout() {
      return instance.post<void>("/apiLogout");
    },
  };
};

// export const authService = AuthService(axios);
