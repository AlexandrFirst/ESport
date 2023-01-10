import React, { PropsWithChildren } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface SportLocalizationProviderProps extends PropsWithChildren {}

export const SportLocalizationProvider: React.FC<
  SportLocalizationProviderProps
> = ({ children }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {children}
    </LocalizationProvider>
  );
};
