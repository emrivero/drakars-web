import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  FormLabel,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
import { FC, useEffect, useState } from "react";
import { Capitalize } from "../../../../components/atoms/transforms/capitalize";
import { ErrorTypography } from "../../../../components/molecules/error-typography";
import { PrimaryTypography } from "../../../../components/molecules/primary-typography";
import { SearchInput } from "../../../../components/molecules/search";
import { RegisterEditor } from "../../../../components/organism/register-admin/register-editor";
import { TableGridRow } from "../../../../components/organism/table-grid";
import { AdminLayout } from "../../../../components/templates/admin/layout";
import { AdminPagination } from "../../../../components/templates/admin/pagination";
import { useRentCarService } from "../../../../service/rent-car/application";
import { useAdminServices } from "../../../../service/user/admin/application";
import { adminColumns } from "../../../../service/user/admin/application/model/AdminGridColumn";
import { AdminClient } from "../../../../service/user/admin/client";
import { useStore } from "../../../../store";

interface ChangeOfficeProps {
  row: TableGridRow;
  open: boolean;
  cancel: () => void;
}

const ChangeOffice: FC<ChangeOfficeProps> = ({ row, cancel, open }) => {
  const { paginatorEditor } = useAdminServices();
  const [error, setError] = useState(false);
  const [offices, setOffices] = useState([]);
  const [selectedOffice, setSelected] = useState<{
    value: number;
    label: string;
  }>({ value: null, label: "" });
  const { enqueueSnackbar } = useSnackbar();
  const { creator } = useAdminServices();
  const adminClient = new AdminClient();
  const {
    mappers: { SelectedOfficeOption },
  } = useRentCarService();

  const onChangeOffice = async () => {
    if (!selectedOffice.value) {
      setError(true);
    } else {
      const response = await adminClient.changeOffice(
        row.index,
        selectedOffice.value
      );
      if (response.status < 300) {
        enqueueSnackbar("Cambio de oficina exitoso", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: { horizontal: "center", vertical: "top" },
        });
        cancel();
        paginatorEditor.paginate();
      } else {
        enqueueSnackbar("Error de servidor", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: { horizontal: "center", vertical: "top" },
        });
      }
    }
  };

  const onClose = () => {
    setError(false);
    setSelected({ value: null, label: "" });
    cancel();
  };

  useEffect(() => {
    //
  }, [open]);

  return (
    <Dialog open={open} sx={{ p: 4 }} onClose={onClose}>
      <DialogTitle>Cambio de oficina</DialogTitle>
      <DialogContent sx={{ minWidth: 560 }}>
        <Box>
          <Box sx={{ p: 1 }}>
            <FormLabel>
              <PrimaryTypography fontWeight={500}>
                Nueva oficina
              </PrimaryTypography>
            </FormLabel>
          </Box>
          <SearchInput
            AutocompleteProps={{
              noOptionsText: "Sin coincidencias",
              sx: { p: 1 },
              options: offices.map(SelectedOfficeOption),
              onInputChange: (_, value) => {
                creator.fetchOffice(value).then((value) => {
                  if (value?.data) {
                    setOffices(value?.data);
                  } else {
                    setOffices([]);
                  }
                });
                setSelected({ ...selectedOffice, label: value || "" });
              },

              onChange: (e, opt) =>
                opt &&
                setSelected({
                  value: opt?.value || null,
                  label: opt?.label,
                }),
              value: {
                value: selectedOffice?.value,
                label: selectedOffice?.label,
              },
            }}
            TextFieldProps={{ label: "Oficina", error: error }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={onChangeOffice}>
          Cambiar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ActionsMenu: FC<{ row: TableGridRow }> = ({ row }) => {
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(profileAnchor);
  const [openChangeOffice, setOpenChangeOffice] = useState(false);

  const handleMenuProfile = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleCloseMenuProfile = () => {
    setProfileAnchor(null);
  };

  const onOpenChangeOffice = async () => {
    setOpenChangeOffice(true);
    handleCloseMenuProfile();
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
          <Button onClick={() => onOpenChangeOffice()}>
            <Capitalize>mover de oficina</Capitalize>
          </Button>
        </MenuItem>
        <MenuItem onClick={() => onRemove(row.index)}>
          <Button color="error">
            <Capitalize>Dar de baja</Capitalize>
          </Button>
        </MenuItem>
      </Menu>
      <ChangeOffice
        row={row}
        open={openChangeOffice}
        cancel={() => setOpenChangeOffice(false)}
      />
    </>
  );
};

export const EditorUsers: FC = () => {
  const theme = useTheme();
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
          onChange: (e) =>
            paginatorEditor.onFilter({
              search: e.target.value,
              currentPage: 0,
            }),
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
                  office: (
                    <Typography
                      fontStyle={value.office.deleted ? "italic" : "normal"}
                      sx={{
                        color: value.office.deleted
                          ? theme.palette.error.main
                          : "#000",
                      }}
                    >
                      {`${value?.office?.name}, ${value?.office?.municipality?.name}, ${value?.office?.municipality?.city?.name}`}
                      {value.office.deleted && ` (oficina eliminada)`}
                    </Typography>
                  ),
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
