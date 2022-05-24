import { useState } from "react";
import { CreateAdminService } from "./CreateAdminService";
import { ManageRentService } from "./ManageRentService";
import { PaginateAdminService } from "./PaginateAdminService";
import { PaginateEditorService } from "./PaginateEditorService";

export const useAdminServices = () => {
  const [adminServices] = useState({
    creator: CreateAdminService.create(),
    manageRent: ManageRentService.create(),
    paginatorAdmin: PaginateAdminService.create(),
    paginatorEditor: PaginateEditorService.create(),
  });

  return adminServices;
};
