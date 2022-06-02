import { TableGridRow } from "../../../../components/organism/table-grid";
import { VehicleVm } from "../../client/view/VehicleVm";

export const VehicleGridRowMapper = (vm: VehicleVm): TableGridRow => {
  return {
    index: `${vm.id}`,
    ...vm,
    pricePerDay: `${vm.pricePerDay}€`,
    office: `${vm.office?.name}, ${vm?.office?.municipality?.name}, ${vm?.office?.municipality?.city?.name}`,
  };
};
