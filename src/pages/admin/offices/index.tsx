import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, Fade, Menu, MenuItem } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Capitalize } from "../../../components/atoms/transforms/capitalize";
import { BlackLink } from "../../../components/molecules/black-link";
import { TableGridRow } from "../../../components/organism/table-grid";
import { AdminLayout } from "../../../components/templates/admin/layout";
import { AdminPagination } from "../../../components/templates/admin/pagination";
import { useOfficeService } from "../../../service/office/application";
import { officeColumns } from "../../../service/office/application/model/OfficeGridColum";
import { useStore } from "../../../store";

const ActionsMenu: FC<{ row: TableGridRow }> = ({ row }) => {
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(profileAnchor);

  const handleMenuProfile = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleCloseMenuProfile = () => {
    setProfileAnchor(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        endIcon={
          <>
            <KeyboardArrowDown />
          </>
        }
        color="primary"
        onClick={handleMenuProfile}
        size="small"
      >
        Acciones
      </Button>
      <Menu
        open={open}
        anchorEl={profileAnchor}
        onClose={handleCloseMenuProfile}
        TransitionComponent={Fade}
      >
        <MenuItem>
          <BlackLink to="/home/profile">
            <Button>
              <Capitalize>{row.index}</Capitalize>
            </Button>
          </BlackLink>
        </MenuItem>
        <MenuItem>
          <Button>
            <Capitalize>desconectar</Capitalize>
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

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
        removeText="Eliminar seleccionados"
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
          ActionsComponent: ActionsMenu,
          rows: data.data.map(OfficeGridRowMapper),
        }}
      />
    </AdminLayout>
  );
};
