import moment from "moment";
import { get } from "../../../store";
import { PaginateVm } from "../../base/client/view/PaginateVm";
import { FilterVehicle } from "../../vehicle/application/model/filter-vehicle";
import { VehicleVm } from "../../vehicle/client/view/VehicleVm";
import { RentValidation } from "../application/model/RentValidation";
import { UserData } from "../application/model/user-data";
import { SelectedOfficeDto } from "../client/dto/SelectedOfficeDto";
import { RentDataConfirmVm } from "../client/vm/RentDataConfirmVm";

export type RentData = {
  selectedOffice: SelectedOfficeDto;
  selectedVehicle: VehicleVm;
  totalPrice: number;
  rentValidation: RentValidation;
  availableVehicles: { data: PaginateVm<VehicleVm>; filter: FilterVehicle };
  userData: UserData;
};
export interface RentCarProps {
  rentData: RentData;
  rentConfirmData: RentDataConfirmVm;
}

export const RentCarSlice: RentCarProps = {
  rentData: {
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
    totalPrice: null,
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
    userData: {
      name: "",
      lastName: "",
      dni: "",
      email: "",
      onlinePay: true,
      phone: "",
      comments: "",
      paymentType: "visa",
    },
  },
  rentConfirmData: {
    destinyOffice: null,
    originOffice: null,
    reference: "",
    total: 0,
    startDate: "",
    endDate: "",
    paymentDate: "",
    paymentType: "",
    rentedVehicle: null,
    status: "",
  },
};

export const getRentState: () => RentCarProps = () => {
  const { rentData, rentConfirmData } = get();

  return {
    rentData,
    rentConfirmData,
  };
};
