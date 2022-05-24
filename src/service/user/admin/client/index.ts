import { AdminClientAbs } from "../../../base/client";
import { PaginateVO } from "../../../base/client/dto/PaginateDto";
import { PaginateVm } from "../../../base/client/view/PaginateVm";
import { RentDataConfirmVm } from "../../../rent-car/client/vm/RentDataConfirmVm";
import { CreateAdminDto } from "./dto/CreateAdminDto";
import { AdminVm } from "./view/AdminVm";
import { EditorVm } from "./view/EditorVm";

export class AdminClient extends AdminClientAbs<
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
}
