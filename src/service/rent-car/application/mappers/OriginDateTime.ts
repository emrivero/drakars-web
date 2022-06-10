import { RentDataConfirmVm } from "../../client/vm/RentDataConfirmVm";

export const OriginDateTimeMapper = (rent: RentDataConfirmVm) => {
  return `${rent?.startDate} ${rent?.startHour}`;
};
