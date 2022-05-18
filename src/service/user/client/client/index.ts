import { Client } from "../../../base/client";
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
}
