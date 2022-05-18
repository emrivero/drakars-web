import { get } from "../../../../store";
import { ClientUserVm } from "../client/vm/ClientUserVm";

export interface ClientUserProps {
  loggedClient: {
    info: ClientUserVm;
  };
}

export const ClientUserSlice: ClientUserProps = {
  loggedClient: {
    info: null,
  },
};

export const getClientState: () => ClientUserProps = () => {
  const { loggedClient } = get();

  return { loggedClient };
};
