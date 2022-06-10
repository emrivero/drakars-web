import { changeState } from "../../../../store";
import { PaginateVm } from "../../../base/client/view/PaginateVm";
import { Debounce } from "../../../base/utils/debounce";
import { PaginateOpts } from "../../../office/application/model/paginate-office";
import { RentDataConfirmVm } from "../../../rent-car/client/vm/RentDataConfirmVm";
import { PaginateVehicleBuilder } from "../../../vehicle/application/PaginateVehicleBuilder";
import { AdminClient } from "../client";
import { getAdminState } from "../state";

export class PaginateRentService {
  private readonly client = new AdminClient();
  private static instance: PaginateRentService = null;
  private constructor() {
    //
  }

  static create(): PaginateRentService {
    if (!this.instance) {
      this.instance = new PaginateRentService();
    }
    return this.instance;
  }
  async paginate() {
    const {
      paginatedRents: { paginationOptions },
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
        paginatedRents: { paginationOptions },
      } = getAdminState();
      const dto = PaginateVehicleBuilder.createPaginateFilter({
        ...paginationOptions,
        ...newFilter,
      });
      Debounce(async () => {
        const { data } = await this.client.paginateRents(dto.json);
        this.setData(data);

        const { meta } = data;
        this.setFilter({ totalItems: meta.totalItems });
      }, 200)();
    } catch (e) {
      this.setData(null);
    }
  }

  private setData(data: PaginateVm<RentDataConfirmVm>) {
    changeState(({ paginatedRents }) => {
      if (data) {
        paginatedRents.data = data;
      }
    });
  }

  private setFilter(filter: Partial<PaginateOpts>) {
    changeState(({ paginatedRents }) => {
      if (filter) {
        paginatedRents.paginationOptions = {
          ...paginatedRents.paginationOptions,
          ...filter,
        };
      }
    });
  }
}
