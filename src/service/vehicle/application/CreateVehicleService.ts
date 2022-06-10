import { changeState } from "../../../store";
import { OfficeClient } from "../../office/client";
import { VehicleClient } from "../client";
import { VehicleDto } from "../client/dto/VehicleDto";
import { getVehicleState, VehicleSlice } from "../state";
import { NewVehicle } from "./model/NewVehicle";

export class CreateVehicleService {
  private readonly officeClient = new OfficeClient();
  private readonly client = new VehicleClient();

  async create() {
    const { newVehicle } = getVehicleState();
    const vehicle = NewVehicle.create(newVehicle);
    try {
      const response = await this.client.post("", vehicle);
      this.setState({ status: "success" });
      return response;
    } catch (e) {
      this.setState({ status: "error" });
    }
  }

  async searchOffice(name: string) {
    if (name) {
      const { data } = await this.officeClient.searchByName(name);

      this.setState({ offices: data, searchOffice: name });
    }
  }

  clear() {
    const {
      newVehicle: { officeId, searchOffice },
    } = getVehicleState();
    this.setState({ ...VehicleSlice.newVehicle, officeId, searchOffice });
  }

  clearSearch() {
    this.setState({
      officeId: null,
      searchOffice: "",
    });
  }

  setState(dto: Partial<VehicleDto>) {
    changeState((state) => {
      if (dto) {
        state.newVehicle = { ...state.newVehicle, ...dto };
      }
    });
  }
}
