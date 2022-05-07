import { CityVm } from "../../../city/client/view/CityVm";
import { MunicipalityVm } from "../../../municipality/client/view/MunicipalityVm";

export interface OfficeDto {
  name: string;
  address: string;
  zipCode: string;
  municipalityId: number;
  cityId: number;
  cities: CityVm[];
  municipalities: MunicipalityVm[];
  searchCity: string;
  searchMunicipality: string;
  status: "error" | "success" | "";
}
