import Keycloak from "keycloak-js";

export default Keycloak({
  clientId: "drakars-admin-api",
  realm: "drakars-admin",
  url: `${process.env.REACT_APP_API_URL}/auth`,
});
