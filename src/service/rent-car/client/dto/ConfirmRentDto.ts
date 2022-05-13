import moment from "moment";
import { RentData } from "../../state";

export class ConfirmRentDto {
  constructor(
    public readonly properties: {
      readonly vehicle: number;
      readonly user: {
        name: string;
        lastName: string;
        dni: string;
        email: string;
        phone: string;
      };
      readonly startDate: string;
      readonly endDate: string;
      readonly paymentStatus: "pending" | "paid";
      readonly paymentDate?: string;
      readonly paymentType?: "visa" | "paypal";
      readonly originOffice: number;
      readonly destinyOffice: number;
    }
  ) {}

  static create({
    userData: { name, lastName, dni, email, phone, onlinePay, paymentType },
    selectedOffice,
    selectedVehicle,
  }: RentData) {
    return new ConfirmRentDto({
      startDate: selectedOffice.startDate,
      endDate: selectedOffice.endDate,
      user: {
        name,
        lastName,
        dni,
        email,
        phone,
      },
      paymentStatus: onlinePay ? "paid" : "pending",
      paymentDate: onlinePay ? moment().format("DD-MM-YYYY") : null,
      vehicle: selectedVehicle.id,
      paymentType,
      originOffice: selectedOffice.originOffice,
      destinyOffice:
        selectedOffice.destinyOffice || selectedOffice.originOffice,
    });
  }

  toJSON() {
    return this.properties;
  }
}
