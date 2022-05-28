import { changeState } from "../../../../store";
import { OfficeClient } from "../../../office/client";
import { AdminClient } from "../client";
import { getAdminState } from "../state";

export class ManageRentService {
  private readonly officeClient = new OfficeClient();
  private readonly client = new AdminClient();
  private static instance: ManageRentService = null;
  private constructor() {
    //
  }

  static create(): ManageRentService {
    if (!this.instance) {
      this.instance = new ManageRentService();
    }
    return this.instance;
  }

  async getRent() {
    const { rentRefValue } = getAdminState();
    const { data, status } = await this.client.getRentByReference(rentRefValue);
    if (status < 300) {
      changeState((state) => {
        state.rentInfo = data;
      });
    }

    return { data, status };
  }

  async checkIn() {
    const { rentInfo } = getAdminState();
    const { data, status } = await this.client.checkIn(rentInfo.id);

    return { data, status };
  }

  clear() {
    changeState((state) => {
      state.rentInfo = null;
      state.rentRefValue = "";
    });
  }

  async checkOut() {
    const { rentInfo } = getAdminState();
    const { data, status } = await this.client.checkOut(rentInfo.id);

    return { data, status };
  }

  changeRentValue(value: string) {
    changeState((state) => {
      state.rentRefValue = value;
    });
  }
}
