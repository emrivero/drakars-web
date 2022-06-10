import { useState } from "react";
import { DeleteClientService } from "./DeleteClientService";
import { GetClientService } from "./GetClientService";
import { ProfileFormValidator } from "./ProfileFormValidator";
import { UpdateClientService } from "./UpdateClientService";

export const useClientService = () => {
  const getter = GetClientService.create();
  const editor = UpdateClientService.create();
  const deleter = DeleteClientService.create();
  const [clientServices] = useState({
    deleter,
    getter,
    editor,
    formValidator: ProfileFormValidator,
  });

  return clientServices;
};
