import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../../i18n/useTranslate";
import { Routes } from "../../../routes/routes";
import { useStore } from "../../../store";
import { CustomTypography } from "../../molecules/custom-typography";
import { PrimaryTypography } from "../../molecules/primary-typography";
import { SecondaryTypography } from "../../molecules/secondary-typography";
import { CarData } from "../rent-car-data";

export const RentData: FC = () => {
  const {
    selectedOffice: {
      endDate,
      startDate,
      startHour,
      endHour,
      searchOriginOffice,
      searchDestinyOffice,
    },
    selectedVehicle,
    totalPrice,
  } = useStore((state) => state.rentData);
  const navigate = useNavigate();
  const { t } = useTranslate();

  useEffect(() => {
    if (!selectedVehicle) {
      navigate(Routes.LOCATION_DATE_PAGE);
    }
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={"center"}
      py={1}
      px={2}
      sx={{ backgroundColor: "#fafafa" }}
    >
      <Box py={2}>
        <Typography fontWeight={700} variant="h5">
          {t("Dataof")}
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <CarData
          data={selectedVehicle}
          imageSrc={`${process.env.REACT_APP_API_URL}${selectedVehicle?.image?.url}`}
          actionText={t("change")}
          onAction={() => null}
        />
        <Paper sx={{ mt: 1, px: 1, py: 4 }}>
          <Box
            display={"flex"}
            flexDirection="column"
            justifyContent={"space-between"}
            mb={2}
          >
            <SecondaryTypography fontWeight={700} sx={{ color: "#a0a0a0" }}>
              {t("pickup")}
            </SecondaryTypography>
            <Box
              display={"flex"}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <Box display={"flex"} alignItems={"center"} width="50%">
                <ArrowBack sx={{ mr: 1 }} color="secondary" />
                <PrimaryTypography variant="h6">
                  {searchOriginOffice}
                </PrimaryTypography>
              </Box>
              <Box>
                <Box>
                  <CustomTypography type="open" fontWeight={"600"}>
                    {startDate}
                  </CustomTypography>
                </Box>
                <Box>
                  <CustomTypography type="open" fontWeight={"600"}>
                    {startHour}
                  </CustomTypography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection="column"
            justifyContent={"space-between"}
          >
            <SecondaryTypography fontWeight={700} sx={{ color: "#a0a0a0" }}>
              {t("delivery")}
            </SecondaryTypography>
            <Box
              display={"flex"}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <Box display={"flex"} alignItems={"center"} width="50%">
                <ArrowForward sx={{ mr: 1 }} color="secondary" />
                <PrimaryTypography variant="h6">
                  {searchDestinyOffice || searchOriginOffice}
                </PrimaryTypography>
              </Box>
              <Box>
                <Box>
                  <CustomTypography type="open" fontWeight={"600"}>
                    {endDate}
                  </CustomTypography>
                </Box>
                <Box>
                  <CustomTypography type="open" fontWeight={"600"}>
                    {endHour}
                  </CustomTypography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box width="100%" sx={{ mt: 2 }}>
            <Button fullWidth color="primary" variant="contained">
              {t("change")}
            </Button>
          </Box>
        </Paper>
        <Box
          sx={{ width: "100%", px: 2, py: 2 }}
          display="flex"
          justifyContent={"space-between"}
        >
          <Typography variant="h5">Total</Typography>
          <Typography variant="h5">{totalPrice} €</Typography>
        </Box>
      </Box>
    </Box>
  );
};
