import https from "https";
import axios, { AxiosError, CreateAxiosDefaults } from "axios";

import { AuthToken, ServerStage } from "@/shared/constants";
import { ApiContext } from "@/shared/types";

import { storageService } from "../storageService/storageService";

export interface ApiConfig extends CreateAxiosDefaults {
  ctx?: ApiContext;
}

export const Api = (config?: ApiConfig) => {
  const {
    ctx,
    baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5002",
    headers,
    ...axiosDefaults
  } = config || {};

  const token = storageService(ctx).getToken();

  const instance = axios.create({
    ...axiosDefaults,
    baseURL,
    withCredentials: true,
    headers: {
      ...headers,
      Authorization: token,
      Cookie: ctx ? `${AuthToken} ${token}` : undefined,
    },
  });
  const stage = process.env.STAGE;
  if (stage && stage !== ServerStage.Dev) {
    instance.defaults.httpsAgent = new https.Agent({
      family: 4,
    });
  }
  instance.interceptors.response.use(
    (response) => Promise.resolve(response),
    (error: AxiosError) => {
      return Promise.reject(error.response?.data || error);
    }
  );
  return instance;
};
