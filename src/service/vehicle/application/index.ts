import { useState } from "react";
import { ListVehicleService } from "./ListVehicleService";

export const useVehicleService = () => {
  const [vehicleServices] = useState({
    finder: new ListVehicleService(),
  });

  return vehicleServices;
};
