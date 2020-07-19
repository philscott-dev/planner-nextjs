import { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { theme } from 'theme'
import PortalMount from 'components/Portal/PortalMount'
import 'styles/fonts.css'
import 'styles/default.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <PortalMount id="portal" />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
