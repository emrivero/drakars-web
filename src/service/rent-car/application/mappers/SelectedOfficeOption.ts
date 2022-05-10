import { OfficeVm } from "../../../office/client/view/OfficeVm";

export const SelectedOfficeOption = (
  office: OfficeVm
): { label: string; value: number } => ({
  label: `${office.name}, ${office?.municipality?.name}, ${office?.municipality?.city?.name}`,
  value: office.id,
});
