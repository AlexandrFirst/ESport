import React, { FC, ReactNode } from "react";
import { Store } from "@reduxjs/toolkit";
import { CombinedState } from "redux";
import { ThemeProvider } from "next-themes";

import { StateSchema } from "../config/store/StateSchema";

// import { ThemeProvider } from "./ThemeProvider";
import { StoreProvider } from "./StoreProvider";

interface ProvidersProps {
  store: Store<CombinedState<StateSchema>>;
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ store, children }) => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider storageKey={"e-sport.theme"}>{children}</ThemeProvider>
    </StoreProvider>
  );
};
