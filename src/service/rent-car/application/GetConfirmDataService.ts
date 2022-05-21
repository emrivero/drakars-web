import { changeState } from "../../../store";
import { RentCarClient } from "../client";
import { RentDataConfirmVm } from "../client/vm/RentDataConfirmVm";
import { OfficeMapLabel } from "./mappers/SelectedOfficeOption";

export class GetConfirmDataService {
  private readonly client = new RentCarClient();
  private static instance: GetConfirmDataService;
  private constructor() {
    //
  }

  static create() {
    if (!this.instance) {
      this.instance = new GetConfirmDataService();
    }
    return this.instance;
  }
  async fetch(email: string, reference: string) {
    const { data } = await this.client.getById(`${email}/${reference}`);

    this.setState(data);

    return data;
  }

  private setState(data: RentDataConfirmVm) {
    changeState((state) => {
      if (data) {
        state.rentConfirmData = data;
        state.editRentData = {
          ...state.editRentData,
          destinyOffice: data.destinyOffice.id,
          endDate: data.endDate,
          endHour: data.endHour,
          searchDestinyOffice: OfficeMapLabel(data.destinyOffice),
        };
      }
    });
  }
}
