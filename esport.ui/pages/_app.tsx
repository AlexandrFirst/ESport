import "../styles/globals.css";
import type { AppProps } from "next/app";

import { wrapper } from "@storage/store";

import { Providers } from "@features/Providers/Providers";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
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

export default wrapper.withRedux(MyApp);
