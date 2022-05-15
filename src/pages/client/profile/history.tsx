import { Box, List, Paper } from "@mui/material";
import { FC } from "react";
import { HistoryItem } from "../../../components/organism/history-item";
import { ProfileLayout } from "../../../components/templates/client/layout/profile";

export const History: FC = () => {
  return (
    <ProfileLayout title="Historial de alquileres">
      <Box>
        <Paper>
          <List>
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
          </List>
        </Paper>
      </Box>
    </ProfileLayout>
  );
};
