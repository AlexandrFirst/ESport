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

const authApi = axios.create({ baseURL: "/api/auth" });

class AuthService {
  register(registerRequest: IRegisterRequest): Promise<IRegisterResponse> {
    return authApi.post("/register", registerRequest);
  }

  login(loginRequest: ILoginRequest): Promise<ILoginResponse> {
    return authApi.post("/login", loginRequest);
  }

  confirm(token: string): Promise<void> {
    return authApi.get(
      `${process.env.NEXT_PUBLIC_LOGIN_API_URL}/confirm?token=${token}`
    );
  }

  test(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  }
}

export const authService = new AuthService();
