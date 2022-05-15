export class EditRentDto {
  constructor(
    public readonly properties: {
      readonly endDate: string;
      readonly endHour: string;
      readonly destinyOffice: number;
    }
  ) {}

  static create({
    endDate,
    endHour,
    destinyOffice,
  }: {
    endDate: string;
    endHour: string;
    destinyOffice: number;
  }) {
    return new EditRentDto({
      endDate: endDate,
      endHour: endHour,
      destinyOffice: destinyOffice,
    });
  }

  toJSON() {
    return this.properties;
  }
}
