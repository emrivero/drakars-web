import { FormValidator } from "../../base/utils/FormValidator";
import { VehicleDto } from "../client/dto/VehicleDto";

export const NewVehicleValidator = new FormValidator<VehicleDto>({
  mark: [
    {
      isValid: (mark) => !!mark,
      errorMessage: "Elija una marca",
    },
  ],
  model: [
    {
      isValid: (model) => !!model,
      errorMessage: "Indique un modelo",
    },
  ],
  image: [
    {
      isValid: (image) => !!image,
      errorMessage: "Seleccione una imagen",
    },
  ],
  pricePerDay: [
    {
      isValid: (price) => !isNaN(parseFloat(price)),
      errorMessage: "Introduzca un precio",
    },
  ],
});
