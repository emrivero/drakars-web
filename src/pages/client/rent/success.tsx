import { CheckCircle } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upper } from "../../../components/atoms/transforms/upper";
import { CustomTypography } from "../../../components/molecules/custom-typography";
import { LoadingPage } from "../../../components/molecules/loading-page";
import { PrimaryTypography } from "../../../components/molecules/primary-typography";
import { SecondaryTypography } from "../../../components/molecules/secondary-typography";
import { Layout } from "../../../components/templates/client/layout";
import { CommonSection } from "../../../components/templates/client/layout/common-section";
import { Routes } from "../../../routes/routes";

import { useRentCarService } from "../../../service/rent-car/application";
import { useStore } from "../../../store";

export const RentSuccess: FC = () => {
  const { clearer } = useRentCarService();
  const { selectedOffice, selectedVehicle, userData } = useStore(
    (state) => state.rentData
  );
  const {
    total,
    reference,
    rentedVehicle,
    startDate,
    endDate,
    originOffice,
    destinyOffice,
  } = useStore((state) => state.rentConfirmData);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !selectedOffice?.originOffice &&
      !selectedVehicle?.id &&
      !userData?.dni
    ) {
      navigate(Routes.LOCATION_DATE_PAGE);
    }
    return () => clearer.clear();
  });

  if (!selectedOffice?.originOffice && !selectedVehicle?.id && !userData?.dni) {
    return <LoadingPage />;
  }

  return (
    <Layout showFooter={false}>
      <CommonSection>
        <Grid container width={"100%"}>
          <Grid item xs={12} display="flex" justifyContent="center">
            <CheckCircle sx={{ fontSize: 84, mb: 1 }} color="success" />
          </Grid>
          <Grid item xs={12}>
            <SecondaryTypography variant="h2" align="center">
              ¡Reserva Confirmada!
            </SecondaryTypography>
          </Grid>
          <Grid item xs={12}>
            <CustomTypography
              variant="h4"
              align="center"
              customColor={(theme) => theme.palette.primary.main}
            >
              Su reserva se ha confirmado exitosamente.
            </CustomTypography>
            <Grid item xs={12}>
              <Typography align="center">
                <a
                  href={`${process.env.REACT_APP_API_URL}/api/rent-car/download/${reference}`}
                >
                  Descargar resguardo
                </a>
              </Typography>
            </Grid>
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
            <Grid item md={2} xs={6} display="flex" alignItems="center">
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Nombre
                </CustomTypography>
                <Typography fontWeight={600}>{userData.name}</Typography>
              </Box>
            </Grid>
            <Grid item md={2} xs={6} display="flex" alignItems="center">
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Apellidos
                </CustomTypography>
                <Typography fontWeight={600}>{userData.lastName}</Typography>
              </Box>
            </Grid>
            <Grid item md={2} xs={6} display="flex" alignItems="center">
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  DNI/NIE
                </CustomTypography>
                <Typography fontWeight={600}>{userData.dni}</Typography>
              </Box>
            </Grid>
            <Grid item md={2} xs={6} display="flex" alignItems="center">
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Correo Electrónico:
                </CustomTypography>
                <Typography fontWeight={600}>{userData.email}</Typography>
              </Box>
            </Grid>
            <Grid item md={2} xs={6} display="flex" alignItems="center">
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Teléfono móvil:
                </CustomTypography>
                <Typography fontWeight={600}>{userData.phone}</Typography>
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
                <Typography fontWeight={600}>{reference}</Typography>
              </Box>
            </Grid>
            <Grid item md={4} xs={6} display="flex" alignItems="center">
              <Box>
                <CustomTypography customColor={() => "#888"}>
                  Fechas
                </CustomTypography>
                <Typography fontWeight={600}>
                  {startDate} / {endDate}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} xs={6} display="flex" alignItems="center">
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
            <Grid item md={4} xs={6} display="flex" alignItems="center">
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
            <Grid item md={4} xs={6} display="flex" alignItems="center">
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
      </CommonSection>
    </Layout>
  );
};
