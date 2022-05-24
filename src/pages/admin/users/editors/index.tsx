import { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { AdminLayout } from "../../../../components/templates/admin/layout";
import { AdminPagination } from "../../../../components/templates/admin/pagination";
import { useAdminServices } from "../../../../service/user/admin/application";
import { adminColumns } from "../../../../service/user/admin/application/model/AdminGridColumn";
import { useStore } from "../../../../store";

export const EditorUsers: FC = () => {
  const {
    paginatedEditors: {
      data,
      paginationOptions: { search, totalItems, currentPage, itemsPerPage },
    },
  } = useStore();
  const { paginatorEditor } = useAdminServices();

  const navigation = useNavigate();

  useEffect(() => {
    paginatorEditor.paginate();
  }, [currentPage, itemsPerPage, search]);

  useEffect(() => {
    paginatorEditor.paginate();
  }, []);

  return (
    <AdminLayout title="Editores">
      <AdminPagination
        onAddItem={() => navigation("/admin/vehicles/add")}
        onRemoveItems={(row) => console.log(row)}
        addText="Añadir vehículo"
        textFieldSearch={{
          onChange: (e) => paginatorEditor.onFilter({ search: e.target.value }),
          value: search,
          placeholder: "Introduce nombre o correo eléctronico",
        }}
        tableProps={{
          onSelect: (rows) => console.log(rows),
          columns: adminColumns,
          paginationProps: {
            count: totalItems,
            page: currentPage,
            onPageChange: (e, page) => paginatorEditor.changePage(page),
            onRowsPerPageChange: (e) =>
              paginatorEditor.changeRows(parseInt(e.target.value)),
            rowsPerPage: itemsPerPage,
            rowsPerPageOptions: [10, 25],
          },
          ActionsProps: {
            onEdit: (row) => console.log(row),
          },
          rows:
            data.data?.length > 0
              ? data.data.map((value) => ({
                  index: `${value?.id}`,
                  name: value?.name,
                  family_name: value?.family_name,
                  email: value?.email,
                  // office: value?.office?.address,
                }))
              : [],
        }}
      />
    </AdminLayout>
  );
};
