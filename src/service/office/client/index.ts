import { Client } from "../../base/client";
import { PaginateVO } from "../../base/client/dto/PaginateDto";
import { PaginateVm } from "../../base/client/view/PaginateVm";
import { VehicleVm } from "../../vehicle/client/view/VehicleVm";
import { NewOffice } from "../application/model/NewOffice";
import { OfficeVm } from "./view/OfficeVm";

export class OfficeClient extends Client<
  VehicleVm,
  VehicleVm[],
  unknown,
  unknown,
  unknown,
  unknown,
  NewOffice,
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

  async paginate(data: PaginateVO) {
    return await this.genericRequest<PaginateVm<OfficeVm>, PaginateVO>({
      method: "post",
      resource: "paginate",
      body: data,
    });
  }
}
