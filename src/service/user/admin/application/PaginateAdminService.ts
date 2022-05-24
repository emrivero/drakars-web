import { changeState } from "../../../../store";
import { PaginateVm } from "../../../base/client/view/PaginateVm";
import { PaginateOpts } from "../../../office/application/model/paginate-office";
import { AdminClient } from "../client";
import { AdminVm } from "../client/view/AdminVm";
import { getAdminState } from "../state";
import { PaginateAdminBuilder } from "./PaginateAdminBuilder";

export class PaginateAdminService {
  private readonly client = new AdminClient();
  private static instance: PaginateAdminService = null;
  private constructor() {
    //
  }

  static create(): PaginateAdminService {
    if (!this.instance) {
      this.instance = new PaginateAdminService();
    }
    return this.instance;
  }

  async paginate() {
    const {
      paginatedAdmins: { paginationOptions },
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
        paginatedAdmins: { paginationOptions },
      } = getAdminState();
      const dto = PaginateAdminBuilder.createPaginateFilter({
        ...paginationOptions,
        ...newFilter,
      });
      const { data } = await this.client.paginatedAdmin(dto.json);
      this.setData(data);

      const { meta } = data;
      this.setFilter({ totalItems: meta.totalItems });
    } catch (e) {
      console.error(e);
      this.setData(null);
    }
  }

  private setData(data: PaginateVm<AdminVm>) {
    changeState(({ paginatedAdmins }) => {
      if (data) {
        paginatedAdmins.data = data;
      }
    });
  }

  private setFilter(filter: Partial<PaginateOpts>) {
    changeState(({ paginatedAdmins }) => {
      if (filter) {
        paginatedAdmins.paginationOptions = {
          ...paginatedAdmins.paginationOptions,
          ...filter,
        };
      }
    });
  }
}
