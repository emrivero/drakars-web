import { LocationOn } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslate } from "../../../i18n/useTranslate";
import { PrimaryIcon } from "../../molecules/primary-icon";
import { PrimarySpan } from "../../molecules/primary-span";
import { PrimaryTypography } from "../../molecules/primary-typography";
import { FavDestination } from "./fav-destination";

export const FavDestinations: FC = () => {
  const LocationPrimaryIcon = PrimaryIcon(LocationOn);
  const { t } = useTranslate();
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container>
        <Grid item md={12}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <LocationPrimaryIcon sx={{ fontSize: 48 }} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PrimaryTypography variant="h6">
              {" "}
              {t("bestdest")}{" "}
            </PrimaryTypography>
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
                {t("recommended")}
                <PrimarySpan>inmejorable.</PrimarySpan> {t("daretoenjoy")}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          sx={{ py: 8 }}
          xs={12}
          sm={6}
          md={3}
          display="flex"
          justifyContent="center"
        >
          <FavDestination location="Barcelona" price={42.65} />
        </Grid>
        <Grid
          item
          sx={{ py: 8 }}
          xs={12}
          sm={6}
          md={3}
          display="flex"
          justifyContent="center"
        >
          <FavDestination location="Sevilla" price={37.85} />
        </Grid>
        <Grid
          item
          sx={{ py: 8 }}
          xs={12}
          sm={6}
          md={3}
          display="flex"
          justifyContent="center"
        >
          <FavDestination location="Valencia" price={29.55} />
        </Grid>
        <Grid
          item
          sx={{ py: 8 }}
          xs={12}
          sm={6}
          md={3}
          display="flex"
          justifyContent="center"
        >
          <FavDestination location="Salamanca" price={19.95} />
        </Grid>
      </Grid>
    </Box>
  );
};
