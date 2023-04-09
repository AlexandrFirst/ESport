import React, { PropsWithChildren } from "react";

import { ThemeProvider } from "next-themes";
import { StyledEngineProvider } from "@mui/material";

import { RootStore } from "@app/Providers/StoreProvider/config/store";

import { QueryProvider } from "@app/Providers/QueryProvider/ui/QueryProvider";
import { StoreProvider } from "@app/Providers/StoreProvider/ui/StoreProvider";

interface ProvidersProps extends PropsWithChildren {
  store: RootStore;
}

export const Providers: React.FC<ProvidersProps> = ({ store, children }) => {
  return (
    <StyledEngineProvider injectFirst>
      <StoreProvider store={store}>
        <ThemeProvider attribute={"class"}>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </StoreProvider>
    </StyledEngineProvider>
  );
};
