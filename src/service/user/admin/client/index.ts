import { Client } from "../../../base/client";
import { PaginateVO } from "../../../base/client/dto/PaginateDto";
import { PaginateVm } from "../../../base/client/view/PaginateVm";
import { RentDataConfirmVm } from "../../../rent-car/client/vm/RentDataConfirmVm";
import { VehicleVm } from "../../../vehicle/client/view/VehicleVm";
import { ClientUserVm } from "../../client/client/vm/ClientUserVm";
import { CreateAdminDto } from "./dto/CreateAdminDto";
import { AdminVm } from "./view/AdminVm";
import { EditorVm } from "./view/EditorVm";

export class AdminClient extends Client<
  unknown,
  unknown,
  AdminVm,
  unknown,
  unknown,
  unknown,
  CreateAdminDto,
  unknown,
  unknown
> {
  constructor() {
    super("admin");
  }

  getRentByValue(value: string) {
    return this.genericRequest<RentDataConfirmVm>({
      method: "get",
      resource: `rent/${value}`,
    });
  }

  checkIn(id: number) {
    return this.genericRequest<RentDataConfirmVm, any>({
      method: "patch",
      resource: `rent/checkIn/${id}`,
      body: {},
    });
  }

  checkOut(id: number) {
    return this.genericRequest<RentDataConfirmVm, any>({
      method: "patch",
      resource: `rent/checkOut/${id}`,
      body: {},
    });
  }

  paginatedAdmin(data: PaginateVO = {}) {
    return this.genericRequest<PaginateVm<AdminVm>, PaginateVO>({
      method: "post",
      resource: "paginate/admin",
      body: data,
    });
  }

  paginatedEditor(data: PaginateVO = {}) {
    return this.genericRequest<PaginateVm<EditorVm>, PaginateVO>({
      method: "post",
      resource: "paginate/editor",
      body: data,
    });
  }

  async paginatedClient(data: PaginateVO = {}) {
    const response = await this.genericRequest<
      PaginateVm<ClientUserVm>,
      PaginateVO
    >({
      method: "post",
      resource: "paginate/client",
      body: data,
    });

    return response;
  }

  async paginateVehicles(data: PaginateVO = {}) {
    return await this.genericRequest<PaginateVm<VehicleVm>, PaginateVO>({
      method: "post",
      resource: "vehicle/paginate",
      body: data,
    });
  }
  async paginateRents(data: PaginateVO = {}) {
    return await this.genericRequest<PaginateVm<RentDataConfirmVm>, PaginateVO>(
      {
        method: "post",
        resource: "rent/paginate",
        body: data,
      }
    );
  }
}
