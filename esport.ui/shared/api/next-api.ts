import { GetServerSidePropsContext, NextPageContext } from "next";

export type ApiReturnType = {
  // user: ReturnType<typeof UserApi>
};

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
  // const cookies = ctx ? Cookies.get(ctx) : parseCookies()
  // const token = cookies._token

  // const instance = axios.create({
  //   headers: {
  //     Authorization: 'Bearer ' + token
  //   }
  // })
  return {}
}
