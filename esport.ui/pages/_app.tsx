import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { StyledEngineProvider } from '@mui/material'

import { AppThemeProvider } from '@features/AppThemeProvider/AppThemeProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <AppThemeProvider>
        <Component {...pageProps} />
      </AppThemeProvider>
    </StyledEngineProvider>
  )
}

export default MyApp
