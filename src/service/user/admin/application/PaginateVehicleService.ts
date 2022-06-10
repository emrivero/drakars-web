import { changeState } from "../../../../store";
import { PaginateVm } from "../../../base/client/view/PaginateVm";
import { Debounce } from "../../../base/utils/debounce";
import { PaginateOpts } from "../../../office/application/model/paginate-office";
import { PaginateVehicleBuilder } from "../../../vehicle/application/PaginateVehicleBuilder";
import { VehicleVm } from "../../../vehicle/client/view/VehicleVm";
import { AdminClient } from "../client";
import { getAdminState } from "../state";

export class PaginateAdminVehicleService {
  private readonly client = new AdminClient();
  private static instance: PaginateAdminVehicleService = null;
  private constructor() {
    //
  }

  static create(): PaginateAdminVehicleService {
    if (!this.instance) {
      this.instance = new PaginateAdminVehicleService();
    }
    return this.instance;
  }
  async paginate() {
    const {
      paginatedAdminVehicles: { paginationOptions },
    } = getAdminState();

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
        paginatedAdminVehicles: { paginationOptions },
      } = getAdminState();
      const dto = PaginateVehicleBuilder.createPaginateFilter({
        ...paginationOptions,
        ...newFilter,
      });
      Debounce(async () => {
        const { data } = await this.client.paginateVehicles(dto.json);
        this.setData(data);

        const { meta } = data;
        this.setFilter({ totalItems: meta.totalItems });
      }, 200)();
    } catch (e) {
      this.setData(null);
    }
  }

  private setData(data: PaginateVm<VehicleVm>) {
    changeState(({ paginatedAdminVehicles }) => {
      if (data) {
        paginatedAdminVehicles.data = data;
      }
    });
  }

  private setFilter(filter: Partial<PaginateOpts>) {
    changeState(({ paginatedAdminVehicles }) => {
      if (filter) {
        paginatedAdminVehicles.paginationOptions = {
          ...paginatedAdminVehicles.paginationOptions,
          ...filter,
        };
      }
    });
  }
}
