import { Client } from "../../base/client";
import { ConfirmRentDto } from "./dto/ConfirmRentDto";
import { EditRentDto } from "./dto/EditRentDto";
import { RentDataConfirmVm } from "./vm/RentDataConfirmVm";

export class RentCarClient extends Client<
  RentDataConfirmVm,
  RentDataConfirmVm[],
  RentDataConfirmVm,
  RentDataConfirmVm,
  RentDataConfirmVm,
  RentDataConfirmVm,
  ConfirmRentDto,
  unknown,
  EditRentDto
> {
  constructor() {
    super("rent-car");
  }

  getByReference(email: string, reference: string) {
    return this.getById(`by-reference/${email}/${reference}`);
  }
}
