import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { SSRCookies, SSRKeycloakProvider } from "@react-keycloak/ssr";
import cookie from "cookie";
import { IncomingMessage } from "http";
import { AppContext, AppProps } from "next/app";
import Head from "next/head";
import createEmotionCache from "../src/components/molecules/createEmotionCache";
import theme from "../src/theme";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  cookies: unknown;
}

const keycloakCfg = {
  clientId: "drakcars-api",
  realm: "drakcars",
  url: "http://localhost:8080/auth",
};

function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    cookies,
  } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SSRKeycloakProvider
          keycloakConfig={keycloakCfg}
          persistor={SSRCookies(cookies)}
          initOptions={{
            onLoad: "login-required",
            flow: "standard",
          }}
        >
          <Component {...pageProps} />
        </SSRKeycloakProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

function parseCookies(req: IncomingMessage) {
  return cookie.parse(req.headers.cookie || "");
}

MyApp.getInitialProps = async (context: AppContext) => {
  // Extract cookies from AppContext
  return {
    cookies: context.ctx.req ? parseCookies(context.ctx.req) : {},
  };
};

export default MyApp;
