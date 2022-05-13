import { Client } from "../../base/client";
import { PaginateVO } from "../../base/client/dto/PaginateDto";
import { PaginateVm } from "../../base/client/view/PaginateVm";
import { NewVehicle } from "../application/model/NewVehicle";
import { VehicleVm } from "./view/VehicleVm";

export class VehicleClient extends Client<
  VehicleVm,
  VehicleVm,
  VehicleVm,
  VehicleVm,
  VehicleVm,
  VehicleVm,
  NewVehicle,
  VehicleVm,
  VehicleVm
> {
  constructor() {
    super("vehicle");
  }
  async paginate(data: PaginateVO = {}) {
    return await this.genericRequest<PaginateVm<VehicleVm>, PaginateVO>({
      method: "post",
      resource: "paginate",
      body: data,
    });
  }

  async list(
    data: PaginateVO & {
      office?: number;
      startDate?: string;
      endDate?: string;
    } = {}
  ) {
    return await this.genericRequest<PaginateVm<VehicleVm>, PaginateVO>({
      method: "post",
      resource: "available",
      body: data,
    });
  }
}
