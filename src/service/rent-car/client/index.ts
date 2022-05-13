import { Client } from "../../base/client";
import { ConfirmRentDto } from "./dto/ConfirmRentDto";
import { RentDataConfirmVm } from "./vm/RentDataConfirmVm";

export class RentCarClient extends Client<
  unknown,
  unknown,
  RentDataConfirmVm,
  unknown,
  unknown,
  unknown,
  ConfirmRentDto,
  unknown,
  unknown
> {
  constructor() {
    super("rent-car");
  }
}
