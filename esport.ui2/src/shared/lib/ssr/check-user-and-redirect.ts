import { GetServerSidePropsContext } from "next";
import { GetServerSidePropsResult } from "next/types";

import { routes } from "@/shared/config";
import { AppServerSideConfig, StateSchemaStore } from "@/shared/types";
import { ReturnUrl, UserRole } from "@/shared/constants";

export const checkUserAndRedirect = <TProps>(
  store: StateSchemaStore,
  config?: Pick<AppServerSideConfig, "roles" | "auth">,
  ctx?: GetServerSidePropsContext
): GetServerSidePropsResult<TProps> => {
  const { auth, roles } = config || {};
  const user = store.getState().user.account;

  const getDestination = (destination: string) => {
    return `${destination}?${ReturnUrl}=${ctx?.resolvedUrl}`;
  };

  if (auth || roles) {
    if (!user) {
      return {
        redirect: {
          destination: getDestination(routes.Login()),
          permanent: false,
        },
        props: {} as TProps,
      };
    }
    if (roles && roles.length > 0 && !roles.includes(user.role as UserRole)) {
      return {
        redirect: {
          destination: getDestination(routes.Forbidden()),
          permanent: false,
        },
        props: {} as TProps,
      };
    }
  }
  return {
    props: {} as TProps,
  };
};
