import { Rol } from "../../../../auth/types/rol";

export interface UserResponse {
  id?: string;

  username?: string;

  email?: string;

  firstName?: string;

  lastName?: string;

  realmRoles?: string[];

  self?: string;

  serviceAccountClientId?: string;

  role: Rol;
}

export interface UserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  username: string;
}

export class UpdateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  username: string;
}
