import { Grid, ListItem, Rating, Typography, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { DestinyDateTimeMapper } from "../../../service/rent-car/application/mappers/DestinyDateTime";
import { DestinyName } from "../../../service/rent-car/application/mappers/DestinyName";
import { OriginDateTimeMapper } from "../../../service/rent-car/application/mappers/OriginDateTime";
import { OriginNameMapper } from "../../../service/rent-car/application/mappers/OriginName";
import { RentDataConfirmVm } from "../../../service/rent-car/client/vm/RentDataConfirmVm";
import { PrimaryTypography } from "../../molecules/primary-typography";
import { ResumeCarData } from "../resume-car-data";

interface HistoryItemProps {
  data?: RentDataConfirmVm;
  active?: boolean;
}

export const HistoryItem: FC<HistoryItemProps> = ({ data, active = false }) => {
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
              <Typography
                sx={{
                  textDecoration: "underline",
                  color: active ? theme.palette.success.main : "#000",
                }}
                variant="h4"
              >
                Datos de la reserva
              </Typography>
            </Grid>
            <Grid item sm={6}>
              <PrimaryTypography fontWeight={600}>Origen</PrimaryTypography>
              <Typography variant="h5">{OriginNameMapper(data)}</Typography>
            </Grid>
            <Grid item sm={6}>
              <PrimaryTypography fontWeight={600}>Destino</PrimaryTypography>
              <Typography variant="h5">{DestinyName(data)}</Typography>
            </Grid>
            <Grid item sm={6}>
              <PrimaryTypography fontWeight={600}>Fechas</PrimaryTypography>
              <Typography variant="h6">
                De {OriginDateTimeMapper(data)} al {DestinyDateTimeMapper(data)}
              </Typography>
            </Grid>
            <Grid item sm={6}>
              <PrimaryTypography fontWeight={600}>Precio</PrimaryTypography>

              <Typography variant="h6">Precio: {data.total}€</Typography>
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
              {!active && (
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
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
};
