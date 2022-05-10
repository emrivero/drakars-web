import { get } from "../../../store";
import { PaginateVm } from "../../base/client/view/PaginateVm";
import { FilterOffice } from "../application/model/filter-office";
import { PaginateOpts } from "../application/model/paginate-office";
import { OfficeDto } from "../client/dto/OfficeDto";
import { OfficeVm } from "../client/view/OfficeVm";

export interface OfficeStateProps {
  offices: { data: OfficeVm[]; filter: FilterOffice };
  paginatedOffices: {
    paginationOptions: PaginateOpts;
    data: PaginateVm<OfficeVm>;
  };
  newOffice: OfficeDto;
}

export const OfficeSlice: OfficeStateProps = {
  offices: {
    data: [],
    filter: {
      search: "",
    },
  },
  paginatedOffices: {
    paginationOptions: {
      currentPage: 0,
      itemsPerPage: 10,
      search: "",
      totalItems: 0,
    },
    data: new PaginateVm(),
  },
  newOffice: {
    searchCity: "",
    searchMunicipality: "",
    address: "",
    municipalityId: null,
    name: "",
    zipCode: "",
    cityId: null,
    cities: [],
    municipalities: [],
    status: "",
    morningOpeningTime: "08:00",
    morningClosingTime: "15:00",
    eveningOpeningTime: "",
    eveningClosingTime: "",
    eveningTime: false,
  },
};

export const getOfficeState: () => OfficeStateProps = () => {
  const { offices, paginatedOffices, newOffice } = get();

  return { offices, paginatedOffices, newOffice };
};
