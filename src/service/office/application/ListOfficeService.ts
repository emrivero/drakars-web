import { changeState } from "../../../store";
import { OfficeClient } from "../client";
import { OfficeVm } from "../client/view/OfficeVm";
import { getOfficeState } from "../state";
import { FilterOffice } from "./model/filter-office";

export class ListVehicleService {
  private readonly client = new OfficeClient();

  async fetch() {
    this.list({});
  }

  onSearch(filter: Partial<FilterOffice>) {
    this.list(filter);
  }

  private async list(newFilter: Partial<FilterOffice>) {
    const {
      offices: { filter },
    } = getOfficeState();
    try {
      const { data } = await this.client.list(newFilter);
      this.setState(data, { ...filter, ...newFilter });
    } catch (e) {
      console.error(e);
      this.setState(null, { ...filter, ...newFilter });
    }
  }

  private setState(data: OfficeVm[], filter: FilterOffice) {
    changeState(({ offices }) => {
      if (data) {
        offices.data = data;
      }

      if (filter) {
        offices.filter = filter;
      }
    });
  }
}
