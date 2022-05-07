import { FC } from "react";
import { AdminLayout } from "../../../components/templates/admin/layout";
import { AdminPagination } from "../../../components/templates/admin/pagination";
import { vehicleColumns } from "../../../service/vehicle/application/model/VehicleGridColumn";

export const ListVehicles: FC = () => {
  return (
    <AdminLayout title="Vehículos">
      <AdminPagination
        onAddItem={() => null}
        onRemoveItems={(row) => console.log(row)}
        addText="Añadir vehículo"
        textFieldSearch={{
          placeholder: "Introduce marca o modelo de vehículo",
        }}
        tableProps={{
          onSelect: (rows) => console.log(rows),
          columns: vehicleColumns,
          paginationProps: {
            count: 0,
            page: 0,
            onPageChange: () => null,
            onRowsPerPageChange: () => null,
            rowsPerPage: 10,
            rowsPerPageOptions: [10, 25],
          },
          ActionsProps: {
            onEdit: (row) => console.log(row),
          },
          rows: [],
        }}
      />
    </AdminLayout>
  );
};
