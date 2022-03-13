import { Box } from "@mui/material";
import type { NextPage } from "next";
import { Layout } from "../src/components/templates/layout";

const Home: NextPage = () => {
  return <Box sx={{ flexGrow: 1 }}></Box>;
};

export default Layout(Home);
