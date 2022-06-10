import moment from "moment";
import shallow from "zustand/shallow";
import { changeState, useStore } from "../../../store";
import { ValidationVO } from "../../base/model/ValidationVO";
import { Debounce } from "../../base/utils/debounce";
import { OfficeClient } from "../../office/client";
import { VehicleVm } from "../../vehicle/client/view/VehicleVm";
import { SelectedOfficeDto } from "../client/dto/SelectedOfficeDto";
import { getRentState, RentCarSlice } from "../state";
import { RentValidation } from "./model/RentValidation";

export class FilterRentOfficeService {
  private readonly client = new OfficeClient();
  private static instance: FilterRentOfficeService = null;
  private static version = 0;

  static create() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new FilterRentOfficeService();
    return this.instance;
  }

  private constructor() {
    useStore.subscribe(
      ({ rentData: { selectedOffice } }) => [
        selectedOffice.originOffice,
        selectedOffice.destinyOffice,
        selectedOffice.startHour,
        selectedOffice.endHour,
      ],
      async (state) => {
        const [originOffice, destinyOffice, startHour, endHour] = state as [
          number,
          number,
          string,
          string
        ];

        if (destinyOffice) {
          const { data } = await this.client.validateTime(
            destinyOffice,
            endHour
          );
          this.validate("endHour", { valid: data.result });
        }

        if (originOffice && !destinyOffice) {
          const startData = await this.client.validateTime(
            originOffice,
            startHour
          );
          this.validate("startHour", { valid: startData.data.result });

          const endData = await this.client.validateTime(originOffice, endHour);
          this.validate("endHour", { valid: endData.data.result });
        }
      },
      { equalityFn: shallow }
    );
  }

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
    this.setState(RentCarSlice.rentData.selectedOffice);
  }

  setState(data: Partial<SelectedOfficeDto>) {
    changeState((state) => {
      if (data) {
        state.rentData.selectedOffice = {
          ...state.rentData.selectedOffice,
          ...data,
        };
      }
    });
  }

  selectVehicle(data: VehicleVm) {
    const {
      rentData: {
        selectedOffice: { startDate, endDate },
      },
    } = getRentState();
    const start = moment(startDate);
    const end = moment(endDate);

    const days = end.diff(start, "days");
    const price = days * data.pricePerDay;
    changeState((state) => {
      if (data) {
        state.rentData.selectedVehicle = data;
        state.rentData.totalPrice = price;
      }
    });
  }

  private validate(
    key: keyof RentValidation,
    validation: Pick<ValidationVO, "valid">
  ) {
    changeState((state) => {
      if (validation) {
        state.rentData.rentValidation[key] = {
          ...state.rentData.rentValidation[key],
          ...validation,
        };
      }
    });
  }
}
