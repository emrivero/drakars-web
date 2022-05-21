import { Error } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { RequireAuth } from "../../../auth/required-auth";
import { LoadingPage } from "../../../components/molecules/loading-page";
import { HistoryItem } from "../../../components/organism/history-item";
import { ProfileLayout } from "../../../components/templates/client/layout/profile";
import { useClientService } from "../../../service/user/client/application";
import { useStore } from "../../../store";

export const Booking: FC = () => {
  const { getter } = useClientService();
  const [loading, setLoading] = useState(true);
  const { activeRent } = useStore((state) => state.loggedClient);
  useEffect(() => {
    getter.getRent().then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <RequireAuth>
      <ProfileLayout title="Información de reserva">
        <Grid container>
          {activeRent && activeRent.id ? (
            <Grid item sm={12} display="flex">
              <HistoryItem active data={activeRent} />
            </Grid>
          ) : (
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
          )}
        </Grid>
      </ProfileLayout>
    </RequireAuth>
  );
};
