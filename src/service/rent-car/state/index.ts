import moment from "moment";
import { get } from "../../../store";
import { PaginateVm } from "../../base/client/view/PaginateVm";
import { FilterVehicle } from "../../vehicle/application/model/filter-vehicle";
import { VehicleVm } from "../../vehicle/client/view/VehicleVm";
import { RentValidation } from "../application/model/RentValidation";
import { SelectedOfficeDto } from "../client/dto/SelectedOfficeDto";
import { RentDataConfirmVm } from "../client/vm/RentDataConfirmVm";

export interface RentCarProps {
  selectedOffice: SelectedOfficeDto;
  selectedVehicle: VehicleVm;
  totalPrice: number;
  rentValidation: RentValidation;
  availableVehicles: { data: PaginateVm<VehicleVm>; filter: FilterVehicle };
  rentConfirmData: RentDataConfirmVm;
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
  availableVehicles: {
    data: new PaginateVm(),
    filter: {
      search: "",
      fuel: "",
      seats: "",
      sort: "expensive",
      transmission: "",
      type: "",
    },
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
  rentConfirmData: null,
};

export const getRentState: () => RentCarProps = () => {
  const {
    selectedOffice,
    selectedVehicle,
    totalPrice,
    rentValidation,
    availableVehicles,
    rentConfirmData,
  } = get();

  return {
    selectedOffice,
    selectedVehicle,
    totalPrice,
    rentValidation,
    availableVehicles,
    rentConfirmData,
  };
};
