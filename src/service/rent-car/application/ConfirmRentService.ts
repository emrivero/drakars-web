import { changeState, get } from "../../../store";
import { RentCarClient } from "../client";
import { ConfirmRentDto } from "../client/dto/ConfirmRentDto";
import { RentDataConfirmVm } from "../client/vm/RentDataConfirmVm";
import { getRentState } from "../state";

export class ConfirmRentService {
  private client: RentCarClient = new RentCarClient();
  private static instance: ConfirmRentService;
  private constructor() {
    //
  }

  static create() {
    if (!this.instance) {
      this.instance = new ConfirmRentService();
    }
    return this.instance;
  }

  async confirm() {
    const { logged } = get().loggedInfoState;
    const { rentData } = getRentState();
    const dto = ConfirmRentDto.create(rentData);
    let response = null;
    if (logged) {
      response = await this.client.post("logged", dto);
    } else {
      response = await this.client.post("", dto);
    }
    const { data, status } = response;
    if (status < 300) {
      this.setState(data);
    }
    return { data, status };
  }

  private setState(data: RentDataConfirmVm) {
    changeState((state) => {
      state.rentConfirmData = data;
    });
  }
}
