import { Box } from "@mui/material";
import { FC } from "react";
import { AdminHeader } from "../header";
import { AdminSidebar } from "../sidebar";

export const AdminLayout: FC = ({ children }) => {
  return (
    <Box sx={{ width: 1 }}>
      <AdminHeader />
      <AdminSidebar />
      {children}
    </Box>
  );
};
