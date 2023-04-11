import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";
import { appWithTranslation } from "next-i18next";

import cn from "classnames";

import { Providers, useTheme, wrapper } from "@/_app/Providers";

import { updateSidebarState } from "@/features/LeftSidebar";

const font = Nunito({
  subsets: ["latin", "cyrillic-ext", "cyrillic"],
  weight: ["300", "600", "700", "900"],
});

function App({ Component, ...restProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(restProps);
  const { pageProps } = props;

  const { theme } = useTheme();

  return (
    <Providers store={store}>
      <main className={cn(font.className, theme)}>
        <Component {...pageProps} />
      </main>
    </Providers>
  );
}

App.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ ctx, Component }) => {
      updateSidebarState(store);
      //Implement auth logic here
      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps({ ...ctx, store })
            : {}),
          // Some custom thing for all pages
          pathname: ctx.pathname,
        },
      };
    }
);

export default appWithTranslation(App);
