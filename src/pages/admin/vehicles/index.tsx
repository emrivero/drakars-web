import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "../../../components/templates/admin/layout";
import { AdminPagination } from "../../../components/templates/admin/pagination";
import { useVehicleService } from "../../../service/vehicle/application";
import { vehicleColumns } from "../../../service/vehicle/application/model/VehicleGridColumn";
import { useStore } from "../../../store";

export const ListVehicles: FC = () => {
  const {
    paginatedVehicles: {
      data,
      paginationOptions: { search, totalItems, currentPage, itemsPerPage },
    },
  } = useStore();
  const {
    paginator,
    mappers: { VehicleGridRowMapper },
  } = useVehicleService();

  const navigation = useNavigate();

  useEffect(() => {
    paginator.paginate();
  }, [currentPage, itemsPerPage, search]);

  return (
    <AdminLayout title="Vehículos">
      <AdminPagination
        onAddItem={() => navigation("/admin/vehicles/add")}
        onRemoveItems={(row) => console.log(row)}
        addText="Añadir vehículo"
        textFieldSearch={{
          onChange: (e) => paginator.onFilter({ search: e.target.value }),
          value: search,
          placeholder: "Introduce marca o modelo de vehículo",
        }}
        tableProps={{
          onSelect: (rows) => console.log(rows),
          columns: vehicleColumns,
          paginationProps: {
            count: totalItems,
            page: currentPage,
            onPageChange: (e, page) => paginator.changePage(page),
            onRowsPerPageChange: (e) =>
              paginator.changeRows(parseInt(e.target.value)),
            rowsPerPage: itemsPerPage,
            rowsPerPageOptions: [10, 25],
          },
          ActionsProps: {
            onEdit: (row) => console.log(row),
          },
          rows: data.data.map(VehicleGridRowMapper),
        }}
      />
    </AdminLayout>
  );
};
