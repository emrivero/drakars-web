import { useState } from "react";
import { ListVehicleService } from "./ListOfficeService";
import { CityWithOffices } from "./model/CityWithOffices";

export const useOfficeService = () => {
  const [officeServices] = useState({
    finder: new ListVehicleService(),
    mappers: {
      CityWithOffices,
    },
  });

  return officeServices;
};
