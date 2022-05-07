import { Box, Grid, TextField } from "@mui/material";
import { FC } from "react";
import { CrudCheckboxTable } from "../../../components/templates/admin/dk-table";
import { AdminLayout } from "../../../components/templates/admin/layout";
import { officeColumns } from "../../../service/office/application/model/OfficeGridColum";

export const OfficesStats: FC = () => {
  return (
    <AdminLayout title="Estadísticas de Oficinas">
      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <TextField
            onChange={() => null}
            fullWidth
            placeholder="Buscar oficina"
            InputProps={{
              type: "search",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ width: "100%", height: "70vh" }}>
            <CrudCheckboxTable
              columns={officeColumns}
              ActionsProps={{
                onEdit: (row) => console.log(row),
              }}
              rows={[
                {
                  index: "1",
                  id: 1,
                  name: "nombre",
                  address: "Calle saddfssfdasdfrgasdfdghseds",
                  zipCode: 8787,
                },
                {
                  index: "2",
                  id: 2,
                  name: "nombre",
                  address: "Calle saddfssfdasdfrgasdfdghseds",
                  zipCode: 8787,
                },
              ]}
              onSelect={(rows) => console.log(rows)}
            />
          </Box>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};
