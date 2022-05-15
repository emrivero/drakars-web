import Keycloak from "keycloak-js";

export default Keycloak({
  clientId: "drakars-admin-api",
  realm: "drakars-admin",
  url: "http://keycloak:8080/auth",
});
