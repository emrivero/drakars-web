import { get } from "../../../store";
import { PaginateVm } from "../../base/client/view/PaginateVm";
import { PaginateOpts } from "../../office/application/model/paginate-office";
import { FilterVehicle } from "../application/model/filter-vehicle";
import { VehicleDto } from "../client/dto/VehicleDto";
import { VehicleVm } from "../client/view/VehicleVm";

export interface VehicleStateProps {
  vehicles: { data: PaginateVm<VehicleVm>; filter: FilterVehicle };
  newVehicle: VehicleDto;
  paginatedVehicles: {
    data: PaginateVm<VehicleVm>;
    paginationOptions: PaginateOpts;
  };
}

export const VehicleSlice: VehicleStateProps = {
  vehicles: {
    data: new PaginateVm(),
    filter: {
      search: "",
      fuel: "",
      seats: "",
      sort: "expensive",
      transmission: "",
      type: "",
      "office.id": "",
    },
  },
  newVehicle: {
    mark: "",
    model: "",
    officeId: null,
    offices: [],
    pricePerDay: 100.5,
    seats: null,
    status: "",
    transmission: "",
    type: "",
    year: 2021,
    searchOffice: "",
    fuel: "",
    doors: null,
  },
  paginatedVehicles: {
    paginationOptions: {
      currentPage: 0,
      itemsPerPage: 10,
      search: "",
      totalItems: 0,
    },
    data: new PaginateVm(),
  },
};

export const getVehicleState: () => VehicleStateProps = () => {
  const { vehicles, newVehicle, paginatedVehicles } = get();

  return { vehicles, newVehicle, paginatedVehicles };
};
