import { FC } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "./use-auth";

export const RequireAuth: FC = ({ children }) => {
  const { isAuthenticated, isTokenExpired, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  if (isTokenExpired) {
    logout();
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
