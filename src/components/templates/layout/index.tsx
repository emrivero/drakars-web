import { Box } from "@mui/material";
import { FC, useEffect } from "react";
import { toggleSidebar } from "../../../store/sidebar/actions/toggle-sidebar";
import { BottomBar } from "../../organism/bottom-bar";
import { Footer } from "../footer";
import { Header } from "../header";
import { Sidebar } from "../sidebar";

export const Layout: FC = ({ children }) => {
  useEffect(() => {
    toggleSidebar(false);
  }, []);
  return (
    <Box sx={{ width: 1 }}>
      <Header />
      {children}
      <Sidebar />
      <Box sx={{ width: 1, mb: 2 }} />
      <Footer />
      <BottomBar />

      {/* <CookieConsent /> */}
    </Box>
  );
};
