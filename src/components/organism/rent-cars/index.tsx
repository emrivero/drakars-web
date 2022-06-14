import { CarRental } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { useTranslate } from "../../../i18n/useTranslate";
import { PrimaryIcon } from "../../molecules/primary-icon";
import { PrimarySpan } from "../../molecules/primary-span";
import { PrimaryTypography } from "../../molecules/primary-typography";
import { RentCarCard } from "./rent-car-card";

export const RentCars = () => {
  const CarRentalPrimary = PrimaryIcon(CarRental);
  const { t } = useTranslate();
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container>
        <Grid item md={12}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CarRentalPrimary sx={{ fontSize: 48 }} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PrimaryTypography variant="h6">{t("ourcars")}</PrimaryTypography>
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
                {t("fleet")} <PrimarySpan>{t("pluscars")}</PrimarySpan>{" "}
                {t("distributed")}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          sx={{ py: { sm: 4, md: 8 }, px: 2 }}
          sm={6}
          md={3}
          display="flex"
          justifyContent="center"
        >
          <RentCarCard
            height="134px"
            imageSrc={"/static/vehicles/fiat_punto.jpeg"}
            textBody={t("affordable")}
            title={t("small")}
          />
        </Grid>
        <Grid
          item
          sx={{ py: { sm: 4, md: 8 }, px: 2 }}
          sm={6}
          md={3}
          display="flex"
          justifyContent="center"
        >
          <RentCarCard
            height="134px"
            imageSrc="/static/vehicles/volkswagen_polo.jpeg"
            textBody={t("affordable")}
            title={t("medium")}
          />
        </Grid>
        <Grid
          item
          sx={{ py: { sm: 4, md: 8 }, px: 2 }}
          sm={6}
          md={3}
          display="flex"
          justifyContent="center"
        >
          <RentCarCard
            height="134px"
            imageSrc="/static/vehicles/fiat_doblo_panorama.jpeg"
            textBody={t("affordable")}
            title={t("large")}
          />
        </Grid>
        <Grid
          item
          sx={{ py: { sm: 4, md: 8 }, px: 2 }}
          sm={6}
          md={3}
          display="flex"
          justifyContent="center"
        >
          <RentCarCard
            height="134px"
            imageSrc="/static/vehicles/audi_a4.png"
            textBody={t("affordable")}
            title={t("premium")}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
