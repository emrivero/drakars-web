import { BaseVm } from "../../../base/client/view/BaseVm";
import { OfficeVm } from "../../../office/client/view/OfficeVm";
import { VehicleImageVm } from "../../../user/admin/client/view/VehicleImageVm";

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
    public readonly pricePerDay: number,
    public readonly office: OfficeVm,
    public readonly image: VehicleImageVm
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
      vehicle.pricePerDay,
      vehicle.office,
      vehicle.image
    );
  }

  get title() {
    return `${this.mark} ${this.model}`;
  }
}
