import Head from 'next/head'
import PortalMount from 'lib/Portal/PortalMount'
import { getYear } from 'date-fns'
import { ThemeProvider } from '@emotion/react'
import { theme } from 'theme'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import swrConfig from 'config/swrConfig'
import 'styles/fonts.css'
import 'styles/default.css'
import 'swiper/swiper.scss'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>PlannerJS</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale = 1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta
          name="Copyright"
          content={`Copyright © Phil Scott ${getYear(
            new Date(),
          )}. All Rights Reserved.`}
        />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <ThemeProvider theme={theme}>
        <SWRConfig value={swrConfig}>
          <PortalMount id="portal" />
          <Component {...pageProps} />
        </SWRConfig>
      </ThemeProvider>
    </>
  )
}

export default App
