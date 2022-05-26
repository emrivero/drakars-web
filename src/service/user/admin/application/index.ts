import { useState } from "react";
import { CreateAdminService } from "./CreateAdminService";
import { ManageRentService } from "./ManageRentService";
import { PaginateAdminService } from "./PaginateAdminService";
import { PaginateClientService } from "./PaginateClientService";
import { PaginateEditorService } from "./PaginateEditorService";
import { PaginateRentService } from "./PaginateRentService";
import { PaginateAdminVehicleService } from "./PaginateVehicleService";

export const useAdminServices = () => {
  const [adminServices] = useState({
    creator: CreateAdminService.create(),
    manageRent: ManageRentService.create(),
    paginatorAdmin: PaginateAdminService.create(),
    paginatorEditor: PaginateEditorService.create(),
    paginatorClient: PaginateClientService.create(),
    paginatorVehicle: PaginateAdminVehicleService.create(),
    paginatorRents: PaginateRentService.create(),
  });

  return adminServices;
};
