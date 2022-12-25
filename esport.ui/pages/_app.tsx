import "../styles/globals.css";
import type { AppProps } from "next/app";

import { wrapper } from "@storage/store";
import { Nunito_Sans } from "@next/font/google";

import { Providers } from "@features/Providers/Providers";
import { useEffect, useState } from "react";

const font = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "600", "700", "900"],
});

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

export default wrapper.withRedux(MyApp);
