import { Grid, ListItem, Rating, Typography, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { PrimaryTypography } from "../../molecules/primary-typography";
import { ResumeCarData } from "../resume-car-data";

export const HistoryItem: FC = () => {
  const [value, setValue] = useState<number | null>(0);
  const theme = useTheme();
  return (
    <ListItem
      sx={{
        p: 4,
        mb: 1,
        border: `2px solid ${theme.palette.secondary.main}`,
        borderRadius: 5,
      }}
    >
      <Grid container>
        <Grid item sm={9}>
          <Grid container rowSpacing={3}>
            <Grid item sm={12} mb={2}>
              <Typography sx={{ textDecoration: "underline" }} variant="h4">
                Datos de la reserva
              </Typography>
            </Grid>
            <Grid item sm={6}>
              <PrimaryTypography fontWeight={600}>Origen</PrimaryTypography>
              <Typography variant="h5">
                Aeropuerto Madrid T4, Madrid, Madrid
              </Typography>
            </Grid>
            <Grid item sm={6}>
              <PrimaryTypography fontWeight={600}>Destino</PrimaryTypography>

              <Typography variant="h5">
                Aeropuerto wireless, Tomares, Sevilla
              </Typography>
            </Grid>
            <Grid item sm={6}>
              <PrimaryTypography fontWeight={600}>Fechas</PrimaryTypography>
              <Typography variant="h6">
                2022-05-26 10:00 / 2022-05-26 21:30
              </Typography>
            </Grid>
            <Grid item sm={6}>
              <PrimaryTypography fontWeight={600}>Precio</PrimaryTypography>

              <Typography variant="h6">Precio: 780€</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={3}>
          <Grid container>
            <Grid item sm={12}>
              <ResumeCarData
                data={{
                  title: "Audi A6",
                }}
                imageSrc="https://www.centauro.net/_next/image/?url=https%3A%2F%2Fcdn.centauro.net%2Fweb%2FA_400738ceb4.jpg&w=384&q=90"
                actionText={""}
              />
              <Grid
                item
                sm={12}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="h5">Puntúa el vehiculo</Typography>
                <Rating
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
};
