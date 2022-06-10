import moment from "moment";
import { FormValidator } from "../../base/utils/FormValidator";
import { OfficeDto } from "../client/dto/OfficeDto";

export const NewOfficeValidator = new FormValidator<OfficeDto>({
  cityId: [
    {
      errorMessage: "Elija una ciudad",
      isValid: (value) => !!value,
    },
  ],
  municipalityId: [
    {
      errorMessage: "Elija un municipio",
      isValid: (value) => !!value,
    },
  ],
  address: [
    {
      errorMessage: "Añada una dirección",
      isValid: (value) => !!value,
    },
  ],
  name: [
    {
      errorMessage: "Añada un nombre de oficina",
      isValid: (value) => !!value,
    },
  ],
  phone: [
    {
      errorMessage: "Formato de teléfono no válido",
      isValid: (value) => /9[0-9]{8}/.test(value),
    },
  ],
  zipCode: [
    {
      errorMessage: "Añada el código postal",
      isValid: (value) => !!value,
    },
  ],
  morningOpeningTime: [
    {
      errorMessage: "La hora de inicio debe ser menor que la hora de cierre.",
      isValid: (value, target) => {
        const { morningClosingTime } = target;
        const openTime = moment(value, "HH:mm a");
        const closingHour = moment(morningClosingTime, "HH:mm a");
        return openTime.isBefore(closingHour);
      },
    },
  ],
  morningClosingTime: [
    {
      errorMessage: "La hora de inicio debe ser menor que la hora de cierre.",
      isValid: (value, target) => {
        const { morningOpeningTime } = target;
        const openTime = moment(morningOpeningTime, "HH:mm a");
        const closingHour = moment(value, "HH:mm a");
        return openTime.isBefore(closingHour);
      },
    },
  ],
  eveningOpeningTime: [
    {
      errorMessage: "La hora de inicio debe ser menor que la hora de cierre.",
      isValid: (value, target) => {
        const { eveningClosingTime, eveningTime } = target;
        const openTime = moment(value, "HH:mm a");
        const closingHour = moment(eveningClosingTime, "HH:mm a");
        return !eveningTime || openTime.isBefore(closingHour);
      },
    },
    {
      errorMessage:
        "La hora de cierre de mañana debe ser menor que la hora de inicio de tarde.",
      isValid: (value, target) => {
        const { eveningTime, morningClosingTime } = target;
        const openTime = moment(value, "HH:mm a");
        const closingHour = moment(morningClosingTime, "HH:mm a");
        return !eveningTime || closingHour.isBefore(openTime);
      },
    },
  ],
  eveningClosingTime: [
    {
      errorMessage: "La hora de inicio debe ser menor que la hora de cierre.",
      isValid: (value, target) => {
        const { eveningOpeningTime, eveningTime } = target;
        const closinTime = moment(value, "HH:mm a");
        const openingHour = moment(eveningOpeningTime, "HH:mm a");
        return !eveningTime || openingHour.isBefore(closinTime);
      },
    },
  ],
});
