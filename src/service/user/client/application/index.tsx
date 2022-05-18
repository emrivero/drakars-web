import { useState } from "react";
import { useStore } from "../../../../store";
import { FormValidator } from "../../../base/utils/FormValidator";
import { ClientUserVm } from "../client/vm/ClientUserVm";
import { GetClientService } from "./GetClientService";
import { UpdateClientService } from "./UpdateClientService";

const validators = {
  phone: [
    {
      errorMessage: "El formato es 8 número y una letra. Sin espacios",
      isValid: (value) => {
        return /^\+?(6\d{2}|7[1-9]\d{1})\d{6}$/.test(value);
      },
    },
  ],
};

export const useClientService = () => {
  const { info } = useStore((state) => state.loggedClient);
  const getter = GetClientService.create();
  const editor = UpdateClientService.create();
  const [clientServices] = useState({
    getter,
    editor,
    formValidator: new FormValidator<ClientUserVm>({
      phone: [
        {
          errorMessage: "El formato es 8 número y una letra. Sin espacios",
          isValid: (value) => {
            return /^\+?(6\d{2}|7[1-9]\d{1})\d{6}$/.test(value);
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
    }),
  });

  return clientServices;
};
