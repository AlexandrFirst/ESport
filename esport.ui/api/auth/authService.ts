import axios from "axios";
import * as process from "process";

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

class AuthService {
  identityApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_LOGIN_API_URL ?? "",
  });

  register(registerRequest: IRegisterRequest): Promise<IRegisterResponse> {
    return this.identityApi.post("/register", registerRequest);
  }

  login(loginRequest: ILoginRequest): Promise<ILoginResponse> {
    return this.identityApi.post("/apiLogin", loginRequest);
  }

  confirm(token: string): Promise<void> {
    return this.identityApi.get(`/confirm?token=${token}`);
  }
}

export const authService = new AuthService();
