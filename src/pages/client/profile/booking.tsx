import { Error } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import { ProfileLayout } from "../../../components/templates/client/layout/profile";

export const Booking: FC = () => {
  return (
    <ProfileLayout title="Información de reserva">
      <Grid container>
        <Grid item sm={12} display="flex">
          <Typography
            variant="h5"
            color="#666"
            alignItems="center"
            display="flex"
          >
            <Error fontSize="large" color="secondary" sx={{ mr: 2 }} />
            No posee ninguna reserva activa
          </Typography>
        </Grid>
      </Grid>
    </ProfileLayout>
  );
};
