import { BaseVm } from "../../../base/client/view/BaseVm";
import { OfficeVm } from "../../../office/client/view/OfficeVm";
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
  // renterUser: ClientUserVm
  reference: string;
  total: number;
  // "id": 3,
  // "createdAt": "2022-05-12T23:55:53.027Z",
  // "updatedAt": "2022-05-12T23:55:53.027Z",
  // "name": "Emilio",
  // "family_name": "Perez",
  // "email": "correo@erm.es",
  // "role": "client",
  // "profileImage": null,
  // "email_verified": false,
  // "preferred_username": "",
  // "given_name": "",
  // "dni": "28849848M"
}
