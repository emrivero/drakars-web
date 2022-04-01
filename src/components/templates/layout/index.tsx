import { Box } from "@mui/material";
import { FC } from "react";
import { Footer } from "../footer";
import { Header } from "../header";
import { Sidebar } from "../sidebar";

export const Layout: FC = ({ children }) => {
  return (
    <Box sx={{ width: 1 }}>
      <Header />
      {children}
      <Sidebar />
      <Box sx={{ width: 1, mb: 2 }} />
      <Footer />
    </Box>
  );
};
