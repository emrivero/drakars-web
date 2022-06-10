import { PaginateDto } from "../../base/client/dto/PaginateDto";
import { PaginateOpts } from "./model/paginate-office";

export class PaginateOfficeBuilder {
  static createFilter(filterOpts: PaginateOpts): PaginateDto {
    // const sorts = {};

    const paginateDto = new PaginateDto({
      page: filterOpts.currentPage + 1,
      limit: filterOpts.itemsPerPage,
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
