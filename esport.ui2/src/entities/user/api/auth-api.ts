import axios from "axios";

import { Api, storageService } from "@/shared/config";
import { AuthToken } from "@/shared/constants";
import { ApiContext } from "@/shared/types";

import { IUser } from "../model/types/user";

export interface IRegisterRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  telephoneNumber: string;
}

export interface IRegisterResponse {
  isSuccess: boolean;
  error: string[];
}

export interface ILoginRequest {
  mail: string;
  password: string;
  remmemberMe?: boolean;
}

export interface ILoginResponse {
  refreshToken?: string;
  token: string;
}

const authApi = axios.create({ baseURL: "/api/auth" });

export const AuthService = (ctx?: ApiContext) => {
  const instance = Api({ ctx, baseURL: process.env.NEXT_PUBLIC_LOGIN_API_URL });

  return {
    register(registerRequest: IRegisterRequest): Promise<IRegisterResponse> {
      return authApi.post("/register", registerRequest);
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
      return instance.get<IUser>("/info");
    },
  };
};

// export const authService = AuthService(axios);
