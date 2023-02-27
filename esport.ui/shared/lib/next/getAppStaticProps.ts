import { GetStaticProps } from "next";

import { updateSnackError } from "@shared/lib";
import { AppPageProps, AppServerConfig, wrapper } from "@app/Providers";

export const getAppStaticProps = <TProps extends AppPageProps>(
  cb: GetStaticProps<TProps & AppPageProps>,
  ns = ["common"],
  config?: AppServerConfig
) => {
  const { showInitialError = process.env.IS_DEV, onReject } = config || {};

  return wrapper.getStaticProps<TProps>((store) => async (ctx) => {
    // updateSidebarState(store);
    try {
      const getStatic = await cb(ctx);
      //TODO: fix this

      //@ts-ignore
      if (getStatic?.props) {
        return {
          props: {
            //@ts-ignore
            ...getStatic.props,
            // ...localization,
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
