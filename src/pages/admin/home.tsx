import { Box, Button, TextField, Typography } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import { useAuth } from "../../auth/use-auth";
import { ErrorTypography } from "../../components/molecules/error-typography";
import { PrimaryTypography } from "../../components/molecules/primary-typography";
import { ManageRent } from "../../components/organism/manage-rent";
import { RegisterAdmin } from "../../components/organism/register-admin";
import { RegisterEditor } from "../../components/organism/register-admin/register-editor";
import { AdminLayout } from "../../components/templates/admin/layout";
import { useAdminServices } from "../../service/user/admin/application";
import { AdminClient } from "../../service/user/admin/client";
import { useStore } from "../../store";

const AdminHome = () => {
  // const theme = useTheme();
  const adminClient = new AdminClient();
  const { userInfo } = useAuth();
  const [openRegisterAdmin, setOpenRegisterAdmin] = useState(false);
  const [openRegisterEditor, setOpenRegisterEditor] = useState(false);
  const [openManageRent, setOpenManageRent] = useState(false);
  const confirm = useConfirm();
  const { creator, manageRent } = useAdminServices();
  const [error, setError] = useState({
    msg: "",
    isError: false,
  });
  const { rentRefValue } = useStore();

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

  const onCancelManageRent = () => {
    setOpenManageRent(false);
  };

  const onSaveManageRent = async () => {
    // setOpenManageRent(true);
  };

  const onGetRent = async () => {
    await adminClient.refreshRents();
    const { status } = await manageRent.getManageRent();
    setError({ isError: false, msg: "" });
    if (status === 409) {
      setError({
        isError: true,
        msg: "La reserva no pertenece a esta oficina",
      });
    }
    if (status === 404) {
      setError({
        isError: true,
        msg: "No se ha encontrado reserva",
      });
    }
    if (status < 300) {
      setOpenManageRent(true);
    }
  };

  return (
    <AdminLayout title={`Hola, ${userInfo.given_name}`}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box sx={{ mb: 3, width: "60%" }}>
          <Typography variant="h4" textAlign={"center"}>
            Gestión de reserva
          </Typography>
        </Box>
        <Box sx={{ mb: 3, width: "60%" }}>
          <TextField
            fullWidth
            onChange={(e) => manageRent.changeRentValue(e.target.value)}
            error={error.isError}
            placeholder="Busque reserva por email o número de referencia"
            label="Buscar Reserva"
            value={rentRefValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onGetRent();
              }
            }}
          />
          {error.isError && <ErrorTypography>{error.msg}</ErrorTypography>}
        </Box>
        <Box sx={{ mb: 3, width: "10%" }}>
          <Button fullWidth variant="contained" onClick={() => onGetRent()}>
            Buscar
          </Button>
        </Box>
      </Box>
      <RegisterAdmin
        open={openRegisterAdmin}
        handleCancel={onCancelRegisterAdmin}
        handleSave={onSaveRegisterAdmin}
      />
      <RegisterEditor
        open={openRegisterEditor}
        handleCancel={onCancelRegisterEditor}
        handleSave={onSaveRegisterEditor}
      />
      <ManageRent
        open={openManageRent}
        handleCancel={onCancelManageRent}
        handleSave={onSaveManageRent}
      />
    </AdminLayout>
  );
};

export default AdminHome;
