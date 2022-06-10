import { OfficeVm } from "../../client/view/OfficeVm";

export const OfficeSelectOption = (
  office: OfficeVm
): { label: string; value: number } => ({
  label: office.name,
  value: office.id,
});
