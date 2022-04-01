import { SSRCookies, SSRKeycloakProvider } from "@react-keycloak/ssr";
import cookie from "cookie";
import { IncomingMessage } from "http";
import { NextPageContext } from "next";

const keycloakCfg = {
  clientId: "drakcars-api",
  realm: "drakcars",
  url: "http://localhost:8080/auth",
};

function Login({ cookies }: { cookies: unknown }) {
  return (
    <SSRKeycloakProvider
      keycloakConfig={keycloakCfg}
      persistor={SSRCookies(cookies)}
      initOptions={{
        onLoad: "login-required",
        flow: "standard",
      }}
    />
  );
}

function parseCookies(req: IncomingMessage) {
  return cookie.parse(req.headers.cookie || "");
}

Login.getInitialProps = async (context: NextPageContext) => {
  return {
    cookies: context.req ? parseCookies(context.req) : {},
  };
};

export default Login;
