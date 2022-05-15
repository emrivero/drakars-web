import { OfficeVm } from "../../../office/client/view/OfficeVm";

export const OfficeMapLabel = (office: OfficeVm) =>
  `${office.name}, ${office?.municipality?.name}, ${office?.municipality?.city?.name}`;

export const SelectedOfficeOption = (
  office: OfficeVm
): { label: string; value: number } => ({
  label: OfficeMapLabel(office),
  value: office.id,
});
