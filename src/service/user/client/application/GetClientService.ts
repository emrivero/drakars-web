import { changeState } from "../../../../store";
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

  setClient(client: Partial<ClientUserVm>) {
    changeState(({ loggedClient }) => {
      const { info } = loggedClient;
      loggedClient.info = { ...info, ...client };
    });
  }
}
