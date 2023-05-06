import { wrapper } from "@/_app/Providers";

import {
  AppPageProps,
  AppServerSideConfig,
  GetServerSidePropsWithStore,
} from "@/shared/types";

import { checkUserAndRedirect } from "./check-user-and-redirect";

export const getAppServerSideProps = <TProps extends AppPageProps>(
  cb: GetServerSidePropsWithStore<TProps>,
  config?: AppServerSideConfig
) => {
  return wrapper.getServerSideProps<TProps>((store) => async (ctx) => {
    try {
      const serverSide = await cb(ctx, store);
      const checkUserResult = checkUserAndRedirect(store, config, ctx);

      //TODO: fix this
      //@ts-ignore
      if (serverSide?.props) {
        return {
          ...checkUserResult,
          props: {
            // @ts-ignore
            ...serverSide.props,
          },
        };
      }
      return serverSide;
    } catch (e: any) {
      return {
        props: {
          error: JSON.stringify(e),
        },
      };
    }
  });
};
