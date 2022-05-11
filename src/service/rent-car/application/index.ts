import { useState } from "react";
import { FilterRentOfficeService } from "./FilterOfficeService";
import { SelectedOfficeOption } from "./mappers/SelectedOfficeOption";

export const useRentCarService = () => {
  const filterer = FilterRentOfficeService.create();
  const [rentCarServices] = useState({
    filterer,
    mappers: {
      SelectedOfficeOption,
    },
  });

  return rentCarServices;
};
