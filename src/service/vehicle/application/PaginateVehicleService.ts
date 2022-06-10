import { changeState } from "../../../store";
import { PaginateVm } from "../../base/client/view/PaginateVm";
import { PaginateOpts } from "../../office/application/model/paginate-office";
import { VehicleClient } from "../client";
import { VehicleVm } from "../client/view/VehicleVm";
import { getVehicleState } from "../state";
import { PaginateVehicleBuilder } from "./PaginateVehicleBuilder";

export class PaginateVehicleService {
  private readonly client = new VehicleClient();

  async paginate() {
    const {
      paginatedVehicles: { paginationOptions },
    } = getVehicleState();

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
        paginatedVehicles: { paginationOptions },
      } = getVehicleState();
      const dto = PaginateVehicleBuilder.createPaginateFilter({
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

  private setData(data: PaginateVm<VehicleVm>) {
    changeState(({ paginatedVehicles }) => {
      if (data) {
        paginatedVehicles.data = data;
      }
    });
  }

  private setFilter(filter: Partial<PaginateOpts>) {
    changeState(({ paginatedVehicles }) => {
      if (filter) {
        paginatedVehicles.paginationOptions = {
          ...paginatedVehicles.paginationOptions,
          ...filter,
        };
      }
    });
  }
}
