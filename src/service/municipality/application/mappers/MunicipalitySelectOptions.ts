import { MunicipalityVm } from "../../client/view/MunicipalityVm";

export const MunicipalitySelectOptions = (
  mun: MunicipalityVm
): { label: string; value: number } => ({
  label: mun.name,
  value: mun.id,
});
