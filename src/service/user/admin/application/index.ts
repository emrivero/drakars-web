import { useState } from "react";
import { CreateAdminService } from "./CreateAdminService";
import { ManageRentService } from "./ManageRentService";

export const useAdminServices = () => {
  const [adminServices] = useState({
    creator: CreateAdminService.create(),
    manageRent: ManageRentService.create(),
  });

  return adminServices;
};
