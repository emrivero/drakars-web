import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { OptionsObject, useSnackbar } from "notistack";
import { FC, MouseEventHandler, useState } from "react";
import { useAdminServices } from "../../../service/user/admin/application";
import { useStore } from "../../../store";
import { ErrorTypography } from "../../molecules/error-typography";
import { PrimaryTypography } from "../../molecules/primary-typography";

interface RegisterEditorProps {
  open: boolean;
  handleSave: MouseEventHandler;
  handleCancel: MouseEventHandler;
}

export const ManageRent: FC<RegisterEditorProps> = ({
  open,
  handleSave,
  handleCancel,
}) => {
  const [error, setError] = useState({
    msg: "",
    isError: false,
  });
  const { manageRent } = useAdminServices();
  const { rentInfo, rentRefValue } = useStore();

  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const onGetRent = async () => {
    const { status } = await manageRent.getRent();
    setError({ isError: false, msg: "" });
    if (status === 409) {
      setError({
        isError: true,
        msg: "La reserva no pertenece a esta oficina",
      });
    }
    if (status > 300) {
      setError({
        isError: true,
        msg: "No se ha encontrado reserva",
      });
    }
  };

  const cancel = () => {
    setError({
      isError: false,
      msg: "",
    });
    handleCancel(null);
    manageRent.clear();
  };

  const accept = async () => {
    handleSave(null);
    const opts: OptionsObject = {
      variant: "success",
    };

    if (rentInfo.status === "pending") {
      await manageRent.checkIn();
      enqueueSnackbar("Check In realizado", opts);
    }

    if (rentInfo.status === "checkedin") {
      await manageRent.checkOut();
      enqueueSnackbar("Check out realizado", opts);
    }
    cancel();
  };

  if (!rentInfo) {
    return (
      <Dialog open={open} sx={{ p: 4 }} onClose={cancel}>
        <DialogContent sx={{ minWidth: 500 }}>
          <TextField
            onChange={(e) => manageRent.changeRentValue(e.target.value)}
            fullWidth
            error={error.isError}
            placeholder="Busque reserva por correo, dni o referencia"
            label="Buscar Reserva"
            value={rentRefValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onGetRent();
              }
            }}
          />
          {error.isError && <ErrorTypography>{error.msg}</ErrorTypography>}
          <DialogActions>
            <Button fullWidth variant="contained" onClick={() => onGetRent()}>
              Aceptar
            </Button>
            <Button fullWidth variant="contained" onClick={cancel}>
              Cancelar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} sx={{ p: 4 }} onClose={cancel}>
      <DialogTitle>
        <Typography
          component="p"
          variant="h5"
          color={theme.palette.primary.dark}
        >
          Gestión de reserva
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ minWidth: 560 }}>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Reserva:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {rentInfo.reference}
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Cliente:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {rentInfo.renterUser.name} {rentInfo.renterUser.family_name}
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            DNI:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {rentInfo.renterUser.dni}
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Oficina:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {rentInfo.originOffice.address},{" "}
            {rentInfo.originOffice.municipality.name},{" "}
            {rentInfo.originOffice.municipality.city.name}
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Vehículo:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {rentInfo.rentedVehicle.mark} {rentInfo.rentedVehicle.model}, Llave
            nº {rentInfo.rentedVehicle.id}
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Pago:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            Pagado
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Estado:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {rentInfo.status === "pending" && "Pendiente"}
            {rentInfo.status === "checkedin" && "Entregado"}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel}>Cancelar</Button>
        <Button variant="contained" onClick={accept}>
          {rentInfo.status === "pending" && "Check In"}
          {rentInfo.status === "checkedin" && "Check Out"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
