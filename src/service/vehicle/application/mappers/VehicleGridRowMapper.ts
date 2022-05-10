import { TableGridRow } from "../../../../components/organism/table-grid";
import { VehicleVm } from "../../client/view/VehicleVm";

export const VehicleGridRowMapper = (vm: VehicleVm): TableGridRow => {
  return {
    index: `${vm.id}`,
    ...vm,
    office: vm.office?.name,
  };
};
