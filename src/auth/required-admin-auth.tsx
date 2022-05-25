import { FC } from "react";
import { Navigate, useLocation } from "react-router";
import { Rol } from "./types/rol";
import { useAuth } from "./use-auth";

interface RequireAdminAuthProps {
  rol?: Rol;
}

export const RequireAdminAuth: FC<RequireAdminAuthProps> = ({
  children,
  rol = Rol.ADMIN,
}) => {
  const { isTokenExpired, logout, allowed } = useAuth(rol);
  const location = useLocation();

  if (!allowed) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  if (isTokenExpired) {
    logout();
  }

  return <>{children}</>;
};
