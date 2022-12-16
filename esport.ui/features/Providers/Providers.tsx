import React, { PropsWithChildren } from "react";

import { ThemeProvider } from "next-themes";
import { StyledEngineProvider } from "@mui/material";

interface ProvidersProps extends PropsWithChildren {}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider attribute={"class"}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
};
