import { get } from "../../../store";
import { PaginateVm } from "../../base/client/view/PaginateVm";
import { FilterVehicle } from "../application/model/filter-vehicle";
import { VehicleVm } from "../client/view/VehicleVm";

export interface VehicleStateProps {
  vehicles: { data: PaginateVm<VehicleVm>; filter: FilterVehicle };
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
};

export const getVehicleState: () => VehicleStateProps = () => {
  const { vehicles } = get();

  return { vehicles };
};
