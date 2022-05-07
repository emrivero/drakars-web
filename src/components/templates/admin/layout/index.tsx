import { Box, CssBaseline, Toolbar } from "@mui/material";
import { FC } from "react";
import { AdminHeader } from "../header";
import { AdminSidebar } from "../sidebar";

export interface AdminLayoutProps {
  title?: string;
}

export const AdminLayout: FC<AdminLayoutProps> = ({ children, title }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AdminHeader title={title} />
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1, ml: "280px", p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
