import { set } from "../..";

export const setLoggedInfo = (logged: boolean) => {
  set({ loggedInfoState: { logged } });
};
