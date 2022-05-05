import { PaginateDto } from "../../base/client/dto/PaginateDto";
import { FilterVehicle } from "./model/filter-vehicle";

export class PaginateVehicleBuilder {
  static createFilter(filterOpts: FilterVehicle): PaginateDto {
    const sorts = {
      cheap: ["pricePerDay", "ASC"],
      expensive: ["pricePerDay", "DESC"],
    };

    const paginateDto = new PaginateDto({
      filter: {
        type: filterOpts.type,
        seats: filterOpts.seats ? `$gt:${filterOpts.seats}` : "",
        transmission: filterOpts.transmission,
        fuel: filterOpts.fuel,
        "office.id": filterOpts["office.id"],
      },
      search: filterOpts.search,
      sortBy: sorts[filterOpts.sort] ? [sorts[filterOpts.sort]] : [],
    });
    return paginateDto;
  }
}
