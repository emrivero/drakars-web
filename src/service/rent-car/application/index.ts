import { useState } from "react";
import { FilterAvailableVehicleService } from "./FilterAvailableVehicleService";
import { FilterRentOfficeService } from "./FilterOfficeService";
import { SelectedOfficeOption } from "./mappers/SelectedOfficeOption";

export const useRentCarService = () => {
  const filterer = FilterRentOfficeService.create();
  const finder = FilterAvailableVehicleService.create();
  const [rentCarServices] = useState({
    filterer,
    finder,
    mappers: {
      SelectedOfficeOption,
    },
  });

  return rentCarServices;
};
