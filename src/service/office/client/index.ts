import { Client } from "../../base/client";
import { PaginateVO } from "../../base/client/dto/PaginateDto";
import { VehicleVm } from "../../vehicle/client/view/VehicleVm";
import { OfficeVm } from "./view/OfficeVm";

export class OfficeClient extends Client<
  VehicleVm,
  VehicleVm[],
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown
> {
  constructor() {
    super("office");
  }

  async list(data: PaginateVO) {
    return await this.genericRequest<OfficeVm[], PaginateVO>({
      method: "post",
      resource: "list",
      body: data,
    });
  }
}
