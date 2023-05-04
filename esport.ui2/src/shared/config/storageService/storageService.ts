import * as cookie from "cookie";
import Cookies, { destroyCookie, parseCookies, setCookie } from "nookies";

import { ApiContext } from "@/shared/types";
import { AuthToken } from "@/shared/constants";

export function storageService(ctx?: ApiContext) {
  return {
    setToken(
      key: string,
      value: string,
      options?: cookie.CookieSerializeOptions
    ) {
      setCookie(ctx, key, value, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        ...options,
      });
    },

    removeToken(key: string) {
      destroyCookie(ctx, key);
    },

    getCookies() {
      return ctx ? Cookies.get(ctx) : parseCookies();
    },

    getToken() {
      const cookies = this.getCookies();
      return cookies[AuthToken];
    },
  };
}
