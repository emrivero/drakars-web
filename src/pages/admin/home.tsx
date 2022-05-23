import { AdminPanelSettings } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import { useAuth } from "../../auth/use-auth";
import { BlackLink } from "../../components/molecules/black-link";
import { PrimaryTypography } from "../../components/molecules/primary-typography";
import { ManageRent } from "../../components/organism/manage-rent";
import { RegisterAdmin } from "../../components/organism/register-admin";
import { RegisterEditor } from "../../components/organism/register-admin/register-editor";
import { NumberStatistic } from "../../components/organism/statistics/number-statistic";
import { AdminLayout } from "../../components/templates/admin/layout";
import { useAdminServices } from "../../service/user/admin/application";

const AdminHome = () => {
  const theme = useTheme();
  const { userInfo } = useAuth();
  const [openRegisterAdmin, setOpenRegisterAdmin] = useState(false);
  const [openRegisterEditor, setOpenRegisterEditor] = useState(false);
  const [openManageRent, setOpenManageRent] = useState(false);
  const confirm = useConfirm();
  const { creator } = useAdminServices();

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
    setOpenManageRent(false);
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
    setOpenManageRent(true);
  };

  return (
    <AdminLayout title={`Bienvenido, ${userInfo.given_name}`}>
      <Grid container rowSpacing={4} display="flex" justifyContent="center">
        <Grid item md={8} xs={12}>
          <Grid container rowSpacing={4}>
            <Grid item sm={12} display="flex" justifyContent="center">
              <Typography variant="h4" align="center">
                Mes pasado
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} display="flex" justifyContent="center">
              <NumberStatistic title="Alquileres" value={30543} />
            </Grid>
            <Grid item xs={12} md={4} display="flex" justifyContent="center">
              <NumberStatistic title="Ganancias" value={30343677} />
            </Grid>
            <Grid item xs={12} md={4} display="flex" justifyContent="center">
              <NumberStatistic title="Ganancias" value={30343677} />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Typography variant="h4" align="center">
                Total del año
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} display="flex" justifyContent="center">
              <NumberStatistic title="Alquileres" value={30343677} />
            </Grid>
            <Grid item xs={12} md={4} display="flex" justifyContent="center">
              <NumberStatistic title="Ganancias" value={30343677} />
            </Grid>
            <Grid item xs={12} md={4} display="flex" justifyContent="center">
              <NumberStatistic title="Ganancias" value={30343677} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} xs={8}>
          <Paper sx={{ p: 4, backgroundColor: theme.palette.primary.dark }}>
            <Grid container rowSpacing={4}>
              <Grid item sm={12}>
                <Typography
                  variant="h4"
                  fontStyle={"italic"}
                  color="#fff"
                  align="center"
                >
                  Acciones frecuentes
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Button
                  onClick={() => setOpenManageRent(true)}
                  color="info"
                  fullWidth
                  sx={{ py: 2, backgroundColor: "#fff" }}
                  size="large"
                >
                  <Typography variant="button">Crear reserva</Typography>
                </Button>
              </Grid>
              <Grid item sm={12}>
                <Button
                  onClick={() => setOpenManageRent(true)}
                  color="info"
                  fullWidth
                  sx={{ py: 2, backgroundColor: "#fff" }}
                  size="large"
                >
                  <Typography variant="button">Gestionar reserva</Typography>
                </Button>
              </Grid>
              <Grid item sm={12}>
                <Button
                  color="info"
                  fullWidth
                  sx={{ py: 2, backgroundColor: "#fff" }}
                  startIcon={<AdminPanelSettings />}
                  size="large"
                  onClick={() => setOpenRegisterAdmin(true)}
                >
                  <Typography variant="button">Añadir administrador</Typography>
                </Button>
              </Grid>
              <Grid item sm={12}>
                <Button
                  color="info"
                  fullWidth
                  sx={{ py: 2, backgroundColor: "#fff" }}
                  startIcon={<AdminPanelSettings />}
                  size="large"
                  onClick={() => setOpenRegisterEditor(true)}
                >
                  <Typography variant="button">Añadir editor</Typography>
                </Button>
              </Grid>
              <Grid item sm={12}>
                <Button
                  component={BlackLink}
                  to="/admin/offices/add"
                  color="info"
                  fullWidth
                  sx={{ py: 2, backgroundColor: "#fff" }}
                  startIcon={<AdminPanelSettings />}
                  size="large"
                >
                  <Typography variant="button">Añadir oficina</Typography>
                </Button>
              </Grid>
              <Grid item sm={12}>
                <Button
                  component={BlackLink}
                  to="/admin/vehicles/add"
                  color="info"
                  fullWidth
                  sx={{ py: 2, backgroundColor: "#fff" }}
                  startIcon={<AdminPanelSettings />}
                  size="large"
                >
                  <Typography variant="button">Alta de vehículo</Typography>
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
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
