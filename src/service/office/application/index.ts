import { useState } from "react";
import { CreateOfficeService } from "./CreateOfficeService";
import { ListVehicleService } from "./ListOfficeService";
import { CityWithOffices } from "./mappers/CityWithOffices";
import { OfficeGridRowMapper } from "./mappers/OfficeGridRow";
import { PaginationVehicleService } from "./PaginationOfficeService";

export const useOfficeService = () => {
  const [officeServices] = useState({
    finder: new ListVehicleService(),
    paginator: new PaginationVehicleService(),
    creator: new CreateOfficeService(),
    mappers: {
      CityWithOffices,
      OfficeGridRowMapper,
    },
  });

  return officeServices;
};
