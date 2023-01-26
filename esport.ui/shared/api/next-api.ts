import { GetServerSidePropsContext, NextPageContext } from "next";
import axios from "axios";

export type ApiReturnType = {
  // user: ReturnType<typeof UserApi>
};

export const Api = (
  ctx?: NextPageContext | GetServerSidePropsContext
): ApiReturnType => {
  // const cookies = ctx ? Cookies.get(ctx) : parseCookies()
  // const token = cookies._token

  // const instance = axios.create({
  //   headers: {
  //     Authorization: 'Bearer ' + token
  //   }
  // })
  return {};
};

export const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

$api.interceptors.response.use(
  (config) => {
    return config.data;
  },
  (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      //TODO: confirm refresh with Sasha
      return $api
        .post(
          "/refresh"
          // {},
          // {
          //   withCredentials: true,
          // }
        )
        .then((res) => {
          if (res.status === 200) {
            return $api.request(originalRequest);
          }
        });
    }
  }
);
