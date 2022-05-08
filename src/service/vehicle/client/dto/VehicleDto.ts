import { OfficeVm } from "../../../office/client/view/OfficeVm";

export class VehicleDto {
  year: number;
  model: string;
  mark: string;
  transmission: string;
  type: string;
  offices: OfficeVm[];
  officeId: number;
  seats: number;
  pricePerDay: number;
  fuel: string;
  status: "error" | "success" | "";
  searchOffice: string;
  doors: number;
}
