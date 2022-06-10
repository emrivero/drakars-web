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

  getRentByReference(value: string) {
    return this.genericRequest<RentDataConfirmVm>({
      method: "get",
      resource: `rent-by-reference/${value}`,
    });
  }

  manageRent(value: string) {
    return this.genericRequest<RentDataConfirmVm>({
      method: "get",
      resource: `manage-rent/${value}`,
    });
  }

  checkIn(id: string) {
    return this.genericRequest<RentDataConfirmVm, any>({
      method: "patch",
      resource: `rent/checkIn/${id}`,
      body: {},
    });
  }

  checkOut(id: string) {
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

  async removeClient(id: string, email: string) {
    return this.genericRequest({
      method: "delete",
      resource: `client/${id}/${email}`,
    });
  }

  refreshRents() {
    return this.post("rent/refresh", null);
  }

  cancelRent(reference: string) {
    return this.put(`rent/cancel/${reference}`, null);
  }

  changeVehicle(reference: string, vehicleId: number) {
    return this.put(`rent/change-vehicle/${reference}/${vehicleId}`, null);
  }

  changeOffice(editorId: string, officeId: number) {
    return this.put(`editor/change-office/${editorId}/${officeId}`, null);
  }
}
