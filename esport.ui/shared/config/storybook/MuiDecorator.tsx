import { Story } from "@storybook/react";
import { StyledEngineProvider } from "@mui/material";

export const MuiDecorator = (Component: Story) => (
  <StyledEngineProvider injectFirst>
    <Component />
  </StyledEngineProvider>
);
