import { useState } from "react";
import { CreateVehicleService } from "./CreateVehicleService";
import { ListVehicleService } from "./ListVehicleService";

export const useVehicleService = () => {
  const [vehicleServices] = useState({
    finder: new ListVehicleService(),
    creator: new CreateVehicleService(),
  });

  return vehicleServices;
};
