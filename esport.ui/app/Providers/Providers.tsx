import React, { PropsWithChildren } from "react";

import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { StyledEngineProvider } from "@mui/material";

import { QueryProvider } from "@app/Providers/QueryProvider";

interface ProvidersProps extends PropsWithChildren {
  store: any;
}

export const Providers: React.FC<ProvidersProps> = ({ store, children }) => {
  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <ThemeProvider attribute={"class"}>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </Provider>
    </StyledEngineProvider>
  );
};
