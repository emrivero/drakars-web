import { TableGridRow } from "../../../../components/organism/table-grid";
import { OfficeVm } from "../../client/view/OfficeVm";

export const OfficeGridRowMapper = (vm: OfficeVm): TableGridRow => {
  return {
    index: `${vm.id}`,
    ...vm,
  };
};
