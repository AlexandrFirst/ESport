import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";
import { appWithTranslation } from "next-i18next";

import { Providers, wrapper } from "@/_app/Providers";

import { updateSidebarState } from "@/widgets/LeftSidebar";
import { updateDeviceState } from "@/shared/model/helpers/update-device-state";
import { ReactElement, ReactNode } from "react";

const font = Nunito({
  subsets: ["latin", "cyrillic-ext", "cyrillic"],
  weight: ["300", "600", "700", "900"],
});

interface Props extends AppProps {
  Component: AppProps["Component"] & {
    getLayout: (page: ReactElement) => ReactNode;
  };
}

function App({ Component, ...restProps }: Props) {
  const { store, props } = wrapper.useWrappedStore(restProps);
  const { pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <Providers store={store}>
      <main className={font.className}>
        <Component {...pageProps} />
      </main>
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
