import { get } from "../..";

export const isLoggedInfo = () => get().loggedInfoState?.logged;
