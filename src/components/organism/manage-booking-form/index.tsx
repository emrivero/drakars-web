import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import { FC } from "react";

export const ManageBookingForm: FC = () => {
  return (
    <form>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              type="text"
              fullWidth
              placeholder="Introduce número de reserva"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              type={"email"}
              fullWidth
              placeholder="Introduce tu correo electrónico"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              pt: 1,
              pb: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              fullWidth
              sx={{ py: 2 }}
              variant="contained"
              color="primary"
            >
              Continuar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
