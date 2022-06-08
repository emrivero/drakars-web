import Keycloak from "keycloak-js";

export default Keycloak({
  clientId: "drakcars-api",
  realm: "drakcars",
  url: `${process.env.REACT_APP_AUTH_URL}`,
});
