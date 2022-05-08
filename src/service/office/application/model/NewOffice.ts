import { OfficeDto } from "../../client/dto/OfficeDto";

export class NewOffice {
  constructor(
    public readonly name: string,
    public readonly address: string,
    public readonly zipCode: string,
    public readonly morningOpeningTime: string,
    public readonly morningClosingTime: string,
    public readonly eveningOpeningTime: string,
    public readonly eveningClosingTime: string,
    public readonly municipality: number
  ) {}

  static create(officeDto: OfficeDto) {
    return new NewOffice(
      officeDto.name,
      officeDto.address,
      officeDto.zipCode,
      officeDto.morningOpeningTime,
      officeDto.morningClosingTime,
      officeDto.eveningOpeningTime,
      officeDto.eveningClosingTime,
      officeDto.municipalityId
    );
  }
}
