import axios, { CreateAxiosDefaults } from "axios";
import Cookies, { parseCookies } from "nookies";

import { AuthToken } from "@/shared/constants";
import { ApiContext } from "@/shared/types";
import https from "https";

export const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

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

  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const token = cookies[AuthToken];

  const instance = axios.create({
    ...axiosDefaults,
    baseURL,
    withCredentials: true,
    headers: {
      ...headers,
      Authorization: token,
      Cookie: `${AuthToken} ${token}`,
    },
  });
  if (process.env.STAGE !== "Development") {
    instance.defaults.httpsAgent = new https.Agent({
      family: 4,
    });
  }
  return instance;
};
