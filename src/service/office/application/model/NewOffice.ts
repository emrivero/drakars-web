import { OfficeDto } from "../../client/dto/OfficeDto";

export class NewOffice {
  constructor(
    public readonly name: string,
    public readonly address: string,
    public readonly zipCode: string,
    public readonly municipalityId: number
  ) {}

  static create(officeDto: OfficeDto) {
    return new NewOffice(
      officeDto.name,
      officeDto.address,
      officeDto.zipCode,
      officeDto.municipalityId
    );
  }
}
