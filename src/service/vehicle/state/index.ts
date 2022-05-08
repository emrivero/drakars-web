import { get } from "../../../store";
import { PaginateVm } from "../../base/client/view/PaginateVm";
import { FilterVehicle } from "../application/model/filter-vehicle";
import { VehicleDto } from "../client/dto/VehicleDto";
import { VehicleVm } from "../client/view/VehicleVm";

export interface VehicleStateProps {
  vehicles: { data: PaginateVm<VehicleVm>; filter: FilterVehicle };
  newVehicle: VehicleDto;
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
};

export const getVehicleState: () => VehicleStateProps = () => {
  const { vehicles, newVehicle } = get();

  return { vehicles, newVehicle };
};
