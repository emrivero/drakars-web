import { Box, Grid, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { Filter } from "./filter";

export interface RentFilterProps {
  image: string;
}

export const RentFilter: FC<RentFilterProps> = ({ image }) => {
  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        mt: 4,
        minHeight: 600,
        width: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        backgroundAttachment: "fixed",
        backgroundImage: { md: `url(${image})` },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          background:
            "radial-gradient(ellipse at center,rgba(0,0,0,0) 0,rgba(0,0,0,.8) 100%)",
          top: 0,
          left: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />
      <Grid
        container
        rowSpacing={4}
        sx={{
          p: 2,
        }}
      >
        <Grid item md={8} justifyContent="center" display={"flex"}>
          <Box
            sx={{
              position: "relative",
              mt: { sm: 0, md: 2 },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: `'Acme', sans-serif`,
              }}
            >
              Alquiler de coches en toda España
            </Typography>
            <Typography variant="h6" alignContent={"baseline"}>
              Cancelación hasta 24h antes de la recogida
            </Typography>
            <Typography variant="h6">Los precios más bajos del país</Typography>
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box
            sx={{
              position: "relative",
              mt: { xs: 0, md: 2 },
            }}
          >
            <Filter />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
