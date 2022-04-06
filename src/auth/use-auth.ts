import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { useCallback, useEffect } from "react";
import { AuthData } from "./types/auth-data";
import { Rol } from "./types/rol";

export const useAuth = (rol?: Rol): AuthData => {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();

  useEffect(() => {
    if (!initialized) {
      return;
    }
  }, [keycloak, initialized]);

  return {
    isAuthenticated: !!keycloak?.authenticated,
    userInfo: {
      ...keycloak?.tokenParsed,
    },
    isTokenExpired:
      !!keycloak?.authenticated &&
      keycloak?.isTokenExpired &&
      keycloak?.isTokenExpired(),
    hasAccess:
      !!keycloak?.authenticated &&
      keycloak?.isTokenExpired &&
      !keycloak?.isTokenExpired(),
    initialized,
    allowed: rol ? keycloak.hasResourceRole(rol) : true,
    meta: {
      keycloak,
    },
    token: keycloak?.token,
    login: useCallback(() => {
      keycloak?.login();
    }, [keycloak]),
    logout: useCallback(() => {
      keycloak?.logout();
    }, [keycloak]),
    register: useCallback(() => {
      keycloak?.register();
    }, [keycloak]),
  };
};
