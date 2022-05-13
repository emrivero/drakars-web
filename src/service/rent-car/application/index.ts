import { useState } from "react";
import { ClearRentDataService } from "./ClearRentService";
import { ConfirmRentService } from "./ConfirmRentService";
import { FilterAvailableVehicleService } from "./FilterAvailableVehicleService";
import { FilterRentOfficeService } from "./FilterOfficeService";
import { SelectedOfficeOption } from "./mappers/SelectedOfficeOption";
import { SaveUserDataService } from "./SaveUserDataService";

export const useRentCarService = () => {
  const filterer = FilterRentOfficeService.create();
  const finder = FilterAvailableVehicleService.create();
  const clearer = ClearRentDataService.create();
  const saveUserData = SaveUserDataService.create();
  const confirm = ConfirmRentService.create();
  const [rentCarServices] = useState({
    filterer,
    finder,
    clearer,
    saveUserData,
    confirm,
    mappers: {
      SelectedOfficeOption,
    },
  });

  return rentCarServices;
};
