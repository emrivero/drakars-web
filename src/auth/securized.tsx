import { FC } from "react";
import { Rol } from "./types/rol";
import { useAuth } from "./use-auth";

interface RequireAdminAuthProps {
  rol?: Rol;
}

export const Securized: FC<RequireAdminAuthProps> = ({
  children,
  rol = Rol.ADMIN,
}) => {
  const { allowed } = useAuth(rol);

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
};
