import { useState } from "react";
import { CreateVehicleService } from "./CreateVehicleService";
import { ListVehicleService } from "./ListVehicleService";
import { VehicleGridRowMapper } from "./mappers/VehicleGridRowMapper";
import { NewVehicleValidator } from "./NewVehicleValidator";
import { PaginateVehicleService } from "./PaginateVehicleService";

export const useVehicleService = () => {
  const [vehicleServices] = useState({
    finder: new ListVehicleService(),
    creator: new CreateVehicleService(),
    paginator: new PaginateVehicleService(),
    vehicleValidator: NewVehicleValidator,
    mappers: {
      VehicleGridRowMapper,
    },
  });

  return vehicleServices;
};
