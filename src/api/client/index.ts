import { deleteReq, get, patch, post } from "..";
import {
  UpdateUserRequest,
  UserRequest,
  UserResponse,
} from "./user/types/user.types";

const BASE_RESOURCE = "users";

export const createUser = async (data: UserRequest) => {
  const result = await post<UserResponse>(`${BASE_RESOURCE}`, data);
  return result;
};

export const updateUser = async (id: string, data: UpdateUserRequest) => {
  const result = await patch<UserResponse>(`${BASE_RESOURCE}/${id}`, data);
  return result;
};

export const deleteUser = async (id: string) => {
  const result = await deleteReq<UserResponse>(`${BASE_RESOURCE}/${id}`);
  return result;
};

export const getUsers = async () => {
  const result = await get<UserResponse[]>(BASE_RESOURCE);
  return result;
};

export const getUser = async (id: string) => {
  const result = await get<UserResponse>(`${BASE_RESOURCE}/${id}`);
  return result;
};
