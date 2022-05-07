import { PaginateDto } from "../../base/client/dto/PaginateDto";
import { PaginateOfficeOpts } from "./model/paginate-office";

export class PaginateOfficeBuilder {
  static createFilter(filterOpts: PaginateOfficeOpts): PaginateDto {
    const sorts = {};

    const paginateDto = new PaginateDto({
      filter: {
        //     type: filterOpts.type,
        //     seats: filterOpts.seats ? `$gt:${filterOpts.seats}` : "",
        //     transmission: filterOpts.transmission,
        //     fuel: filterOpts.fuel,
        //     "office.id": filterOpts["office.id"],
      },
      search: filterOpts.search,
      //   sortBy: sorts[filterOpts.sort] ? [sorts[filterOpts.sort]] : [],
    });
    return paginateDto;
  }
}
