import { OfficeVm } from "../../../office/client/view/OfficeVm";

export interface SelectedOfficeDto {
  originOffices: OfficeVm[];
  destinyOffices: OfficeVm[];
  originOffice: number;
  destinyOffice: number;
  searchOriginOffice: string;
  searchDestinyOffice: string;
  startDate: string;
  endDate: string;
  startHour: string;
  endHour: string;
}
