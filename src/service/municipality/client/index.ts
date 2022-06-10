import { Client } from "../../base/client";
import { MunicipalityVm } from "./view/MunicipalityVm";

export class MunicipalityClient extends Client<
  MunicipalityVm,
  MunicipalityVm[],
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown
> {
  constructor() {
    super("municipality");
  }

  async getByCity(cityId: number, name: string) {
    return await this.genericRequest<MunicipalityVm[]>({
      method: "get",
      resource: `list/by-city/${cityId}/${name}`,
    });
  }
}
