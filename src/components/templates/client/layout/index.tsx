import { Box } from "@mui/material";
import { FC, useEffect } from "react";
import { toggleSidebar } from "../../../../store/sidebar/actions/toggle-sidebar";
import { BottomBar } from "../../../organism/bottom-bar";
import { Footer } from "../footer";
import { Header } from "../header";
import { Sidebar } from "../sidebar";

export interface LayoutProps {
  showFooter?: boolean;
}

export const Layout: FC<LayoutProps> = ({ children, showFooter = true }) => {
  useEffect(() => {
    toggleSidebar(false);
  }, []);
  return (
    <Box sx={{ width: 1, mb: { xs: 8, md: 1 } }}>
      <Header />
      {children}
      <Sidebar />
      <Box sx={{ width: 1, mb: 2 }} />
      {showFooter && <Footer />}
      <BottomBar />

      {/* <CookieConsent /> */}
    </Box>
  );
};
