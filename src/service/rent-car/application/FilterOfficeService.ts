import moment from "moment";
import { changeState } from "../../../store";
import { Debounce } from "../../base/utils/debounce";
import { OfficeClient } from "../../office/client";
import { VehicleVm } from "../../vehicle/client/view/VehicleVm";
import { SelectedOfficeDto } from "../client/dto/SelectedOfficeDto";
import { getRentState, RentCarSlice } from "../state";

export class FilterRentOfficeService {
  private readonly client = new OfficeClient();

  async onSearchOrigin(name) {
    if (name) {
      Debounce(async () => {
        const { data } = await this.client.searchByName(name);
        this.setState({ originOffices: data });
      }, 200)();
      this.setState({ searchOriginOffice: name });
    } else {
      this.setState({
        originOffices: [],
        searchOriginOffice: "",
        originOffice: null,
      });
    }
  }

  async onSearchDestiny(name) {
    if (name) {
      const { data } = await this.client.searchByName(name);
      this.setState({ searchDestinyOffice: name, destinyOffices: data });
    }
  }

  clear() {
    this.setState(RentCarSlice.selectedOffice);
  }

  setState(data: Partial<SelectedOfficeDto>) {
    changeState((state) => {
      if (data) {
        state.selectedOffice = { ...state.selectedOffice, ...data };
      }
    });
  }

  selectVehicle(data: VehicleVm) {
    const {
      selectedOffice: { startDate, endDate },
    } = getRentState();
    const start = moment(startDate);
    const end = moment(endDate);

    const days = start.diff(end, "days");
    const price = days * data.pricePerDay;
    changeState((state) => {
      if (data) {
        state.selectedVehicle = data;
        state.totalPrice = -price;
      }
    });
  }
}
