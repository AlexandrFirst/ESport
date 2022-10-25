import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { StyledEngineProvider } from '@mui/material'

import { AppThemeProvider } from '@shared/AppThemeProvider/AppThemeProvider'
import { wrapper } from '@storage/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <AppThemeProvider>
        <Component {...pageProps} />
      </AppThemeProvider>
    </StyledEngineProvider>
  )
}

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async ({ ctx, Component }) => {
  //Implement auth logic here
  return {
    pageProps: {
      ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {}),
      // Some custom thing for all pages
      pathname: ctx.pathname,
    },
  }
})

export default wrapper.withRedux(MyApp)
