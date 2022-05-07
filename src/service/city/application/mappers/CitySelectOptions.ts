import { CityVm } from "../../client/view/CityVm";

export const CitySelectOptions = (
  city: CityVm
): { label: string; value: number } => ({
  label: city.name,
  value: city.id,
});
