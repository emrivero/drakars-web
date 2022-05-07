import { Grid } from "@mui/material";
import { FC } from "react";
import { AdminLayout } from "../../../components/templates/admin/layout";

export const GeneralStats: FC = () => {
  return (
    <AdminLayout title="Estadísticas generales">
      <Grid container rowSpacing={4}></Grid>
    </AdminLayout>
  );
};
