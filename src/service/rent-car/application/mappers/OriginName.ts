import { RentDataConfirmVm } from "../../client/vm/RentDataConfirmVm";

export const OriginNameMapper = (rent: RentDataConfirmVm) => {
  return `${rent?.originOffice?.name}, ${rent?.originOffice?.municipality?.name}, ${rent?.originOffice?.municipality?.city?.name}`;
};
