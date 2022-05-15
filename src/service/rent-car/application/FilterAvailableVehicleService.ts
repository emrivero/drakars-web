import { changeState } from "../../../store";
import { FilterService } from "../../base/application/FilterService";
import { PaginateVm } from "../../base/client/view/PaginateVm";
import { FilterVehicle } from "../../vehicle/application/model/filter-vehicle";
import { PaginateVehicleBuilder } from "../../vehicle/application/PaginateVehicleBuilder";
import { VehicleClient } from "../../vehicle/client";
import { VehicleVm } from "../../vehicle/client/view/VehicleVm";
import { getVehicleState } from "../../vehicle/state";
import { getRentState } from "../state";

export class FilterAvailableVehicleService
  implements FilterService<FilterVehicle>
{
  private readonly client = new VehicleClient();
  private static instance: FilterAvailableVehicleService;

  static create() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new FilterAvailableVehicleService();
    return this.instance;
  }

  list() {
    this.listFilter({});
  }

  clear() {
    this.setAvailableVehicles(new PaginateVm([]));
  }

  onFilter(newFilter: Partial<FilterVehicle>) {
    this.listFilter(newFilter);
  }

  private async listFilter(newFilter: Partial<FilterVehicle>) {
    const {
      vehicles: { filter },
    } = getVehicleState();

    const {
      rentData: {
        selectedOffice: { endDate, startDate, originOffice },
      },
    } = getRentState();

    const paginateQuery = PaginateVehicleBuilder.createFilter({
      ...filter,
      ...newFilter,
    });

    try {
      const { data } = await this.client.list({
        ...paginateQuery.json,
        office: originOffice,
        startDate,
        endDate,
      });

      this.setAvailableVehicles(data, {
        ...filter,
        ...newFilter,
      });
    } catch (e) {
      this.setAvailableVehicles(null, { ...filter, ...newFilter });
    }
  }

  setAvailableVehicles(
    data: PaginateVm<VehicleVm>,
    filter: FilterVehicle = null
  ) {
    changeState(({ rentData: { availableVehicles } }) => {
      if (data) {
        availableVehicles.data = new PaginateVm(
          data.data,
          data.meta,
          (vehicle) => VehicleVm.create(vehicle)
        );
      }

      if (filter) {
        availableVehicles.filter = filter;
      }
    });
  }
}
