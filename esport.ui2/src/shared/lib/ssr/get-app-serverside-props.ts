import { wrapper } from "@/_app/Providers";

import {
  AppPageProps,
  AppServerSideConfig,
  GetServerSidePropsWithStore,
} from "@/shared/types";

import { checkUserAndRedirect } from "./check-user-and-redirect";
import { Logger } from "..";

export const getAppServerSideProps = <TProps extends AppPageProps>(
  cb: GetServerSidePropsWithStore<TProps>,
  config?: AppServerSideConfig
) => {
  //@ts-ignore
  return wrapper.getServerSideProps<TProps>((store) => async (ctx) => {
    const checkUserResult = checkUserAndRedirect(store, config, ctx);
    try {
      const serverSide = await cb(ctx, store);

      //TODO: fix this
      // @ts-ignore
      if (serverSide?.redirect) {
        return serverSide;
      }
      console.log("===checkUserResult===", checkUserResult);
      //@ts-ignore
      if (serverSide?.props) {
        return {
          ...checkUserResult,
          // @ts-ignore
          redirect: serverSide?.redirect
            ? // @ts-ignore
              serverSide?.redirect
            : // @ts-ignore
            checkUserResult?.redirect
            ? // @ts-ignore
              checkUserResult?.redirect
            : undefined,
          props: {
            // @ts-ignore
            ...serverSide.props,
          },
        };
      }
      return serverSide;
    } catch (e: any) {
      Logger.Debug("===get-app-serversideProps - e===", e);
      const isDev = process.env.NODE_ENV !== "production";
      return {
        ...checkUserResult,
        props: {
          error: isDev ? e.message : "Something went wrong",
        },
      };
    }
  });
};
