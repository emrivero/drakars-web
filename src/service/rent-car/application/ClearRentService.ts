import { changeState } from "../../../store";
import { RentCarSlice } from "../state";

export class ClearRentDataService {
  private static instance: ClearRentDataService;
  private constructor() {
    //
  }

  static create() {
    if (!this.instance) {
      this.instance = new ClearRentDataService();
    }
    return this.instance;
  }

  clear() {
    changeState((state) => {
      state.rentData = RentCarSlice.rentData;
    });
  }
}
