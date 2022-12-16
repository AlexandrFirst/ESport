import "../styles/globals.css";
import type { AppProps } from "next/app";

import { wrapper } from "@storage/store";

import { Providers } from "@features/Providers/Providers";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return null;
  }
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
