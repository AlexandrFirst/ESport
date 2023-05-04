import { GetServerSidePropsContext } from "next";
import { GetServerSidePropsResult } from "next/types";

import { routes } from "@/shared/config";
import { AppServerSideConfig, StateSchemaStore } from "@/shared/types";

import { UserRole } from "@/entities/user";

export const checkUserAndRedirect = <TProps>(
  store: StateSchemaStore,
  config?: Pick<AppServerSideConfig, "roles" | "auth">,
  ctx?: GetServerSidePropsContext
): GetServerSidePropsResult<TProps> => {
  const { auth, roles } = config || {};
  const user = store.getState().user.data;

  if (auth || roles) {
    const forbiddenPage = routes.Forbidden();
    const failedResult = {
      redirect: {
        destination: `${forbiddenPage}?returnUrl=${ctx?.resolvedUrl}`,
        permanent: false,
      },
      props: {} as TProps,
    };

    if (auth && !user) {
      return failedResult;
    }
    if (roles && roles.length > 0 && !roles.includes(user?.role as UserRole)) {
      return failedResult;
    }
  }
  return {
    props: {} as TProps,
  };
};
