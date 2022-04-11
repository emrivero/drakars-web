import { Box } from "@mui/material";
import type { NextPage } from "next";
import { AdminLayout } from "../../../src/components/templates/admin/layout";

const Admins: NextPage = () => {
  return (
    <AdminLayout>
      <Box sx={{ flexGrow: 1 }}></Box>
    </AdminLayout>
  );
};

export default Admins;
