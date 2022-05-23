import { AdminClientAbs } from "../../../base/client";
import { RentDataConfirmVm } from "../../../rent-car/client/vm/RentDataConfirmVm";
import { CreateAdminDto } from "./dto/CreateAdminDto";
import { AdminVm } from "./view/AdminVm";

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
    return this.genericRequest<RentDataConfirmVm>({
      method: "patch",
      resource: `rent/checkIn/${id}`,
    });
  }

  checkOut(id: number) {
    return this.genericRequest<RentDataConfirmVm>({
      method: "patch",
      resource: `rent/checkOut/${id}`,
    });
  }
}
