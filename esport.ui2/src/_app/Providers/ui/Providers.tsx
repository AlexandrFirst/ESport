import React, { FC, ReactNode } from "react";
import { Store } from "@reduxjs/toolkit";
import { CombinedState } from "redux";
import { ThemeProvider } from "next-themes";
import { ReCaptchaProvider } from "next-recaptcha-v3";

import { StateSchema } from "../config/store/StateSchema";

import { Snackbar } from "@/features/Snackbar";

import { LOCAL_STORAGE_THEME_KEY } from "../lib/ThemeContext";

import { QueryProvider } from "./QueryProvider";
import { StoreProvider } from "./StoreProvider";

interface ProvidersProps {
  store: Store<CombinedState<StateSchema>>;
  children: ReactNode;
  pageProps: any;
}

export const Providers: FC<ProvidersProps> = ({
  store,
  children,
  pageProps,
}) => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider
        storageKey={LOCAL_STORAGE_THEME_KEY}
        //TODO: add more themes
        // themes={["pink", "red", "blue", "light", "dark"]}
      >
        <Snackbar>
          <QueryProvider pageProps={pageProps}>
            <ReCaptchaProvider
              reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
            >
              {children}
            </ReCaptchaProvider>
          </QueryProvider>
        </Snackbar>
      </ThemeProvider>
    </StoreProvider>
  );
};
