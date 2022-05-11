import moment from "moment";
import { get } from "../../../store";
import { VehicleVm } from "../../vehicle/client/view/VehicleVm";
import { RentValidation } from "../application/model/RentValidation";
import { SelectedOfficeDto } from "../client/dto/SelectedOfficeDto";

export interface RentCarProps {
  selectedOffice: SelectedOfficeDto;
  selectedVehicle: VehicleVm;
  totalPrice: number;
  rentValidation: RentValidation;
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
  rentValidation: {
    endHour: {
      valid: true,
      textError: "Fuera de horario",
    },
    startHour: {
      valid: true,
      textError: "Fuera de horario",
    },
  },
};

export const getRentState: () => RentCarProps = () => {
  const { selectedOffice, selectedVehicle, totalPrice, rentValidation } = get();

  return { selectedOffice, selectedVehicle, totalPrice, rentValidation };
};
