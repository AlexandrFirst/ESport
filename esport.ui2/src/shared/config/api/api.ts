import https from "https";
import axios, { AxiosError, CreateAxiosDefaults } from "axios";

import { AuthToken, ServerStage } from "@/shared/constants";
import { ApiContext } from "@/shared/types";

import { storageService } from "../storageService/storageService";

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

  // instance.interceptors.request.use((config) => {
  //   recaptcha.enterprise.ready(async () => {
  //     const token = await grecaptcha.enterprise.execute(
  //       "6LdUdJ4mAAAAAEH11QOssCwO6M9zS7sIkreb2qCZ",
  //       { action: "LOGIN" }
  //     );
  //     // IMPORTANT: The 'token' that results from execute is an encrypted response sent by
  //     // reCAPTCHA Enterprise to the end user's browser.
  //     // This token must be validated by creating an assessment.
  //     // See https://cloud.google.com/recaptcha-enterprise/docs/create-assessment
  //   });
  //
  //   return config;
  // });

  return instance;
};
