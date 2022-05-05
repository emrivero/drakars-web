import { get } from "../../../store";
import { FilterOffice } from "../application/model/filter-office";
import { OfficeVm } from "../client/view/OfficeVm";

export interface OfficeStateProps {
  offices: { data: OfficeVm[]; filter: FilterOffice };
}

export const OfficeSlice: OfficeStateProps = {
  offices: {
    data: [],
    filter: {
      search: "",
    },
  },
};

export const getOfficeState: () => OfficeStateProps = () => {
  const { offices } = get();

  return { offices };
};
