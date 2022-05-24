import { changeState } from "../../../../store";
import { PaginateVm } from "../../../base/client/view/PaginateVm";
import { PaginateOpts } from "../../../office/application/model/paginate-office";
import { AdminClient } from "../client";
import { EditorVm } from "../client/view/EditorVm";
import { getAdminState } from "../state";
import { PaginateAdminBuilder } from "./PaginateAdminBuilder";

export class PaginateEditorService {
  private readonly client = new AdminClient();
  private static instance: PaginateEditorService = null;
  private constructor() {
    //
  }

  static create(): PaginateEditorService {
    if (!this.instance) {
      this.instance = new PaginateEditorService();
    }
    return this.instance;
  }
  async paginate() {
    const {
      paginatedEditors: { paginationOptions },
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
        paginatedEditors: { paginationOptions },
      } = getAdminState();
      const dto = PaginateAdminBuilder.createPaginateFilter({
        ...paginationOptions,
        ...newFilter,
      });
      const { data } = await this.client.paginatedEditor(dto.json);
      this.setData(data);

      const { meta } = data;
      this.setFilter({ totalItems: meta.totalItems });
    } catch (e) {
      console.error(e);
      this.setData(null);
    }
  }

  private setData(data: PaginateVm<EditorVm>) {
    changeState(({ paginatedEditors }) => {
      if (data) {
        paginatedEditors.data = data;
      }
    });
  }

  private setFilter(filter: Partial<PaginateOpts>) {
    changeState(({ paginatedEditors }) => {
      if (filter) {
        paginatedEditors.paginationOptions = {
          ...paginatedEditors.paginationOptions,
          ...filter,
        };
      }
    });
  }
}
