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

const headers = {
  "Sec-Fetch-Site": "same-origin",
};

const identityApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOGIN_API_URL ?? "",
  withCredentials: true,
});

class AuthService {
  register(registerRequest: IRegisterRequest): Promise<IRegisterResponse> {
    return identityApi.post("/register", registerRequest);
  }

  login(loginRequest: ILoginRequest, config?: any): Promise<ILoginResponse> {
    return axios.post("https://e-sport.cloud:5001/account/apiLogin", loginRequest, { ...config, withCredentials: true });
  }

  confirm(token: string): Promise<void> {
    return identityApi.get(`/confirm?token=${token}`);
  }
}

export const authService = new AuthService();
