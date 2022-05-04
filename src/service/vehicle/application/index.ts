import { useState } from "react";
import { PaginateVehicleService } from "./PaginateService";

export const useVehicleService = () => {
  const [vehicleServices] = useState({
    paginator: new PaginateVehicleService(),
  });

  return vehicleServices;
};
