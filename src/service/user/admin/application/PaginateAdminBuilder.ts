import { PaginateDto } from "../../../base/client/dto/PaginateDto";
import { PaginateOpts } from "../../../office/application/model/paginate-office";
import { FilterAdmin } from "./model/filter-admin";

export class PaginateAdminBuilder {
  static createFilter(filterOpts: FilterAdmin): PaginateDto {
    const sorts = {
      cheap: ["pricePerDay", "ASC"],
      expensive: ["pricePerDay", "DESC"],
    };

    const paginateDto = new PaginateDto({
      filter: {
        // type: filterOpts.type,
        // seats: filterOpts.seats ? `$gt:${filterOpts.seats}` : "",
        // transmission: filterOpts.transmission,
        // fuel: filterOpts.fuel,
        "office.id": filterOpts["office.id"],
      },
      search: filterOpts.search,
      //   sortBy: sorts[filterOpts.sort] ? [sorts[filterOpts.sort]] : [],
    });
    return paginateDto;
  }

  static createPaginateFilter(filterOpts: PaginateOpts): PaginateDto {
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
