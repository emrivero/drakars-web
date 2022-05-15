import { useState } from "react";
import { RentCarClient } from "../client";
import { ClearRentDataService } from "./ClearRentService";
import { ConfirmRentService } from "./ConfirmRentService";
import { EditRentService } from "./EditRentService";
import { FilterAvailableVehicleService } from "./FilterAvailableVehicleService";
import { FilterRentOfficeService } from "./FilterOfficeService";
import { GetConfirmDataService } from "./GetConfirmDataService";
import { SelectedOfficeOption } from "./mappers/SelectedOfficeOption";
import { SaveUserDataService } from "./SaveUserDataService";

export const useRentCarService = () => {
  const client = new RentCarClient();
  const filterer = FilterRentOfficeService.create();
  const finder = FilterAvailableVehicleService.create();
  const clearer = ClearRentDataService.create();
  const saveUserData = SaveUserDataService.create();
  const confirm = ConfirmRentService.create();
  const getter = GetConfirmDataService.create();
  const editor = EditRentService.create();
  const [rentCarServices] = useState({
    filterer,
    finder,
    clearer,
    saveUserData,
    confirm,
    getter,
    editor,
    cancelRent: (dni: string, reference: string) =>
      client.delete(`${dni}/${reference}`),
    mappers: {
      SelectedOfficeOption,
    },
  });

  return rentCarServices;
};
