import { changeState } from "../../../store";
import { UserData } from "./model/user-data";

export class SaveUserDataService {
  private static instance: SaveUserDataService;
  private constructor() {
    //
  }

  static create() {
    if (!this.instance) {
      this.instance = new SaveUserDataService();
    }
    return this.instance;
  }

  set(data: Partial<UserData>) {
    changeState((state) => {
      state.rentData.userData = {
        ...state.rentData.userData,
        ...data,
      };
    });
  }
}
