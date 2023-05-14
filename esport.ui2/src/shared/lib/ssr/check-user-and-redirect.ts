import { GetServerSidePropsContext } from "next";
import { GetServerSidePropsResult } from "next/types";

import { routes } from "@/shared/config";
import { AppServerSideConfig, StateSchemaStore } from "@/shared/types";
import { ReturnUrl } from "@/shared/constants";

export const checkUserAndRedirect = <TProps>(
  store: StateSchemaStore,
  config?: Pick<AppServerSideConfig, "roles" | "auth" | "forbiddenPath">,
  ctx?: GetServerSidePropsContext
): GetServerSidePropsResult<TProps> => {
  const { auth, roles } = config || {};
  const user = store.getState().user.data;

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
    //TODO: check
    const hasPermissions =
      roles?.some((confRole) =>
        user.roles?.some((userRole) => userRole === confRole)
      ) ?? false;
    console.log("===hasPermissions===", hasPermissions);
    // if (roles && roles.length > 0 && !roles.includes(user. as UserRole)) {
    //   return {
    //     redirect: {
    //       destination: getDestination(config?.forbiddenPath ?? routes.Forbidden()),
    //       permanent: false,
    //     },
    //     props: {} as TProps,
    //   };
    // }
  }
  return {
    props: {} as TProps,
  };
};
