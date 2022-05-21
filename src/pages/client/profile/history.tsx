import { Error } from "@mui/icons-material";
import { Box, List, Paper, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { RequireAuth } from "../../../auth/required-auth";
import { LoadingPage } from "../../../components/molecules/loading-page";
import { HistoryItem } from "../../../components/organism/history-item";
import { ProfileLayout } from "../../../components/templates/client/layout/profile";
import { useClientService } from "../../../service/user/client/application";
import { useStore } from "../../../store";

export const History: FC = () => {
  const { getter } = useClientService();
  const [loading, setLoading] = useState(true);
  const { historyRents } = useStore((state) => state.loggedClient);
  useEffect(() => {
    getter.getRents().then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <RequireAuth>
      <ProfileLayout title="Historial de alquileres">
        <Box>
          <Paper elevation={0}>
            {historyRents?.length > 0 ? (
              <List sx={{ boxShadow: "unset" }}>
                {historyRents.map((rent) => (
                  <HistoryItem key={rent.id} data={rent} />
                ))}
              </List>
            ) : (
              <Typography
                variant="h5"
                color="#666"
                alignItems="center"
                display="flex"
              >
                <Error fontSize="large" color="secondary" sx={{ mr: 2 }} />
                No posee reservas anteriores
              </Typography>
            )}
          </Paper>
        </Box>
      </ProfileLayout>
    </RequireAuth>
  );
};
