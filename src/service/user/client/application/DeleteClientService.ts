import { changeState } from "../../../../store";
import { ClientClient } from "../client";
import { ClientUserProps, ClientUserSlice } from "../state";

export class DeleteClientService {
  private readonly client = new ClientClient();
  private static instance: DeleteClientService;
  private constructor() {
    //
  }

  static create() {
    if (!this.instance) {
      this.instance = new DeleteClientService();
    }
    return this.instance;
  }

  async deleteMe() {
    await this.client.delete("deleteme");

    this.setClient(ClientUserSlice);
  }

  setClient(client: ClientUserProps) {
    changeState((state) => {
      state = {
        ...state,
        ...client,
      };
    });
  }
}
