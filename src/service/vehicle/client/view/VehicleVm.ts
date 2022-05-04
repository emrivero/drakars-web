import { BaseVm } from "../../../base/client/view/BaseVm";

export class VehicleVm extends BaseVm {
  constructor(
    id: number,
    createdAt,
    updatedAt,
    public readonly year: number,
    public readonly model: string,
    public readonly mark: string,
    public readonly seats: number,
    public readonly doors: number,
    public readonly fuel: string,
    public readonly transmission: "manual" | "automatic",
    public readonly type: "small" | "medium" | "large" | "premium",
    public readonly rented: boolean,
    public readonly limitKm: number,
    public readonly pricePerday: number
  ) {
    super(id, createdAt, updatedAt);
  }

  static create(vehicle: VehicleVm) {
    return new VehicleVm(
      vehicle.id,
      vehicle.createdAt,
      vehicle.updatedAt,
      vehicle.year,
      vehicle.model,
      vehicle.mark,
      vehicle.seats,
      vehicle.doors,
      vehicle.fuel,
      vehicle.transmission,
      vehicle.type,
      vehicle.rented,
      vehicle.limitKm,
      vehicle.pricePerday
    );
  }

  get title() {
    return `${this.mark} ${this.model}`;
  }
}
