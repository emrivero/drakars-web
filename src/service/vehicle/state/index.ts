import { get } from "../../../store";
import { PaginateVm } from "../../base/client/view/PaginateVm";
import { PaginateOpts } from "../../office/application/model/paginate-office";
import { FilterVehicle } from "../application/model/filter-vehicle";
import { VehicleDto } from "../client/dto/VehicleDto";
import { VehicleVm } from "../client/view/VehicleVm";

export interface VehicleStateProps {
  vehicles: { data: PaginateVm<VehicleVm>; filter: FilterVehicle };
  newVehicle: VehicleDto;
  editVehicle: VehicleDto & { id: number };
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
    seats: 5,
    status: "",
    transmission: "manual",
    type: "small",
    year: 2021,
    searchOffice: "",
    fuel: "fuel",
    doors: 5,
    image: null,
  },
  editVehicle: {
    id: null,
    mark: "",
    model: "",
    officeId: null,
    offices: [],
    pricePerDay: 100.5,
    seats: 5,
    status: "",
    transmission: "manual",
    type: "small",
    year: 2021,
    searchOffice: "",
    fuel: "fuel",
    doors: 5,
    image: null,
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
  const { vehicles, newVehicle, paginatedVehicles, editVehicle } = get();

  return { vehicles, newVehicle, paginatedVehicles, editVehicle };
};
