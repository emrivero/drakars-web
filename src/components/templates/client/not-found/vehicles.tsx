import { Box, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { NotFoundIcon } from "../../../atoms/not-found";

export const VehiclesNotFound: FC = () => {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Box>
        <NotFoundIcon sx={{ fontSize: 128 }} />
      </Box>
      <Typography variant="h4" color={theme.palette.error.main}>
        Lo sentimos
      </Typography>
      <Typography variant="h5" fontWeight={600}>
        Esta oficina no tiene coches disponibles en la fecha seleccionada
      </Typography>
    </Box>
  );
};
