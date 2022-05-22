import { useState } from "react";
import { CreateAdminService } from "./CreateAdminService";

export const useAdminServices = () => {
  const [adminServices] = useState({
    creator: CreateAdminService.create(),
  });

  return adminServices;
};
