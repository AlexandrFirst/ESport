import '../styles/globals.css'
import type { AppProps } from 'next/app'

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
  return <Component {...pageProps} />
}

export default MyApp
