import { useState } from "react";
import { MunicipalitySelectOptions } from "./mappers/MunicipalitySelectOptions";

export const useMunicipalityService = () => {
  const [cityServices] = useState({
    mappers: {
      MunicipalitySelectOptions,
    },
  });

  return cityServices;
};
