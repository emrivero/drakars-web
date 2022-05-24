import { changeState } from "../../../../store";
import { PaginateVm } from "../../../base/client/view/PaginateVm";
import { PaginateOpts } from "../../../office/application/model/paginate-office";
import { ClientUserVm } from "../../client/client/vm/ClientUserVm";
import { AdminClient } from "../client";
import { getAdminState } from "../state";
import { PaginateAdminBuilder } from "./PaginateAdminBuilder";

export class PaginateClientService {
  private readonly client = new AdminClient();
  private static instance: PaginateClientService = null;
  private constructor() {
    //
  }

  static create(): PaginateClientService {
    if (!this.instance) {
      this.instance = new PaginateClientService();
    }
    return this.instance;
  }
  async paginate() {
    const {
      paginatedClients: { paginationOptions },
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
        paginatedClients: { paginationOptions },
      } = getAdminState();
      const dto = PaginateAdminBuilder.createPaginateFilter({
        ...paginationOptions,
        ...newFilter,
      });
      const { data } = await this.client.paginatedClient(dto.json);
      this.setData(data);

      const { meta } = data;
      this.setFilter({ totalItems: meta?.totalItems || 0 });
    } catch (e) {
      console.error(e);
      this.setData(null);
    }
  }

  private setData(data: PaginateVm<ClientUserVm>) {
    changeState(({ paginatedClients }) => {
      if (data) {
        paginatedClients.data = data;
      }
    });
  }

  private setFilter(filter: Partial<PaginateOpts>) {
    changeState(({ paginatedClients }) => {
      if (filter) {
        paginatedClients.paginationOptions = {
          ...paginatedClients.paginationOptions,
          ...filter,
        };
      }
    });
  }
}
