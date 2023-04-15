import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";
import { appWithTranslation } from "next-i18next";

import { Providers, wrapper } from "@/_app/Providers";

import { updateSidebarState } from "@/widgets/LeftSidebar";
import { Snackbar } from "@/features/Snackbar";

const font = Nunito({
  subsets: ["latin", "cyrillic-ext", "cyrillic"],
  weight: ["300", "600", "700", "900"],
});

function App({ Component, ...restProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(restProps);
  const { pageProps } = props;

  return (
    <Providers store={store}>
      <main className={font.className}>
        <Snackbar>
          <Component {...pageProps} />
        </Snackbar>
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
