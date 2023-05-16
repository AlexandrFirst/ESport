import "@/styles/globals.css";

import { Nunito } from "next/font/google";
import { appWithTranslation } from "next-i18next";

import { Providers, wrapper } from "@/_app/Providers";

import { updateDeviceState } from "@/shared/model";
import { IAppPageProps } from "@/shared/types";

import { updateSidebarState } from "@/widgets/LeftSidebar";
import { updateStoreUser } from "@/entities/user";

const font = Nunito({
  subsets: ["latin", "cyrillic-ext", "cyrillic"],
  weight: ["300", "600", "700", "900"],
});

function App({ Component, ...restProps }: IAppPageProps) {
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
        await updateStoreUser(ctx, store);
      }

      return {
        pageProps,
      };
    }
);

export default appWithTranslation(App);
