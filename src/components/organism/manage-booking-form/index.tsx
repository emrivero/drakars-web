import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../../i18n/useTranslate";
import { Routes } from "../../../routes/routes";
import { useRentCarService } from "../../../service/rent-car/application";
import { useStore } from "../../../store";

export const ManageBookingForm: FC = () => {
  const navigate = useNavigate();
  const { getter } = useRentCarService();
  const { set } = useStore((state) => state.anonActiveRent);
  const { t } = useTranslate();
  const [{ reference, email }, setState] = useState<{
    reference?: string;
    email?: string;
  }>({
    reference: "",
    email: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  const onContinue = async () => {
    try {
      const result = await getter.fetch(email, reference);
      if (!result) {
        enqueueSnackbar("Reserva no encontrada", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
        return;
      }
      set(result);
      navigate(Routes.EDIT_BOOKING_PAGE);
    } catch (e) {
      enqueueSnackbar("Reserva no encontrada", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
    }
  };

  return (
    <form>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              onChange={(e) => setState({ email, reference: e.target.value })}
              value={reference}
              required
              type="text"
              variant="outlined"
              label={t("reservation")}
              fullWidth
              placeholder={t("enternum")}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              onChange={(e) => setState({ email: e.target.value, reference })}
              value={email}
              required
              label={t("email2")}
              type={"email"}
              fullWidth
              variant="outlined"
              placeholder={t("enteremail")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onContinue();
                }
              }}
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
              disabled={!reference || !email}
              fullWidth
              sx={{ py: 2 }}
              variant="contained"
              color="primary"
              onClick={onContinue}
            >
              {t("continue")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
