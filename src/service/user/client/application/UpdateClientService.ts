import { changeState } from "../../../../store";
import { ClientClient } from "../client";
import { ClientUserVm } from "../client/vm/ClientUserVm";
import { getClientState } from "../state";

export class UpdateClientService {
  private readonly client = new ClientClient();
  private static instance: UpdateClientService;
  private constructor() {
    //
  }

  static create() {
    if (!this.instance) {
      this.instance = new UpdateClientService();
    }
    return this.instance;
  }

  async editMe() {
    const {
      loggedClient: { info },
    } = getClientState();
    const { data } = await this.client.put("editme", {
      family_name: info.family_name,
      name: info.name,
      phone: info.phone,
      dni: info.dni,
    });

    this.setClient(data);
  }

  private setClient(client: ClientUserVm) {
    changeState(({ loggedClient }) => {
      loggedClient.info = client;
    });
  }
}
