import React, { PropsWithChildren } from "react";

import { ThemeProvider } from "next-themes";
import { StyledEngineProvider } from "@mui/material";
import { Provider } from "react-redux";

interface ProvidersProps extends PropsWithChildren {
  store: any;
}

export const Providers: React.FC<ProvidersProps> = ({ store, children }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider attribute={"class"}>
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
