import { get, set } from "../..";

export const toggleSidebar = (flag?: boolean) => {
  const { sidebarState } = get();

  set({
    sidebarState: {
      ...sidebarState,
      open: flag == null ? !sidebarState.open : flag,
    },
  });
};
