import Keycloak from "keycloak-js";

export default Keycloak({
  clientId: "drakcars-api",
  realm: "drakcars",
  url: "http://keycloak:8080/auth",
});
