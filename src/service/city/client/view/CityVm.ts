import { BaseVm } from "../../../base/client/view/BaseVm";

export class CityVm extends BaseVm {
  constructor(
    id: number,
    createdAt,
    updatedAt,
    public readonly name: string,
    public readonly code: string
  ) {
    super(id, createdAt, updatedAt);
  }

  static create(office: CityVm): CityVm {
    return new CityVm(
      office.id,
      office.createdAt,
      office.updatedAt,
      office.name,
      office.code
    );
  }
}
