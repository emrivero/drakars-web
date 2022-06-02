import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, Fade, Menu, MenuItem, Typography } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Capitalize } from "../../../components/atoms/transforms/capitalize";
import { ErrorTypography } from "../../../components/molecules/error-typography";
import { TableGridRow } from "../../../components/organism/table-grid";
import { AdminLayout } from "../../../components/templates/admin/layout";
import { AdminPagination } from "../../../components/templates/admin/pagination";
import { useOfficeService } from "../../../service/office/application";
import { officeColumns } from "../../../service/office/application/model/OfficeGridColum";
import { OfficeClient } from "../../../service/office/client";
import { useStore } from "../../../store";

const ActionsMenu: FC<{ row: TableGridRow }> = ({ row }) => {
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(profileAnchor);
  const { updater } = useOfficeService();
  const officeClient = new OfficeClient();
  const handleMenuProfile = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };
  const confirm = useConfirm();

  const handleCloseMenuProfile = () => {
    setProfileAnchor(null);
  };
  const { paginator } = useOfficeService();

  const navigate = useNavigate();

  const onEdit = async () => {
    await updater.fetch(row.index);
    navigate("/admin/offices/edit");
  };

  const onRemove = async () => {
    confirm({
      title: (
        <ErrorTypography variant="h5" align="center">
          ¡Atención!
        </ErrorTypography>
      ),
      confirmationButtonProps: {
        color: "error",
        variant: "contained",
      },
      confirmationText: "Borrar",
      cancellationText: "Cancelar",
      description: (
        <>
          <ErrorTypography variant="h6" align="center">
            Va a borrar esta oficina permanentemente ¿Está seguro?
          </ErrorTypography>
          <Typography fontStyle="italic">
            Recuerde que deberá mover los vehículos de esta oficina manualmente.
          </Typography>
          <Typography fontStyle="italic">
            Los trabajadores de esta sucursal también deben ser gestionados por
            un administrador.
          </Typography>
        </>
      ),
    })
      .then(async () => {
        await officeClient.delete(`${row.index}`);
        paginator.paginate();
      })
      .catch(() => null);
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
        <MenuItem onClick={onEdit}>
          <Button>
            <Capitalize>editar</Capitalize>
          </Button>
        </MenuItem>
        <MenuItem onClick={onRemove}>
          <Button color="error">
            <Capitalize>eliminar</Capitalize>
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
        addText="Añadir oficina"
        textFieldSearch={{
          onChange: (e) =>
            paginator.onFilter({ search: e.target.value, currentPage: 0 }),
          value: search,
          placeholder:
            "Introduce nombre, dirección o código postal de la oficina",
        }}
        tableProps={{
          onSelect: (rows) => rows,
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
          ActionsComponent: ActionsMenu,
          rows: data.data.map(OfficeGridRowMapper),
        }}
      />
    </AdminLayout>
  );
};
