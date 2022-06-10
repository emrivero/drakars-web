import { Client } from "../../../base/client";
import { RentDataConfirmVm } from "../../../rent-car/client/vm/RentDataConfirmVm";
import { UpdateClientDto } from "./dto/UpdateClientDto";
import { ClientUserVm } from "./vm/ClientUserVm";

export class ClientClient extends Client<
  ClientUserVm,
  unknown,
  unknown,
  ClientUserVm,
  unknown,
  unknown,
  unknown,
  UpdateClientDto,
  unknown
> {
  constructor() {
    super("client");
  }

  getRent() {
    return this.genericRequest<RentDataConfirmVm>({
      method: "get",
      resource: "getrent",
    });
  }

  getRents() {
    return this.genericRequest<RentDataConfirmVm[]>({
      method: "get",
      resource: "getrents",
    });
  }
}
