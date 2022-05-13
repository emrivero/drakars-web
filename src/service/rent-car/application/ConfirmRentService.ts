import { changeState } from "../../../store";
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
    const { rentData } = getRentState();
    const dto = ConfirmRentDto.create(rentData);
    const { data } = await this.client.post("", dto);
    this.setState(data);
    return data;
  }

  private setState(data: RentDataConfirmVm) {
    changeState((state) => {
      state.rentConfirmData = data;
    });
  }
}
