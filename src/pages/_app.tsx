import { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { theme } from 'theme'
import PortalMount from 'components/Portal/PortalMount'
import { SWRConfig } from 'swr'
import swrConfig from 'config/swrConfig'
import 'styles/fonts.css'
import 'styles/default.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig value={swrConfig}>
      <ThemeProvider theme={theme}>
        <PortalMount id="portal" />
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  )
}

export default App
