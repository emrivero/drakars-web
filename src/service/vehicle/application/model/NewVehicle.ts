import { VehicleDto } from "../../client/dto/VehicleDto";

export class NewVehicle {
  constructor(
    public readonly year: number,
    public readonly model: string,
    public readonly mark: string,
    public readonly transmission: string,
    public readonly type: string,
    public readonly office: number,
    public readonly seats: number,
    public readonly pricePerDay: number,
    public readonly fuel: string,
    public readonly doors: number
  ) {}

  static create(officeDto: VehicleDto) {
    return new NewVehicle(
      officeDto.year,
      officeDto.model,
      officeDto.mark,
      officeDto.transmission,
      officeDto.type,
      officeDto.officeId,
      officeDto.seats,
      officeDto.pricePerDay,
      officeDto.fuel,
      officeDto.doors
    );
  }
}
