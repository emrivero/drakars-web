import { OfficeVm } from "../../../office/client/view/OfficeVm";
import { VehicleImageVm } from "../../../user/admin/client/view/VehicleImageVm";

export class VehicleDto {
  year: number;
  model: string;
  mark: string;
  transmission: string;
  type: string;
  offices: OfficeVm[];
  image: VehicleImageVm;
  officeId: number;
  seats: number;
  pricePerDay: number;
  fuel: string;
  status: "error" | "success" | "";
  searchOffice: string;
  doors: number;
}
