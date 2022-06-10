import shallow from "zustand/shallow";
import { changeState, useStore } from "../../../store";
import { ValidationVO } from "../../base/model/ValidationVO";
import { OfficeClient } from "../../office/client";
import { RentCarClient } from "../client";
import { EditRentDto } from "../client/dto/EditRentDto";
import { SelectedOfficeDto } from "../client/dto/SelectedOfficeDto";
import { RentDataConfirmVm } from "../client/vm/RentDataConfirmVm";
import { getRentState } from "../state";
import { RentValidation } from "./model/RentValidation";

export class EditRentService {
  private readonly client = new OfficeClient();
  private readonly rentClient = new RentCarClient();
  private static instance: EditRentService = null;

  static create() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new EditRentService();
    return this.instance;
  }

  private constructor() {
    useStore.subscribe(
      ({ editRentData }) => [
        editRentData.destinyOffice,
        editRentData.endHour,
        editRentData.endDate,
      ],
      (state) => this.onValidate(state),
      { equalityFn: shallow }
    );
  }

  async edit() {
    const {
      editRentData: { validation, endDate, endHour, destinyOffice },
      rentConfirmData: {
        reference,
        renterUser: { dni },
      },
    } = getRentState();

    const isValid = Object.values(validation).every(({ valid }) => valid);
    if (isValid) {
      const dto = EditRentDto.create({ endDate, endHour, destinyOffice });
      return await this.rentClient.patch(`${dni}/${reference}`, dto);
    }
    return null;
  }

  async onSearchDestiny(name) {
    if (name) {
      const { data } = await this.client.searchByName(name);
      this.setState({ searchDestinyOffice: name, destinyOffices: data });
    }
  }

  setState(
    data: Partial<
      Pick<SelectedOfficeDto, "destinyOffices" | "searchDestinyOffice"> &
        Pick<RentDataConfirmVm, "endDate" | "endHour"> & {
          validation: Pick<RentValidation, "endHour">;
          destinyOffice: number;
        }
    >
  ) {
    changeState((state) => {
      if (data) {
        state.editRentData = {
          ...state.editRentData,
          ...data,
        };
      }
    });
  }

  async onValidate(state) {
    const [destinyOffice, endHour, endDate] = state as [number, string, string];
    if (destinyOffice && endHour) {
      const { data } = await this.client.validateTime(destinyOffice, endHour);
      this.validate("endHour", { valid: data.result });
    }
  }

  private validate(
    key: keyof RentValidation,
    validation: Pick<ValidationVO, "valid">
  ) {
    changeState((state) => {
      if (validation) {
        state.editRentData.validation[key] = {
          ...state.editRentData.validation[key],
          ...validation,
        };
      }
    });
  }
}
