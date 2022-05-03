import { Button, Card, CardContent, CardMedia, Grid } from "@mui/material";
import { FC, MouseEventHandler } from "react";
import { useTranslate } from "../../../i18n/useTranslate";
import { CarDoorIcon } from "../../atoms/car-info-icons/car-door";
import { GasIcon } from "../../atoms/car-info-icons/gas";
import { MarchasIcon } from "../../atoms/car-info-icons/marchas";
import { UserIcon } from "../../atoms/car-info-icons/user";
import { PrimaryTypography } from "../../molecules/primary-typography";
import { SecondaryBox } from "../../molecules/secondary-box";

export interface CarDataProps {
  title: string;
  type: "manual" | "automatic";
  category: "small" | "medium" | "large" | "premium";
  fuel: "petrol" | "diesel" | "electric";
  seats: number;
  doors: number;
  imageSrc: string;
  height: string;
  actionText: string;
  onAction: MouseEventHandler;
}

export const CarData: FC<CarDataProps> = ({
  title,
  type,
  category,
  doors,
  fuel,
  seats,
  imageSrc,
  actionText,
  onAction,
}) => {
  const { t } = useTranslate();
  return (
    <Card>
      <CardMedia component="img" image={imageSrc} />
      <CardContent>
        <PrimaryTypography variant="h5">{title}</PrimaryTypography>
        <PrimaryTypography variant="h6">{t(category)}</PrimaryTypography>
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
              {type}
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
              {fuel}
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
              {seats}
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
              {doors}
            </SecondaryBox>
          </Grid>
          <Grid xs={12} sx={{ mt: 1 }}>
            <Button fullWidth variant="contained" onClick={onAction}>
              {actionText}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
