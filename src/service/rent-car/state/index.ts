import moment from "moment";
import { get } from "../../../store";
import { VehicleVm } from "../../vehicle/client/view/VehicleVm";
import { SelectedOfficeDto } from "../client/dto/SelectedOfficeDto";

export interface RentCarProps {
  selectedOffice: SelectedOfficeDto;
  selectedVehicle: VehicleVm;
  totalPrice: number;
}

export const RentCarSlice: RentCarProps = {
  selectedOffice: {
    originOffices: [],
    destinyOffices: [],
    originOffice: null,
    destinyOffice: null,
    searchOriginOffice: "",
    searchDestinyOffice: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().add(7, "day").format("YYYY-MM-DD"),
    startHour: "10:00",
    endHour: "10:00",
  },
  selectedVehicle: null,
  totalPrice: 0,
};

export const getRentState: () => RentCarProps = () => {
  const { selectedOffice, selectedVehicle, totalPrice } = get();

  return { selectedOffice, selectedVehicle, totalPrice };
};
