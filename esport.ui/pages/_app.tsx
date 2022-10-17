import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { StyledEngineProvider } from '@mui/material'

import { AppThemeProvider } from '@shared/AppThemeProvider/AppThemeProvider'
import { StorageProvider } from '@shared/StorageProvider/StorageProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <StorageProvider>
        <AppThemeProvider>
          <Component {...pageProps} />
        </AppThemeProvider>
      </StorageProvider>
    </StyledEngineProvider>
  )
}

export default MyApp
