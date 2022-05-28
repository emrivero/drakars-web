import { changeState } from "../../../../store";
import { RentDataConfirmVm } from "../../../rent-car/client/vm/RentDataConfirmVm";
import { ClientClient } from "../client";
import { ClientUserVm } from "../client/vm/ClientUserVm";

export class GetClientService {
  private readonly client = new ClientClient();
  private static instance: GetClientService;
  private constructor() {
    //
  }

  static create() {
    if (!this.instance) {
      this.instance = new GetClientService();
    }
    return this.instance;
  }

  async getMe() {
    const { data } = await this.client.getById("getme");

    this.setClient(data);
  }

  async getRent() {
    const { data } = await this.client.getRent();

    this.setRent(data);
    return data;
  }

  async getRents() {
    const { data } = await this.client.getRents();

    this.setHistory(data);
  }

  private setHistory(data: RentDataConfirmVm[]) {
    changeState(({ loggedClient }) => {
      loggedClient.historyRents = data;
    });
  }

  private setRent(rent: RentDataConfirmVm) {
    changeState(({ loggedClient }) => {
      loggedClient.activeRent = rent;
    });
  }

  setClient(client: Partial<ClientUserVm>) {
    changeState(({ rentData }) => {
      rentData.userData = {
        ...rentData.userData,
        dni: client.dni,
        name: client.name,
        lastName: client.family_name,
        email: client.email,
      };
    });

    changeState(({ loggedClient }) => {
      const { info } = loggedClient;
      loggedClient.info = { ...info, ...client };
    });
  }
}
