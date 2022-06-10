import { RentDataConfirmVm } from "../../client/vm/RentDataConfirmVm";

export const DestinyDateTimeMapper = (rent: RentDataConfirmVm) => {
  return `${rent?.endDate} ${rent?.endHour}`;
};
