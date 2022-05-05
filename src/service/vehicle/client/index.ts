import { Client } from "../../base/client";
import { PaginateVO } from "../../base/client/dto/PaginateDto";
import { PaginateVm } from "../../base/client/view/PaginateVm";
import { VehicleVm } from "./view/VehicleVm";

export class VehicleClient extends Client<
  VehicleVm,
  VehicleVm,
  VehicleVm,
  VehicleVm,
  VehicleVm,
  VehicleVm,
  VehicleVm,
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
}
