import { get } from "../../../../store";
import { RentDataConfirmVm } from "../../../rent-car/client/vm/RentDataConfirmVm";
import { ClientUserVm } from "../client/vm/ClientUserVm";

export interface ClientUserProps {
  loggedClient: {
    info: ClientUserVm;
    activeRent: RentDataConfirmVm;
    historyRents: RentDataConfirmVm[];
  };
}

export const ClientUserSlice: ClientUserProps = {
  loggedClient: {
    info: null,
    activeRent: null,
    historyRents: [],
  },
};

export const getClientState: () => ClientUserProps = () => {
  const { loggedClient } = get();

  return { loggedClient };
};
