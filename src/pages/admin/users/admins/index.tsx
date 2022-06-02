import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, Fade, Menu, MenuItem, Typography } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { FC, useEffect, useState } from "react";
import { Capitalize } from "../../../../components/atoms/transforms/capitalize";
import { ErrorTypography } from "../../../../components/molecules/error-typography";
import { PrimaryTypography } from "../../../../components/molecules/primary-typography";
import { RegisterAdmin } from "../../../../components/organism/register-admin";
import { TableGridRow } from "../../../../components/organism/table-grid";
import { AdminLayout } from "../../../../components/templates/admin/layout";
import { AdminPagination } from "../../../../components/templates/admin/pagination";
import { useAdminServices } from "../../../../service/user/admin/application";
import { adminColumns } from "../../../../service/user/admin/application/model/AdminGridColumn";
import { AdminClient } from "../../../../service/user/admin/client";
import { useStore } from "../../../../store";

const ActionsMenu: FC<{ row: TableGridRow }> = ({ row }) => {
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(profileAnchor);

  const handleMenuProfile = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleCloseMenuProfile = () => {
    setProfileAnchor(null);
  };
  const { paginatorAdmin } = useAdminServices();
  const client = new AdminClient();

  const confirm = useConfirm();

  const onRemove = (id: string) => {
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
            Va a borrar todo los datos del administrador permanentemente. ¿Está
            seguro?
          </ErrorTypography>
        </>
      ),
    })
      .then(async () => {
        await client.delete(`${id}`);
        paginatorAdmin.paginate();
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
        <MenuItem onClick={() => onRemove(row.index)}>
          <Button color="error">
            <Capitalize>Dar de baja</Capitalize>
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

export const AdminUsers: FC = () => {
  const {
    paginatedAdmins: {
      data,
      paginationOptions: { search, totalItems, currentPage, itemsPerPage },
    },
  } = useStore();
  const { paginatorAdmin, creator } = useAdminServices();
  const [openRegisterAdmin, setOpenRegisterAdmin] = useState(false);
  const confirm = useConfirm();

  useEffect(() => {
    paginatorAdmin.paginate();
  }, [currentPage, itemsPerPage, search]);

  const onCancelRegisterAdmin = () => {
    setOpenRegisterAdmin(false);
  };

  const onSaveRegisterAdmin = async () => {
    const { data, status } = await creator.createAdmin();
    if (status >= 400) {
      return;
    }
    setOpenRegisterAdmin(false);
    const { email, password } = data;
    confirm({
      title: <Typography variant="h4">Administrador creado</Typography>,
      cancellationButtonProps: {
        sx: { display: "none" },
      },
      confirmationButtonProps: {
        variant: "contained",
      },
      confirmationText: "Entendido",
      description: (
        <>
          <PrimaryTypography variant="h5" sx={{ textDecoration: "underline" }}>
            Datos de acceso
          </PrimaryTypography>
          <Box>
            <Typography variant="h6" display="inline">
              {`Usuario: `}
            </Typography>
            <PrimaryTypography variant="h6" display="inline">
              {email}
            </PrimaryTypography>
          </Box>
          <Box>
            <Typography variant="h6" display="inline">
              {`Contraseña temporal: `}
            </Typography>
            <PrimaryTypography variant="h6" display="inline">
              {password}
            </PrimaryTypography>
          </Box>
        </>
      ),
    });
  };

  return (
    <AdminLayout title="Administradores">
      <AdminPagination
        onAddItem={() => setOpenRegisterAdmin(true)}
        addText="Añadir administrador"
        textFieldSearch={{
          onChange: (e) =>
            paginatorAdmin.onFilter({ search: e.target.value, currentPage: 0 }),
          value: search,
          placeholder: "Introduce nombre o correo eléctronico",
        }}
        tableProps={{
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
          ActionsComponent: ActionsMenu,
          rows: data.data.map((value) => ({
            index: `${value.id}`,
            name: value.name,
            family_name: value.family_name,
            email: value.email,
          })),
        }}
      />
      <RegisterAdmin
        open={openRegisterAdmin}
        handleCancel={onCancelRegisterAdmin}
        handleSave={onSaveRegisterAdmin}
      />
    </AdminLayout>
  );
};
