import { AdminPanelSettings } from "@mui/icons-material";
import { Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import { FC } from "react";

export const FrequentActions: FC = () => {
  const theme = useTheme();
  return (
    <Paper sx={{ p: 4, backgroundColor: theme.palette.primary.dark }}>
      <Grid container rowSpacing={4}>
        <Grid item sm={12}>
          <Typography
            variant="h4"
            fontStyle={"italic"}
            color="#fff"
            align="center"
          >
            Acciones frecuentes
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Button
            color="info"
            fullWidth
            sx={{ py: 2, backgroundColor: "#fff" }}
            size="large"
          >
            <Typography variant="button">Gestionar reserva</Typography>
          </Button>
        </Grid>
        <Grid item sm={12}>
          <Button
            color="info"
            fullWidth
            sx={{ py: 2, backgroundColor: "#fff" }}
            startIcon={<AdminPanelSettings />}
            size="large"
          >
            <Typography variant="button">Añadir administrador</Typography>
          </Button>
        </Grid>
        <Grid item sm={12}>
          <Button
            color="info"
            fullWidth
            sx={{ py: 2, backgroundColor: "#fff" }}
            startIcon={<AdminPanelSettings />}
            size="large"
          >
            <Typography variant="button">Añadir editor</Typography>
          </Button>
        </Grid>
        <Grid item sm={12}>
          <Button
            color="info"
            fullWidth
            sx={{ py: 2, backgroundColor: "#fff" }}
            startIcon={<AdminPanelSettings />}
            size="large"
          >
            <Typography variant="button">Añadir oficina</Typography>
          </Button>
        </Grid>
        <Grid item sm={12}>
          <Button
            color="info"
            fullWidth
            sx={{ py: 2, backgroundColor: "#fff" }}
            startIcon={<AdminPanelSettings />}
            size="large"
          >
            <Typography variant="button">Alta de vehículo</Typography>
          </Button>
        </Grid>
        <Grid item sm={12}>
          <Button
            color="info"
            fullWidth
            sx={{ py: 2, backgroundColor: "#fff" }}
            startIcon={<AdminPanelSettings />}
            size="large"
          >
            <Typography variant="button">Baja de vehículo</Typography>
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
