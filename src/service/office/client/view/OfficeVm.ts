import { BaseVm } from "../../../base/client/view/BaseVm";
import { MunicipalityVm } from "../../../municipality/client/view/MunicipalityVm";

export class OfficeVm extends BaseVm {
  constructor(
    id: number,
    createdAt,
    updatedAt,
    public readonly name: string,
    public readonly address: string,
    public readonly zipCode: string,
    public readonly municipality: MunicipalityVm
  ) {
    super(id, createdAt, updatedAt);
  }

  static create(office: OfficeVm): OfficeVm {
    return new OfficeVm(
      office.id,
      office.createdAt,
      office.updatedAt,
      office.name,
      office.address,
      office.zipCode,
      office.municipality
    );
  }

  get title() {
    return `${this.name} - ${this.municipality.name}`;
  }
}
