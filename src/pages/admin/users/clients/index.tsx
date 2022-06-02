import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, Fade, Menu, MenuItem } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
import { FC, useEffect, useState } from "react";
import { Capitalize } from "../../../../components/atoms/transforms/capitalize";
import { ErrorTypography } from "../../../../components/molecules/error-typography";
import { TableGridRow } from "../../../../components/organism/table-grid";
import { AdminLayout } from "../../../../components/templates/admin/layout";
import { AdminPagination } from "../../../../components/templates/admin/pagination";
import { useAdminServices } from "../../../../service/user/admin/application";
import { clientColumns } from "../../../../service/user/admin/application/model/ClientGridColumn";
import { AdminClient } from "../../../../service/user/admin/client";
import { useStore } from "../../../../store";

const ActionsMenu: FC<{ row: TableGridRow }> = ({ row }) => {
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(profileAnchor);
  const client = new AdminClient();
  const { enqueueSnackbar } = useSnackbar();

  const handleMenuProfile = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleCloseMenuProfile = () => {
    setProfileAnchor(null);
  };
  const { paginatorClient } = useAdminServices();

  const confirm = useConfirm();

  const onRemove = (id: string, email: string) => {
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
      confirmationText: "Confirmar bajar",
      cancellationText: "Cancelar",
      description: (
        <>
          <ErrorTypography variant="h6" align="center">
            Va a borrar todo los datos del cliente permanentemente. ¿Está
            seguro?
          </ErrorTypography>
        </>
      ),
    })
      .then(async () => {
        const response = await client.removeClient(id, email);
        if (response.status >= 400) {
          enqueueSnackbar(
            "El usuario tiene un alquiler en curso. No se puede eliminar",
            {
              variant: "error",
              autoHideDuration: 4000,
              anchorOrigin: { horizontal: "center", vertical: "top" },
            }
          );
        } else {
          enqueueSnackbar("Usuario eliminado", {
            variant: "success",
            autoHideDuration: 4000,
            anchorOrigin: { horizontal: "center", vertical: "top" },
          });
          paginatorClient.paginate();
        }
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
        <MenuItem>
          <Button>
            <Capitalize>Ver cliente</Capitalize>
          </Button>
        </MenuItem>
        <MenuItem onClick={() => onRemove(row.index, row.email)}>
          <Button color="error">
            <Capitalize>Borrar datos</Capitalize>
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

export const ClientUsers: FC = () => {
  const {
    paginatedClients: {
      data,
      paginationOptions: { search, totalItems, currentPage, itemsPerPage },
    },
  } = useStore();
  const { paginatorClient } = useAdminServices();

  useEffect(() => {
    paginatorClient.paginate();
  }, [currentPage, itemsPerPage, search]);

  return (
    <AdminLayout title="Clientes">
      <AdminPagination
        textFieldSearch={{
          onChange: (e) =>
            paginatorClient.onFilter({
              search: e.target.value,
              currentPage: 0,
            }),
          value: search,
          placeholder: "Introduce nombre o correo eléctronico",
        }}
        tableProps={{
          selectable: false,
          columns: clientColumns,
          paginationProps: {
            count: totalItems,
            page: currentPage,
            onPageChange: (e, page) => paginatorClient.changePage(page),
            onRowsPerPageChange: (e) =>
              paginatorClient.changeRows(parseInt(e.target.value)),
            rowsPerPage: itemsPerPage,
            rowsPerPageOptions: [10, 25],
          },
          ActionsComponent: ActionsMenu,
          rows: data?.data?.map((value) => ({
            index: `${value?.id}`,
            name: value?.name,
            family_name: value?.family_name,
            email: value?.email,
            dni: value?.dni,
            phone: value?.phone,
          })),
        }}
      />
    </AdminLayout>
  );
};
