import { BaseVm } from "../../../base/client/view/BaseVm";
import { CityVm } from "../../../city/client/view/CityVm";

export class MunicipalityVm extends BaseVm {
  constructor(
    id: number,
    createdAt,
    updatedAt,
    public readonly name: string,
    public readonly code: string,
    public readonly city_code: string,
    public readonly city: CityVm
  ) {
    super(id, createdAt, updatedAt);
  }

  static create(office: MunicipalityVm): MunicipalityVm {
    return new MunicipalityVm(
      office.id,
      office.createdAt,
      office.updatedAt,
      office.name,
      office.code,
      office.city_code,
      office.city
    );
  }
}
