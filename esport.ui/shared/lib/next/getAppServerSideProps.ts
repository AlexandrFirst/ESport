import { GetServerSideProps } from "next";

import { updateSnackError } from "@shared/lib";
import { AppPageProps, AppServerConfig, wrapper } from "@app/Providers";

export const getAppServerSideProps = <TProps extends AppPageProps>(
  cb: GetServerSideProps<TProps & AppPageProps>,
  ns = ["common"],
  config?: AppServerConfig
) => {
  const { showInitialError = process.env.IS_DEV, onReject } = config || {};

  return wrapper.getServerSideProps<TProps>((store) => async (ctx) => {
    // updateSidebarState(store);
    try {
      const serverSide = await cb(ctx);

      //TODO: fix this
      //@ts-ignore
      if (serverSide?.props) {
        return {
          props: {
            //@ts-ignore
            ...serverSide.props,
            // ...localization,
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
