import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { FC, MouseEventHandler } from "react";
import { useTranslate } from "../../../i18n/useTranslate";
import { VehicleVm } from "../../../service/vehicle/client/view/VehicleVm";
import { CarDoorIcon } from "../../atoms/car-info-icons/car-door";
import { GasIcon } from "../../atoms/car-info-icons/gas";
import { MarchasIcon } from "../../atoms/car-info-icons/marchas";
import { UserIcon } from "../../atoms/car-info-icons/user";
import { Capitalize } from "../../atoms/transforms/capitalize";
import { PrimaryTypography } from "../../molecules/primary-typography";
import { SecondaryBox } from "../../molecules/secondary-box";

export interface CarDataProps {
  data: Omit<VehicleVm, "office">;
  imageSrc: string;
  actionText: string;
  onAction?: MouseEventHandler;
  showCategory?: boolean;
  width?: string;
}

export const CarData: FC<CarDataProps> = ({
  data,
  imageSrc,
  actionText,
  onAction = null,
  showCategory = true,
}) => {
  const { t } = useTranslate();
  return (
    <Card>
      <CardMedia component="img" image={imageSrc} height="256px" />
      <CardContent>
        <PrimaryTypography variant="h5">
          {data.title}
          {data.year}
        </PrimaryTypography>
        <PrimaryTypography variant="h6" hidden={!showCategory}>
          <Capitalize>{t(data.type)}</Capitalize>
        </PrimaryTypography>
        <PrimaryTypography variant="body1">{data.year}</PrimaryTypography>
        <Grid container sx={{ mt: 2 }} columnSpacing={0.25} rowSpacing={0.25}>
          <Grid item xs={3} sm={6}>
            <SecondaryBox
              sx={{
                px: 2,
                py: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <MarchasIcon sx={{ width: 16, mr: 1 }} />
              {data.transmission}
            </SecondaryBox>
          </Grid>
          <Grid item xs={3} sm={6}>
            <SecondaryBox
              sx={{
                px: 2,
                display: "flex",
                justifyContent: "center",
                py: 1,
              }}
            >
              <GasIcon sx={{ width: 16, mr: 1 }} />
              {data.fuel}
            </SecondaryBox>
          </Grid>
          <Grid item xs={3} sm={6}>
            <SecondaryBox
              sx={{
                px: 2,
                display: "flex",
                justifyContent: "center",
                py: 1,
              }}
            >
              <UserIcon sx={{ width: 16, mr: 1 }} />
              {data.seats}
            </SecondaryBox>
          </Grid>
          <Grid item xs={3} sm={6}>
            <SecondaryBox
              sx={{
                px: 2,
                display: "flex",
                justifyContent: "center",
                py: 1,
              }}
            >
              <CarDoorIcon sx={{ width: 16, mr: 1 }} />
              {data.doors}
            </SecondaryBox>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                px: 2,
                display: "flex",
                justifyContent: "center",
                py: 1,
              }}
            >
              <Typography fontWeight={600}>{data.pricePerDay} €/Día</Typography>
            </Box>
          </Grid>
          {onAction && (
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Button fullWidth variant="contained" onClick={onAction}>
                {actionText}
              </Button>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};
