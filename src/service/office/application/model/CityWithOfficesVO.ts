import { CityVm } from "../../../city/client/view/CityVm";
import { OfficeVm } from "../../client/view/OfficeVm";

export type CityWithOfficesVO = {
  offices: OfficeVm[];
  city: CityVm;
};
