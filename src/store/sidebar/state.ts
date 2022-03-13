interface SidebarProps {
  open: boolean;
}

export const SidebarSlice: { sidebarState: SidebarProps } = {
  sidebarState: {
    open: false,
  },
};
