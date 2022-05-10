import { changeState } from "../../../store";
import { PaginateVm } from "../../base/client/view/PaginateVm";
import { VehicleClient } from "../client";
import { VehicleVm } from "../client/view/VehicleVm";
import { getVehicleState } from "../state";
import { FilterVehicle } from "./model/filter-vehicle";
import { PaginateVehicleBuilder } from "./PaginateVehicleBuilder";

export class ListVehicleService {
  private readonly client = new VehicleClient();

  private FILTER_OFFICE: number = null;

  set filterOffice(value: number) {
    this.FILTER_OFFICE = value;
  }

  async fetchVehicles() {
    this.filterVehicle({});
  }

  onFilter(newFilter: Partial<FilterVehicle>) {
    this.filterVehicle(newFilter);
  }

  cleanOffice() {
    changeState(({ vehicles }) => {
      vehicles.filter["office.id"] = "";
    });
  }

  private async filterVehicle(newFilter: Partial<FilterVehicle>) {
    const {
      vehicles: { filter },
    } = getVehicleState();

    const paginateQuery = PaginateVehicleBuilder.createFilter({
      ...filter,
      ...newFilter,
    });
    try {
      const { data } = await this.client.paginate({
        ...paginateQuery.json,
        paginateOptions: {
          groupBy: ["mark", "model"],
          where: this.FILTER_OFFICE > 0 ? { office: this.FILTER_OFFICE } : {},
        },
      });

      this.setVehicleDataState(data, {
        ...filter,
        ...newFilter,
      });
    } catch (e) {
      console.error(e);
      this.setVehicleDataState(null, { ...filter, ...newFilter });
    }
  }

  private setVehicleDataState(
    data: PaginateVm<VehicleVm>,
    filter: FilterVehicle = null
  ) {
    changeState(({ vehicles }) => {
      if (data) {
        vehicles.data = new PaginateVm(data.data, data.meta, (vehicle) =>
          VehicleVm.create(vehicle)
        );
      }

      if (filter) {
        vehicles.filter = {
          ...filter,
          "office.id": vehicles.filter["office.id"],
        };
      }
    });
  }
}
