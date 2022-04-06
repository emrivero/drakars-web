import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AuthClientEvent } from "@react-keycloak/core/lib/types";
import { SSRCookies, SSRKeycloakProvider } from "@react-keycloak/ssr";
import axios from "axios";
import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import Head from "next/head";
import createEmotionCache from "../src/components/molecules/createEmotionCache";
import theme from "../src/theme";

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  cookies: unknown;
}

const keycloakCfg = {
  clientId: "drakcars-api",
  realm: "drakcars",
  url: "http://keycloak:8080/auth",
};

const eventLogger = (event: AuthClientEvent, error: unknown) => {
  console.log("onKeycloakEvent", event, error);
};

const tokenLogger = (tokens: { token: string }) => {
  console.log(tokens.token);
  axios.defaults.headers.common.Authorization = `Bearer ${tokens?.token}`;
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
      <SSRKeycloakProvider
        keycloakConfig={keycloakCfg}
        persistor={SSRCookies(cookies)}
        initOptions={{
          onLoad: "check-sso",
          flow: "implicit",
        }}
        onEvent={eventLogger}
        onTokens={tokenLogger}
        // LoadingComponent={<CircularProgress />}
        // isLoadingCheck={() => !axios.defaults.headers.common.Authorization}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </SSRKeycloakProvider>
    </CacheProvider>
  );
}

export default appWithTranslation(MyApp);
