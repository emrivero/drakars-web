import { KeycloakInstance } from "keycloak-js";
import { ParsedToken } from "./parsed-token";

export interface AuthData {
  allowed: boolean;
  hasAccess: boolean;
  initialized: boolean;
  isAuthenticated: boolean;
  isTokenExpired: boolean;
  login: () => void;
  logout: () => void;
  meta: { keycloak: KeycloakInstance };
  register: () => void;
  token: string;
  userInfo: ParsedToken;
}
