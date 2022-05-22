import { AdminClientAbs } from "../../../base/client";
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
}
