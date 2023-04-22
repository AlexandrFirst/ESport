import React, { FC, ReactNode } from "react";
import { Store } from "@reduxjs/toolkit";
import { CombinedState } from "redux";
import { ThemeProvider } from "next-themes";

import { StateSchema } from "../config/store/StateSchema";

import { Snackbar } from "@/features/Snackbar";

import { QueryProvider } from "./QueryProvider";
import { StoreProvider } from "./StoreProvider";

interface ProvidersProps {
  store: Store<CombinedState<StateSchema>>;
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ store, children }) => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider storageKey={"e-sport.theme"}>
        <Snackbar>
          <QueryProvider>{children}</QueryProvider>
        </Snackbar>
      </ThemeProvider>
    </StoreProvider>
  );
};
