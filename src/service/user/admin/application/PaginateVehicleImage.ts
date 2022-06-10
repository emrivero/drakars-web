import { changeState } from "../../../../store";
import { Debounce } from "../../../base/utils/debounce";
import { VehicleImageClient } from "../client/vehicle-image.client";
import { VehicleImageVm } from "../client/view/VehicleImageVm";
import { getAdminState } from "../state";

export class PaginatedVehicleImage {
  private readonly client = new VehicleImageClient();
  private static instance: PaginatedVehicleImage = null;
  private constructor() {
    //
  }

  static create(): PaginatedVehicleImage {
    if (!this.instance) {
      this.instance = new PaginatedVehicleImage();
    }
    return this.instance;
  }
  async paginate() {
    const {
      paginatedVehicleImage: { size, page },
    } = getAdminState();

    this._paginate(size, page);
  }

  changePage(page: number) {
    this.setFilter(null, page);
  }

  changeRows(numberRows: number) {
    this.setFilter(numberRows, null);
  }

  resetPaginate() {
    const {
      paginatedVehicleImage: { size },
    } = getAdminState();
    return this._paginate(size, 0);
  }

  private async _paginate(size: number, page: number) {
    try {
      Debounce(async () => {
        const { data } = await this.client.paginateVehicleImage(size, page);
        this.setData(data);

        this.setFilter(size, page);
      }, 200)();
    } catch (e) {
      this.setData(null);
    }
  }

  private setData(data: { results: VehicleImageVm[]; count: number }) {
    changeState(({ paginatedVehicleImage }) => {
      if (data) {
        paginatedVehicleImage.data = data;
      }
    });
  }

  private setFilter(size: number, page: number) {
    changeState(({ paginatedVehicleImage }) => {
      if (size) {
        paginatedVehicleImage.size = size;
      }

      if (page !== null) {
        paginatedVehicleImage.page = page;
      }
    });
  }
}
