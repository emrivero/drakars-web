import { RentDataConfirmVm } from "../../client/vm/RentDataConfirmVm";

export const DestinyName = (rent: RentDataConfirmVm) => {
  return `${rent?.destinyOffice?.name}, ${rent?.destinyOffice?.municipality?.name}, ${rent?.destinyOffice?.municipality?.city?.name}`;
};
