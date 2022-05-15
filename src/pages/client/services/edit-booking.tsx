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
import { useRentCarService } from "../../../service/rent-car/application";
import { useStore } from "../../../store";

export const EditBooking: FC = () => {
  const [dialogState, setDialogState] = useState({ open: false });
  const {
    reference,
    total,
    rentedVehicle,
    startDate,
    endDate,
    originOffice,
    destinyOffice,
    renterUser,
  } = useStore((state) => state.rentConfirmData);

  const { clearer, cancelRent } = useRentCarService();
  const navigate = useNavigate();
  const theme = useTheme();

  const confirm = useConfirm();

  useEffect(() => {
    if (!reference) {
      navigate(-1);
    }
    return () => clearer.clear();
  }, []);

  if (!reference) {
    return <LoadingPage />;
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
      await cancelRent(renterUser.dni, reference);
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
            navigate("/");
          }, 300);
        })
        .catch(() => {
          setTimeout(() => {
            navigate("/");
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
              <Typography variant="h6">{total} €</Typography>
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
            <Grid
              item
              xs={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRight="2px solid #aaa"
            >
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Nombre
                </CustomTypography>
                <Typography fontWeight={600}>{renterUser.name}</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRight="2px solid #aaa"
            >
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Apellidos
                </CustomTypography>
                <Typography fontWeight={600}>
                  {renterUser.family_name}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRight="2px solid #aaa"
            >
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  DNI/NIE
                </CustomTypography>
                <Typography fontWeight={600}>{renterUser.dni}</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              alignItems="center"
              borderRight="2px solid #aaa"
              justifyContent="center"
            >
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Correo Electrónico:
                </CustomTypography>
                <Typography fontWeight={600}>{renterUser.email}</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Teléfono móvil:
                </CustomTypography>
                <Typography fontWeight={600}>{renterUser.phone}</Typography>
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
            <Grid
              item
              xs={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRight="2px solid #aaa"
            >
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Referencia
                </CustomTypography>
                <Typography fontWeight={600}>{reference}</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRight="2px solid #aaa"
            >
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Fechas
                </CustomTypography>
                <Typography fontWeight={600}>
                  {startDate} / {endDate}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRight="2px solid #aaa"
            >
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Recogida:
                </CustomTypography>
                <Typography fontWeight={600}>{originOffice?.name}</Typography>
                <Typography fontWeight={600}>
                  {originOffice?.address}
                </Typography>
                <Typography fontWeight={600}>
                  {originOffice?.municipality?.name},
                  {originOffice?.municipality?.city?.name}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              alignItems="center"
              borderRight="2px solid #aaa"
              justifyContent="center"
            >
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Devolución:
                </CustomTypography>
                <Typography fontWeight={600}>{destinyOffice?.name}</Typography>
                <Typography fontWeight={600}>
                  {destinyOffice?.address}
                </Typography>
                <Typography fontWeight={600}>
                  {destinyOffice?.municipality?.name},
                  {destinyOffice?.municipality?.city?.name}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Vehículo:
                </CustomTypography>
                <Typography fontWeight={600}>
                  {rentedVehicle?.mark} {rentedVehicle?.model}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box width="100%" mt={10}>
          <Grid container rowSpacing={2}>
            <Grid
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
                >
                  Cambiar reserva
                </Button>
              </Box>
            </Grid>
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
