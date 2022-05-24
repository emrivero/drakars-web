import { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { AdminLayout } from "../../../../components/templates/admin/layout";
import { AdminPagination } from "../../../../components/templates/admin/pagination";
import { useAdminServices } from "../../../../service/user/admin/application";
import { adminColumns } from "../../../../service/user/admin/application/model/AdminGridColumn";
import { useStore } from "../../../../store";

export const ClientUsers: FC = () => {
  const {
    paginatedClients: {
      data,
      paginationOptions: { search, totalItems, currentPage, itemsPerPage },
    },
  } = useStore();
  const { paginatorClient } = useAdminServices();

  const navigation = useNavigate();

  useEffect(() => {
    paginatorClient.paginate();
  }, [currentPage, itemsPerPage, search]);

  return (
    <AdminLayout title="Editores">
      <AdminPagination
        onAddItem={() => navigation("/admin/vehicles/add")}
        onRemoveItems={(row) => console.log(row)}
        addText="Añadir vehículo"
        textFieldSearch={{
          onChange: (e) => paginatorClient.onFilter({ search: e.target.value }),
          value: search,
          placeholder: "Introduce nombre o correo eléctronico",
        }}
        tableProps={{
          onSelect: (rows) => console.log(rows),
          columns: adminColumns,
          paginationProps: {
            count: totalItems,
            page: currentPage,
            onPageChange: (e, page) => paginatorClient.changePage(page),
            onRowsPerPageChange: (e) =>
              paginatorClient.changeRows(parseInt(e.target.value)),
            rowsPerPage: itemsPerPage,
            rowsPerPageOptions: [10, 25],
          },
          ActionsProps: {
            onEdit: (row) => console.log(row),
          },
          rows: data?.data?.map((value) => ({
            index: `${value?.id}`,
            name: value?.name,
            family_name: value?.family_name,
            email: value?.email,
          })),
        }}
      />
    </AdminLayout>
  );
};
