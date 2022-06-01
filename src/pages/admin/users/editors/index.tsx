import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, Fade, Menu, MenuItem, Typography } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { FC, useEffect, useState } from "react";
import { Capitalize } from "../../../../components/atoms/transforms/capitalize";
import { BlackLink } from "../../../../components/molecules/black-link";
import { ErrorTypography } from "../../../../components/molecules/error-typography";
import { PrimaryTypography } from "../../../../components/molecules/primary-typography";
import { RegisterEditor } from "../../../../components/organism/register-admin/register-editor";
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

  const client = new AdminClient();
  const { paginatorEditor } = useAdminServices();
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
            Va a borrar todo los datos del editor permanentemente. ¿Está seguro?
          </ErrorTypography>
        </>
      ),
    })
      .then(async () => {
        await client.delete(`${id}`);
        paginatorEditor.paginate();
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
          <BlackLink to="/home/profile">
            <Button>
              <Capitalize>hacer administrador</Capitalize>
            </Button>
          </BlackLink>
        </MenuItem>
        <MenuItem>
          <BlackLink to="/home/profile">
            <Button>
              <Capitalize>mover de oficina</Capitalize>
            </Button>
          </BlackLink>
        </MenuItem>
        <MenuItem onClick={() => onRemove(row.index)}>
          <Button color="error">
            <Capitalize>Dar de baja</Capitalize>
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

export const EditorUsers: FC = () => {
  const [openRegisterEditor, setOpenRegisterEditor] = useState(false);
  const confirm = useConfirm();
  const {
    paginatedEditors: {
      data,
      paginationOptions: { search, totalItems, currentPage, itemsPerPage },
    },
  } = useStore();
  const { paginatorEditor, creator } = useAdminServices();

  useEffect(() => {
    paginatorEditor.paginate();
  }, [currentPage, itemsPerPage, search]);

  useEffect(() => {
    paginatorEditor.paginate();
  }, []);
  const onCancelRegisterEditor = () => {
    setOpenRegisterEditor(false);
  };

  const onSaveRegisterEditor = async () => {
    const { data, status } = await creator.createEditor();
    if (status >= 400) {
      return;
    }
    setOpenRegisterEditor(false);
    const { email, password } = data;
    confirm({
      title: <Typography variant="h4">Editor creado</Typography>,
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
    <AdminLayout title="Editores">
      <AdminPagination
        onAddItem={() => setOpenRegisterEditor(true)}
        addText="Añadir editor"
        textFieldSearch={{
          onChange: (e) => paginatorEditor.onFilter({ search: e.target.value }),
          value: search,
          placeholder: "Introduce nombre o correo eléctronico",
        }}
        tableProps={{
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
          ActionsComponent: ActionsMenu,
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
      <RegisterEditor
        open={openRegisterEditor}
        handleCancel={onCancelRegisterEditor}
        handleSave={onSaveRegisterEditor}
      />
    </AdminLayout>
  );
};
