import { GetStaticProps } from "next";

import {
  AppPageProps,
  AppServerConfig,
  getAppServerSideTranslations,
  updateSidebarState,
  updateSnackError,
  wrapper,
} from "@app/store";

export const getAppStaticProps = <TProps extends AppPageProps>(
  cb: GetStaticProps<TProps & AppPageProps>,
  ns = ["common"],
  config?: AppServerConfig
) => {
  const { showInitialError = process.env.IS_DEV, onReject } = config || {};

  return wrapper.getStaticProps<TProps>((store) => async (ctx) => {
    updateSidebarState(store);
    try {
      const [localization, getStatic] = await Promise.all([
        getAppServerSideTranslations(ctx, ns),
        cb(ctx),
      ]);
      //TODO: fix this

      //@ts-ignore
      if (getStatic?.props) {
        return {
          props: {
            //@ts-ignore
            ...getStatic.props,
            ...localization,
          },
        };
      }
      return getStatic;
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
