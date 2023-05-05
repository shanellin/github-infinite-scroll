// Components
import Layout from "@components/layout/index"
// Libs
import { CacheProvider, EmotionCache } from "@emotion/react"
import type { ReactElement, ReactNode } from "react"
import type { NextPage, NextPageContext } from "next"
import type { AppProps } from "next/app"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import createEmotionCache from "@styles/createEmotionCache"
import theme from "@utils/theme"
import { wrapper } from "../states/store"
import { appWithTranslation } from "next-i18next"
// Styles
import "@styles/globals.css"

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
  ctx?: NextPageContext
}
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

type AppPropsWithLayout = MyAppProps & {
  Component: NextPageWithLayout
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp(props: AppPropsWithLayout) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </CacheProvider>
  )
}

export default wrapper.withRedux(appWithTranslation(MyApp))
