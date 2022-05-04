import { changeState } from "../../../store";
import { PaginateVm } from "../../base/client/view/PaginateVm";
import { VehicleClient } from "../client";
import { VehicleVm } from "../client/view/VehicleVm";

export class PaginateVehicleService {
  private readonly client = new VehicleClient();

  async fetch() {
    const { data } = await this.client.paginate();

    changeState(({ vehicles }) => {
      vehicles.data = new PaginateVm(data.data, data.meta, (vehicle) =>
        VehicleVm.create(vehicle)
      );
    });
  }
}
