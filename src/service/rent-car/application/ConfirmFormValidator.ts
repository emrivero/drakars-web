import { FormValidator } from "../../base/utils/FormValidator";
import { UserData } from "./model/user-data";

export const ConfirmFormValidator = new FormValidator<UserData>({
  dni: [
    {
      errorMessage: "El formato es 8 número y una letra. Sin espacios",
      isValid: (value) => {
        return /[0-9]{8}[A-Za-z]/.test(value);
      },
    },
  ],
  phone: [
    {
      errorMessage: "El formato es 6 números comenzando en 6 o 7.",
      isValid: (value) => {
        return /^\+?(6\d{2}|7[1-9]\d{1})\d{6}$/.test(value);
      },
    },
  ],
  lastName: [
    {
      errorMessage: "El nombre no puede estar vacío",
      isValid: (value) => value !== "",
    },
  ],
  name: [
    {
      errorMessage: "El nombre no puede estar vacío",
      isValid: (value) => value !== "",
    },
  ],
  email: [
    {
      isValid: (value) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value),
      errorMessage: "El email tiene que ser válido",
    },
  ],
});
