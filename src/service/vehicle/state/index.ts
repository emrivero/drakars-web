import { PaginateDto } from "../../base/client/dto/PaginateDto";
import { PaginateVm } from "../../base/client/view/PaginateVm";
import { VehicleVm } from "../client/view/VehicleVm";

export interface VehicleStateProps {
  vehicles: { data: PaginateVm<VehicleVm>; filter: PaginateDto };
  vehiclesByOffice: { data: PaginateVm<VehicleVm>; filter: PaginateDto };
}

export const VehicleSlice: VehicleStateProps = {
  vehicles: {
    data: new PaginateVm(),
    filter: {
      search: "",
    },
  },
  vehiclesByOffice: {
    data: new PaginateVm(),
    filter: {
      search: "",
    },
  },
};
