import { useState } from "react";
import { FilterRentOfficeService } from "./FilterOfficeService";
import { SelectedOfficeOption } from "./mappers/SelectedOfficeOption";

export const useRentCarService = () => {
  const [rentCarServices] = useState({
    filterer: new FilterRentOfficeService(),
    mappers: {
      SelectedOfficeOption,
    },
  });

  return rentCarServices;
};
