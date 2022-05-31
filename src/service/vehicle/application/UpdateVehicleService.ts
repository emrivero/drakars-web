import { changeState } from "../../../store";
import { OfficeClient } from "../../office/client";
import { VehicleClient } from "../client";
import { VehicleDto } from "../client/dto/VehicleDto";
import { getVehicleState, VehicleSlice } from "../state";
import { NewVehicle } from "./model/NewVehicle";

export class UpdateVehicleService {
  private readonly officeClient = new OfficeClient();
  private readonly client = new VehicleClient();

  async fetch(id: string) {
    const response = await this.client.getById(`${id}`);
    changeState((state) => {
      state.editVehicle = {
        id: parseInt(id),
        status: "",
        ...response.data,
        officeId: response?.data?.office?.id,
        offices: [],
        searchOffice: "",
      };
    });
    return response;
  }

  async update() {
    const { editVehicle } = getVehicleState();
    const vehicle = NewVehicle.create(editVehicle);
    try {
      const response = await this.client.put(`${editVehicle.id}`, vehicle);
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
      editVehicle: { officeId, searchOffice },
    } = getVehicleState();
    this.setState({ ...VehicleSlice.editVehicle, officeId, searchOffice });
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
        state.editVehicle = { ...state.editVehicle, ...dto };
      }
    });
  }
}
