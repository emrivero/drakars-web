import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "../../../components/templates/admin/layout";
import { AdminPagination } from "../../../components/templates/admin/pagination";
import { useOfficeService } from "../../../service/office/application";
import { officeColumns } from "../../../service/office/application/model/OfficeGridColum";
import { useStore } from "../../../store";

export const ListOffices: FC = () => {
  const {
    paginator,
    mappers: { OfficeGridRowMapper },
  } = useOfficeService();

  const {
    paginatedOffices: {
      paginationOptions: { currentPage, itemsPerPage, totalItems, search },
      data,
    },
  } = useStore();

  const navigation = useNavigate();

  useEffect(() => {
    paginator.paginate();
  }, [currentPage, itemsPerPage, search]);

  return (
    <AdminLayout title="Oficinas">
      <AdminPagination
        onAddItem={() => navigation("/admin/offices/add")}
        onRemoveItems={(row) => console.log(row)}
        addText="Añadir oficina"
        textFieldSearch={{
          onChange: (e) => paginator.onFilter({ search: e.target.value }),
          value: search,
          placeholder:
            "Introduce nombre, dirección o código postal de la oficina",
        }}
        tableProps={{
          onSelect: (rows) => console.log(rows),
          columns: officeColumns,
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
          rows: data.data.map(OfficeGridRowMapper),
        }}
      />
    </AdminLayout>
  );
};
