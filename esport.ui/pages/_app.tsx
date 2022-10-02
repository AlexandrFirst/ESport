import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { StyledEngineProvider } from '@mui/material'

// import resolveConfig from 'tailwindcss/resolveConfig'
// import tailwindConfigModule from '../tailwind.config.js'
// import { createTheme, ThemeProvider } from '@mui/material'
// import { ITheme } from '../interfaces'
// import { hexToRgb } from '../utils'

// const tailwindConfig: any = resolveConfig(tailwindConfigModule)
// const themeconfig = tailwindConfig as ITheme

// const theme = createTheme({
//   palette: {
//     primary: themeconfig?.theme?.colors?.primary,
//   },
// })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <Component {...pageProps} />
    </StyledEngineProvider>
  )
}

export default MyApp
