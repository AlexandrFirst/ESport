import { GetStaticProps } from "next";

import {
  AppPageProps,
  getAppServerSideTranslations,
  updateSidebarState,
  wrapper,
} from "@app/store";

export const getAppStaticProps = <TProps extends AppPageProps>(
  cb: GetStaticProps<TProps & AppPageProps>,
  ns = ["common"]
) => {
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
    } catch (e) {
      return {
        props: {
          error: e,
        },
      };
    }
  });
};
