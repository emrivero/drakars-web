import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRentCarService } from "../../../service/rent-car/application";

export const ManageBookingForm: FC = () => {
  const navigate = useNavigate();
  const { getter } = useRentCarService();

  const [{ reference, dni }, setState] = useState<{
    reference?: string;
    dni?: string;
  }>({
    reference: "",
    dni: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  const onContinue = async () => {
    const result = await getter.fetch(dni, reference);
    if (!result) {
      enqueueSnackbar("Reserva no encontrada", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
      return;
    }
    navigate("/services/edit-booking");
  };

  return (
    <form>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              onChange={(e) => setState({ dni, reference: e.target.value })}
              value={reference}
              required
              type="text"
              variant="outlined"
              label={"Número de reserva"}
              fullWidth
              placeholder="Introduce número de reserva"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              onChange={(e) => setState({ dni: e.target.value, reference })}
              value={dni}
              required
              label={"DNI/NIE"}
              type={"dni"}
              fullWidth
              variant="outlined"
              placeholder="Introduce tu DNI/NIE"
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
              disabled={!reference || !dni}
              fullWidth
              sx={{ py: 2 }}
              variant="contained"
              color="primary"
              onClick={onContinue}
            >
              Continuar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
