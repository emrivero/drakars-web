import { BaseVm } from "../../../base/client/view/BaseVm";
import { OfficeVm } from "../../../office/client/view/OfficeVm";
import { ClientUserVm } from "../../../user/client/client/vm/ClientUserVm";
import { VehicleVm } from "../../../vehicle/client/view/VehicleVm";

export class RentDataConfirmVm extends BaseVm {
  paymentDate: string;
  paymentType: string;
  rentedVehicle: VehicleVm;
  originOffice: OfficeVm;
  destinyOffice: OfficeVm;
  startDate: string;
  endDate: string;
  status: string;
  renterUser: ClientUserVm;
  reference: string;
  total: number;
  startHour: string;
  endHour: string;
  modifiable: boolean;
}
