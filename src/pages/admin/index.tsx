import { Box } from "@mui/material";
import { AdminLayout } from "../../components/templates/admin/layout";

const AdminHome = () => {
  return (
    <AdminLayout title="Bienvenido, Paco">
      <Box sx={{ flexGrow: 1 }}></Box>
    </AdminLayout>
  );
};

export default AdminHome;
