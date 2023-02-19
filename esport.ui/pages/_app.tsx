import "../app/styles/globals.css";

import type { AppProps } from "next/app";
import { Nunito_Sans } from "@next/font/google";
import { appWithTranslation } from "next-i18next";

import { wrapper } from "@app/store/store";

import { Providers } from "@app/Providers/Providers";

const font = Nunito_Sans({
  subsets: ["latin", "cyrillic-ext", "cyrillic"],
  weight: ["300", "600", "700", "900"],
});

function MyApp({ Component, ...restProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(restProps);
  const { pageProps } = props;

  // const { withMainLayout = true } = pageProps;

  // const [showChild, setShowChild] = useState(false);

  // useEffect(() => {
  //   setShowChild(true);
  // }, []);

  // if (!showChild) {
  //   return null;
  // }

  // if (typeof window === "undefined") {
  //   return null;
  // }

  return (
    <Providers store={store}>
      <main className={font.className}>
        <Component {...pageProps} />
      </main>
    </Providers>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ ctx, Component }) => {
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
export default appWithTranslation(MyApp);

// export default wrapper.withRedux(MyApp);
