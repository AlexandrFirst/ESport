import "@/styles/globals.css";

import { Nunito } from "next/font/google";
import { appWithTranslation } from "next-i18next";

import { Providers, wrapper } from "@/_app/Providers";

import { updateDeviceState } from "@/shared/model";
import { AppPageProps } from "@/shared/types";

import { updateSidebarState } from "@/widgets/LeftSidebar";

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
      updateSidebarState(store);
      updateDeviceState(
        store,
        ctx.req?.headers["user-agent"] ?? navigator.userAgent
      );

      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps({ ...ctx, store })
            : {}),
        },
      };
    }
);

// @ts-ignore
export default appWithTranslation(App);
