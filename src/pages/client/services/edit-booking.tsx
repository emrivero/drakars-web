import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upper } from "../../../components/atoms/transforms/upper";
import { CustomTypography } from "../../../components/molecules/custom-typography";
import { LoadingPage } from "../../../components/molecules/loading-page";
import { PrimaryTypography } from "../../../components/molecules/primary-typography";
import { EditManageModal } from "../../../components/organism/edit-booking-form";
import { Layout } from "../../../components/templates/client/layout";
import { CommonSection } from "../../../components/templates/client/layout/common-section";
import { Routes } from "../../../routes/routes";
import { useRentCarService } from "../../../service/rent-car/application";
import { useClientService } from "../../../service/user/client/application";
import { useStore } from "../../../store";

export const EditBooking: FC = () => {
  const [dialogState, setDialogState] = useState({ open: false });
  const { loggedClient, anonActiveRent } = useStore();

  const notDelete = loggedClient?.activeRent?.status !== "pending";

  const { clearer, cancelRent } = useRentCarService();
  const { getter } = useClientService();
  const navigate = useNavigate();
  const theme = useTheme();

  const confirm = useConfirm();

  useEffect(() => {
    if (loggedClient.info !== null) {
      getter.getRent().then((data) => {
        if (!data?.reference) {
          navigate(Routes.HOME_PAGE);
        }
      });
    } else if (!anonActiveRent.data) {
      navigate(Routes.HOME_PAGE);
    }
    return () => clearer.clear();
  }, [loggedClient]);

  const currentActiveRent =
    loggedClient?.info !== null
      ? loggedClient?.activeRent
      : anonActiveRent?.data;

  if (!currentActiveRent) {
    return (
      <Layout showFooter={false}>
        <LoadingPage />
      </Layout>
    );
  }

  const onRemove = () => {
    confirm({
      title: (
        <Typography variant="h5" color={"error"}>
          Atención
        </Typography>
      ),
      description: (
        <Typography variant="h6">
          ¿Está seguro de que quiere cancelar la reserva?
        </Typography>
      ),
      cancellationText: "Atrás",
      confirmationText: "Confirmar cancelación",
      confirmationButtonProps: {
        color: "error",
      },
      cancellationButtonProps: {
        variant: "contained",
        color: "primary",
      },
    }).then(async () => {
      await cancelRent(currentActiveRent?.reference);
      confirm({
        title: "",
        cancellationButtonProps: {
          sx: { display: "none" },
        },
        confirmationText: "Vale",
        description: (
          <>
            <PrimaryTypography variant="h5">
              Reserva cancelada
            </PrimaryTypography>
            <PrimaryTypography>¡Hasta la proxima!</PrimaryTypography>
          </>
        ),
      })
        .then(() => {
          setTimeout(() => {
            navigate(Routes.HOME_PAGE);
          }, 300);
        })
        .catch(() => {
          setTimeout(() => {
            navigate(Routes.HOME_PAGE);
          }, 300);
        });
    });
  };

  return (
    <Layout showFooter={false}>
      <CommonSection>
        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <CustomTypography
              type="open"
              align="center"
              color={theme.palette.primary.dark}
              variant="h3"
            >
              <Upper>Información de tu reserva</Upper>
            </CustomTypography>
          </Grid>
        </Grid>
        <Box width={"100%"}>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 6, display: "flex" }}>
              <PrimaryTypography variant="h6" sx={{ mr: 1 }}>
                <Upper>Importe Total: </Upper>
              </PrimaryTypography>
              <Typography variant="h6">{currentActiveRent?.total} €</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box width={"100%"}>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 6, mb: 6 }}>
              <PrimaryTypography variant="h6">
                <Upper>Datos de cliente</Upper>
              </PrimaryTypography>
            </Grid>
            <Grid item md={2} xs={6} display="flex" alignItems="center">
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Nombre
                </CustomTypography>
                <Typography fontWeight={600}>
                  {currentActiveRent?.renterUser?.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={2} xs={6} display="flex" alignItems="center">
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Apellidos
                </CustomTypography>
                <Typography fontWeight={600}>
                  {currentActiveRent?.renterUser?.family_name}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={2} xs={6} display="flex" alignItems="center">
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  DNI/NIE
                </CustomTypography>
                <Typography fontWeight={600}>
                  {currentActiveRent?.renterUser?.dni}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={2} xs={6} display="flex" alignItems="center">
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Correo Electrónico:
                </CustomTypography>
                <Typography fontWeight={600}>
                  {currentActiveRent?.renterUser?.email}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={2} xs={6} display="flex" alignItems="center">
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Teléfono móvil:
                </CustomTypography>
                <Typography fontWeight={600}>
                  {currentActiveRent?.renterUser?.phone}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box width={"100%"}>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 6, mb: 8 }}>
              <PrimaryTypography variant="h6">
                <Upper> Detalles de su reserva</Upper>
              </PrimaryTypography>
            </Grid>
            <Grid item md={4} xs={6} display="flex" alignItems="center">
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Referencia
                </CustomTypography>
                <Typography fontWeight={600}>
                  {currentActiveRent?.reference}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} xs={6} display="flex" alignItems="center">
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Fechas
                </CustomTypography>
                <Typography fontWeight={600}>
                  {currentActiveRent?.startDate} / {currentActiveRent?.endDate}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} xs={6} display="flex" alignItems="center">
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Recogida:
                </CustomTypography>
                <Typography fontWeight={600}>
                  {currentActiveRent?.originOffice?.name}
                </Typography>
                <Typography fontWeight={600}>
                  {currentActiveRent?.originOffice?.address}
                </Typography>
                <Typography fontWeight={600}>
                  {currentActiveRent?.originOffice?.municipality?.name},
                  {currentActiveRent?.originOffice?.municipality?.city?.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} xs={6} display="flex" alignItems="center">
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Devolución:
                </CustomTypography>
                <Typography fontWeight={600}>
                  {currentActiveRent?.destinyOffice?.name}
                </Typography>
                <Typography fontWeight={600}>
                  {currentActiveRent?.destinyOffice?.address}
                </Typography>
                <Typography fontWeight={600}>
                  {currentActiveRent?.destinyOffice?.municipality?.name},
                  {currentActiveRent?.destinyOffice?.municipality?.city?.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} xs={6} display="flex" alignItems="center">
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Vehículo:
                </CustomTypography>
                <Typography fontWeight={600}>
                  {currentActiveRent?.rentedVehicle?.mark}{" "}
                  {currentActiveRent?.rentedVehicle?.model}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box width="100%" mt={10}>
          <Grid container rowSpacing={2}>
            {/* <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: { md: 0.2, xs: 1 } }}>
                <Button
                  sx={{
                    py: 2,
                  }}
                  variant="contained"
                  fullWidth
                  onClick={() => setDialogState({ open: true })}
                  disabled={notDelete}
                >
                  Cambiar reserva
                </Button>
              </Box>
            </Grid> */}
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center", mb: { xs: 12 } }}
            >
              <Box sx={{ width: { md: 0.2, xs: 1 } }}>
                <Button
                  sx={{
                    py: 2,
                  }}
                  variant="outlined"
                  color="error"
                  fullWidth
                  onClick={onRemove}
                  disabled={notDelete}
                >
                  Cancelar reserva
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <EditManageModal
          open={dialogState.open}
          onClose={() => setDialogState({ open: false })}
        />
      </CommonSection>
    </Layout>
  );
};
