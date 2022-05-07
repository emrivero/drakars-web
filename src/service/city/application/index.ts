import { useState } from "react";
import { CitySelectOptions } from "./mappers/CitySelectOptions";

export const useCityService = () => {
  const [cityServices] = useState({
    mappers: {
      CitySelectOptions,
    },
  });

  return cityServices;
};
