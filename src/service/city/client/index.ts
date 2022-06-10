import { Client } from "../../base/client";
import { CityVm } from "./view/CityVm";

export class CityClient extends Client<
  CityVm,
  CityVm[],
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown
> {
  constructor() {
    super("city");
  }

  async searchByName(name: string) {
    return await this.genericRequest<CityVm[]>({
      method: "get",
      resource: `search/${name}`,
    });
  }
}
