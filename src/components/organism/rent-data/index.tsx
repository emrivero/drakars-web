import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { CustomTypography } from "../../molecules/custom-typography";
import { PrimaryTypography } from "../../molecules/primary-typography";
import { SecondaryTypography } from "../../molecules/secondary-typography";

export const RentData: FC = () => {
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
          Datos de tu reserva
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        {/* <CarData
          showCategory={false}
          title={"Fiat 500"}
          type={"manual"}
          category={"small"}
          fuel={"petrol"}
          seats={0}
          doors={0}
          imageSrc={
            "https://www.centauro.net/_next/image/?url=https%3A%2F%2Fcdn.centauro.net%2Fweb%2FA_400738ceb4.jpg&w=384&q=90"
          }
          height={""}
          actionText={"Cambiar"}
          onAction={() => null}
        /> */}
        <Paper sx={{ mt: 1, px: 1, py: 4 }}>
          <Box
            display={"flex"}
            flexDirection="column"
            justifyContent={"space-between"}
            mb={2}
          >
            <SecondaryTypography fontWeight={700} sx={{ color: "#a0a0a0" }}>
              Recogida:
            </SecondaryTypography>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box display={"flex"} alignItems={"center"}>
                <ArrowBack sx={{ mr: 1 }} color="secondary" />
                <PrimaryTypography variant="h6">
                  Aeropuerto Sevilla
                </PrimaryTypography>
              </Box>
              <CustomTypography type="open" fontWeight={"600"}>
                06/10/2022 20:30
              </CustomTypography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection="column"
            justifyContent={"space-between"}
          >
            <SecondaryTypography fontWeight={700} sx={{ color: "#a0a0a0" }}>
              Entrega:
            </SecondaryTypography>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box display={"flex"} alignItems={"center"}>
                <ArrowForward sx={{ mr: 1 }} color="secondary" />
                <PrimaryTypography variant="h6">
                  Aeropuerto Sevilla
                </PrimaryTypography>
              </Box>
              <CustomTypography type="open" fontWeight={"600"}>
                06/10/2022 20:30
              </CustomTypography>
            </Box>
          </Box>
          <Box width="100%" sx={{ mt: 2 }}>
            <Button fullWidth color="primary" variant="contained">
              Cambiar
            </Button>
          </Box>
        </Paper>
        <Box
          sx={{ width: "100%", px: 2, py: 2 }}
          display="flex"
          justifyContent={"space-between"}
        >
          <Typography variant="h5">Total</Typography>
          <Typography variant="h5">234.67 €</Typography>
        </Box>
      </Box>
    </Box>
  );
};
