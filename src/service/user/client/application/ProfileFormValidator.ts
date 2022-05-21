import { FormValidator } from "../../../base/utils/FormValidator";
import { ClientUserVm } from "../client/vm/ClientUserVm";

export const ProfileFormValidator = new FormValidator<ClientUserVm>({
  dni: [
    {
      errorMessage: "El formato es 8 número y una letra. Sin espacios",
      isValid: (value) => {
        return /[0-9]{8}[A-Za-z]/.test(value) || !value;
      },
    },
  ],
  phone: [
    {
      errorMessage: "El formato es 6 números comenzando en 6 o 7.",
      isValid: (value) => {
        return /^\+?(6\d{2}|7[1-9]\d{1})\d{6}$/.test(value) || !value;
      },
    },
  ],
  family_name: [
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
});
