import axios, { CreateAxiosDefaults } from "axios";
import Cookies, { parseCookies } from "nookies";

import { AuthToken } from "@/shared/constants";
import { ApiContext } from "@/shared/types";

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
  } = config || {};

  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const token = cookies[AuthToken];

  return axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      Authorization: `${AuthToken} ${token}`,
    },
  });
};
