import { changeState } from "../../../store";
import { PaginateVm } from "../../base/client/view/PaginateVm";
import { OfficeClient } from "../client";
import { OfficeVm } from "../client/view/OfficeVm";
import { getOfficeState } from "../state";
import { PaginateOpts } from "./model/paginate-office";
import { PaginateOfficeBuilder } from "./PaginateOfficeBuilder";

export class PaginationVehicleService {
  private readonly client = new OfficeClient();

  async paginate() {
    const {
      paginatedOffices: { paginationOptions },
    } = getOfficeState();

    this._paginate(paginationOptions);
  }

  changePage(page: number) {
    this.setFilter({ currentPage: page });
  }

  changeRows(numberRows: number) {
    this.setFilter({ itemsPerPage: numberRows });
  }

  onFilter(filter: Partial<PaginateOpts>) {
    this._paginate(filter);
    this.setFilter(filter);
  }

  private async _paginate(newFilter: Partial<PaginateOpts>) {
    try {
      const {
        paginatedOffices: { paginationOptions },
      } = getOfficeState();
      const dto = PaginateOfficeBuilder.createFilter({
        ...paginationOptions,
        ...newFilter,
      });
      const { data } = await this.client.paginate(dto.json);
      this.setData(data);

      const { meta } = data;
      this.setFilter({ totalItems: meta.totalItems });
    } catch (e) {
      console.error(e);
      this.setData(null);
    }
  }

  private setData(data: PaginateVm<OfficeVm>) {
    changeState(({ paginatedOffices }) => {
      if (data) {
        paginatedOffices.data = data;
      }
    });
  }

  private setFilter(filter: Partial<PaginateOpts>) {
    changeState(({ paginatedOffices }) => {
      if (filter) {
        paginatedOffices.paginationOptions = {
          ...paginatedOffices.paginationOptions,
          ...filter,
        };
      }
    });
  }
}
