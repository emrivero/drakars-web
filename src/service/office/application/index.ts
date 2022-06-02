import { useState } from "react";
import { CreateOfficeService } from "./CreateOfficeService";
import { ListOfficeService } from "./ListOfficeService";
import { CityWithOffices } from "./mappers/CityWithOffices";
import { OfficeGridRowMapper } from "./mappers/OfficeGridRow";
import { OfficeSelectOption } from "./mappers/OfficeSelectOption";
import { NewOfficeValidator } from "./NewOfficeValidator";
import { PaginationVehicleService } from "./PaginationOfficeService";
import { UpdateOfficeService } from "./UpdateOfficeService";

export const useOfficeService = () => {
  const [officeServices] = useState({
    finder: new ListOfficeService(),
    paginator: new PaginationVehicleService(),
    creator: new CreateOfficeService(),
    updater: new UpdateOfficeService(),
    validator: NewOfficeValidator,
    mappers: {
      OfficeSelectOption,
      CityWithOffices,
      OfficeGridRowMapper,
    },
  });

  return officeServices;
};
