import { Client } from "../../base/client";
import { PaginateDto } from "../../base/client/dto/PaginateDto";
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
  async paginate(data: PaginateDto = {}) {
    return await this.genericRequest<PaginateVm<VehicleVm>, PaginateDto>({
      method: "post",
      resource: "paginate",
      body: data,
    });
  }
}
