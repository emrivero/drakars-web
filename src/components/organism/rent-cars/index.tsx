import { CarRental } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { PrimaryIcon } from "../../molecules/primary-icon";
import { PrimarySpan } from "../../molecules/primary-span";
import { PrimaryTypography } from "../../molecules/primary-typography";
import { RentCarCard } from "./rent-car-card";

export const RentCars = () => {
  const CarRentalPrimary = PrimaryIcon(CarRental);
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container>
        <Grid item md={12}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CarRentalPrimary sx={{ fontSize: 48 }} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PrimaryTypography variant="h6">NUESTROS COCHES</PrimaryTypography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box sx={{ width: { md: "70%" } }}>
              <Typography align="center" variant="h6">
                Contamos con una flota de{" "}
                <PrimarySpan>+20.000 coches</PrimarySpan> repartidos por todo el
                territorio español. Elige la categoría que más se ajuste a tu
                necesidades.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          sx={{ py: 8, px: 2 }}
          md={3}
          display="flex"
          justifyContent="center"
        >
          <RentCarCard
            height="134px"
            imageSrc="/img/car-category/small.webp"
            textBody="Se trata de coches asequibles que están al alcance de todos los bolsillos."
            title="Pequeño"
          />
        </Grid>
        <Grid
          item
          sx={{ py: 8, px: 2 }}
          md={3}
          display="flex"
          justifyContent="center"
        >
          <RentCarCard
            height="134px"
            imageSrc="/img/car-category/medium.webp"
            textBody="Se trata de coches asequibles que están al alcance de todos los bolsillos."
            title="Mediano"
          />
        </Grid>
        <Grid
          item
          sx={{ py: 8, px: 2 }}
          md={3}
          display="flex"
          justifyContent="center"
        >
          <RentCarCard
            height="134px"
            imageSrc="/img/car-category/familiar.webp"
            textBody="Se trata de coches asequibles que están al alcance de todos los bolsillos."
            title="Familiar"
          />
        </Grid>
        <Grid
          item
          sx={{ py: 8, px: 2 }}
          md={3}
          display="flex"
          justifyContent="center"
        >
          <RentCarCard
            height="134px"
            imageSrc="/img/car-category/premium.webp"
            textBody="Se trata de coches asequibles que están al alcance de todos los bolsillos."
            title="Premium"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
