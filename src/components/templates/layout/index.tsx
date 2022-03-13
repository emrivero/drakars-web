import { Box } from "@mui/material";
import { Footer } from "../footer";
import { Header } from "../header";
import { Sidebar } from "../sidebar";

export const Layout = (Component) => {
  return () => (
    <Box sx={{ width: 1 }}>
      <Header />
      <Component />
      <Sidebar />
      <Box sx={{ width: 1, mb: 2 }} />
      <Footer />
    </Box>
  );
};
