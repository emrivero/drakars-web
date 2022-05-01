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
        height: 600,
        width: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        backgroundAttachment: "fixed",
        backgroundImage: `url(${image})`,
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
      <Grid container>
        <Grid item md={7}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pb: { md: 0 },
              pr: { md: 0 },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: `'Acme', sans-serif`,
              }}
            >
              Alquiler de coches en toda España
            </Typography>
          </Box>
          <Box
            sx={{
              position: "relative",
              p: { xs: 1, md: 2 },
              pl: { md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography variant="h6">
              Cancelación hasta 24h antes de la recogida
            </Typography>
          </Box>
          <Box
            sx={{
              position: "relative",
              p: { xs: 1, md: 2 },
              pl: { md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography variant="h6">Los precios más bajos del país</Typography>
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Filter />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};