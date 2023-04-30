import "@/styles/globals.css";

import { Nunito } from "next/font/google";
import { appWithTranslation } from "next-i18next";

import { Providers, wrapper } from "@/_app/Providers";

import { updateDeviceState } from "@/shared/model";
import { AppPageProps } from "@/shared/types";

import { updateSidebarState } from "@/widgets/LeftSidebar";
import { updateStoreUser } from "@/entities/user";

const font = Nunito({
  subsets: ["latin", "cyrillic-ext", "cyrillic"],
  weight: ["300", "600", "700", "900"],
});

function App({ Component, ...restProps }: AppPageProps) {
  const { store, props } = wrapper.useWrappedStore(restProps);
  const { pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  const component = getLayout(<Component {...pageProps} />);

  return (
    <Providers store={store}>
      <main className={font.className}>{component}</main>
    </Providers>
  );
}

App.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ ctx, Component }) => {
      const pageProps = {
        ...(Component.getInitialProps
          ? await Component.getInitialProps({ ...ctx, store })
          : {}),
      };

      updateSidebarState(store);
      updateDeviceState(
        store,
        ctx.req?.headers["user-agent"] ?? navigator.userAgent
      );

      if (!!ctx.req) {
        await updateStoreUser(ctx.req, store);
      }
      // @ts-ignore
      if (Component.auth) {
        const user = store.getState().user.user;
        //TODO: HANDLE REDIRECT USER IF NOT AUTHORIZED
        if (!user) {
          // redirect(routes.Forbidden(), ctx?.res);
          return {
            pageProps,
          };
        }
        //@ts-ignore
        if (Component.auth?.length > 0) {
          //@ts-ignore
          if (!Component.auth?.includes(user?.role)) {
            // redirect(routes.Forbidden(), ctx?.res);
            return {
              pageProps,
            };
          }
        }
      }

      return {
        pageProps,
      };
    }
);

// @ts-ignore
export default appWithTranslation(App);
