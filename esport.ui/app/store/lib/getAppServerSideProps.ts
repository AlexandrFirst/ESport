import { GetServerSideProps } from "next";

import {
  AppPageProps,
  AppServerConfig,
  getAppServerSideTranslations,
  updateSidebarState,
  updateSnackError,
  wrapper,
} from "@app/store";

export const getAppServerSideProps = <TProps extends AppPageProps>(
  cb: GetServerSideProps<TProps & AppPageProps>,
  ns = ["common"],
  config?: AppServerConfig
) => {
  const { showInitialError = process.env.IS_DEV, onReject } = config || {};

  return wrapper.getServerSideProps<TProps>((store) => async (ctx) => {
    updateSidebarState(store);
    try {
      const [localization, serverSide] = await Promise.all([
        getAppServerSideTranslations(ctx, ns),
        cb(ctx),
      ]);
      //TODO: fix this
      //@ts-ignore
      if (serverSide?.props) {
        return {
          props: {
            //@ts-ignore
            ...serverSide.props,
            ...localization,
          },
        };
      }
      return serverSide;
    } catch (e: any) {
      if (showInitialError) {
        updateSnackError(store, e?.message ?? "Something went wrong");
      }
      const rejected = onReject?.(e);
      return {
        props: {
          error: e,
          ...rejected?.props,
        },
      };
    }
  });
};
