import { GetServerSideProps } from "next";

import {
  AppPageProps,
  getAppServerSideTranslations,
  updateSidebarState,
  wrapper,
} from "@app/store";

export const getAppServerSideProps = <TProps extends AppPageProps>(
  cb: GetServerSideProps<TProps & AppPageProps>,
  ns = ["common"]
) => {
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
    } catch (e) {
      return {
        props: {
          error: e,
        },
      };
    }
  });
};
