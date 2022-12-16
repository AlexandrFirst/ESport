import {createContext, FC, PropsWithChildren, useState} from "react";
import {AppTheme} from "@enums/app-theme";
// import { createTheme, ThemeProvider } from '@mui/material'
// import resolveConfig from 'tailwindcss/resolveConfig'
// import tailwindConfigModule from '../../tailwind.config.js'

// //@ts-ignore
// const tailwindConfig: any = resolveConfig(tailwindConfigModule)

interface IThemeContext {
  currentTheme: AppTheme
  setCurrentTheme: (newTheme: AppTheme) => void
}

export const AppThemeContext = createContext<IThemeContext>({
  currentTheme: AppTheme.Main,
  setCurrentTheme: () => {},
});

export const AppThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(AppTheme.Main);
  //TODO: insert logic of theme update and saving

  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: tailwindConfig.theme?.backgroundColor.skin.main,
  //     },
  //   },
  // })

  return (
    <AppThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {/* <ThemeProvider theme={theme}> */}
      {children}
      {/* </ThemeProvider> */}
    </AppThemeContext.Provider>
  );
};
