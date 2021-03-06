import { Client } from "../../base/client";
import { PaginateVO } from "../../base/client/dto/PaginateDto";
import { PaginateVm } from "../../base/client/view/PaginateVm";
import { NewOffice } from "../application/model/NewOffice";
import { OfficeVm } from "./view/OfficeVm";

export class OfficeClient extends Client<
  OfficeVm,
  OfficeVm[],
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

  async searchByName(name: string) {
    return await this.genericRequest<OfficeVm[]>({
      method: "get",
      resource: `search/${name}`,
    });
  }

  async validateTime(id: number, hour: string) {
    return await this.genericRequest<{ result: boolean }>({
      method: "get",
      resource: `valid-hour/${id}?${new URLSearchParams({
        hour,
      }).toString()}`,
    });
  }
}
