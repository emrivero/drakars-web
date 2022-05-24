import { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { AdminLayout } from "../../../../components/templates/admin/layout";
import { AdminPagination } from "../../../../components/templates/admin/pagination";
import { useAdminServices } from "../../../../service/user/admin/application";
import { adminColumns } from "../../../../service/user/admin/application/model/AdminGridColumn";
import { useStore } from "../../../../store";

export const AdminUsers: FC = () => {
  const {
    paginatedAdmins: {
      data,
      paginationOptions: { search, totalItems, currentPage, itemsPerPage },
    },
  } = useStore();
  const { paginatorAdmin } = useAdminServices();

  const navigation = useNavigate();

  useEffect(() => {
    paginatorAdmin.paginate();
  }, [currentPage, itemsPerPage, search]);

  return (
    <AdminLayout title="Editores">
      <AdminPagination
        onAddItem={() => navigation("/admin/vehicles/add")}
        onRemoveItems={(row) => console.log(row)}
        addText="Añadir vehículo"
        textFieldSearch={{
          onChange: (e) => paginatorAdmin.onFilter({ search: e.target.value }),
          value: search,
          placeholder: "Introduce nombre o correo eléctronico",
        }}
        tableProps={{
          onSelect: (rows) => console.log(rows),
          columns: adminColumns,
          paginationProps: {
            count: totalItems,
            page: currentPage,
            onPageChange: (e, page) => paginatorAdmin.changePage(page),
            onRowsPerPageChange: (e) =>
              paginatorAdmin.changeRows(parseInt(e.target.value)),
            rowsPerPage: itemsPerPage,
            rowsPerPageOptions: [10, 25],
          },
          ActionsProps: {
            onEdit: (row) => console.log(row),
          },
          rows: data.data.map((value) => ({
            index: `${value.id}`,
            name: value.name,
            family_name: value.family_name,
            email: value.email,
          })),
        }}
      />
    </AdminLayout>
  );
};
