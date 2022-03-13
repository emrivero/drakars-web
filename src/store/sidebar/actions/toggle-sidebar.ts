import { get, set } from "../..";

export const toggleSidebar = () => {
  const { sidebarState } = get();

  set({
    sidebarState: {
      ...sidebarState,
      open: !sidebarState.open,
    },
  });
};
