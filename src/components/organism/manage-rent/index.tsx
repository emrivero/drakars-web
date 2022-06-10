import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import { OptionsObject, useSnackbar } from "notistack";
import { FC, MouseEventHandler } from "react";
import { useAdminServices } from "../../../service/user/admin/application";
import { useStore } from "../../../store";
import { PrimaryTypography } from "../../molecules/primary-typography";

interface RegisterEditorProps {
  open: boolean;
  handleSave?: MouseEventHandler;
  handleCancel?: MouseEventHandler;
}

export const ManageRent: FC<RegisterEditorProps> = ({
  open,
  handleSave,
  handleCancel,
}) => {
  const { manageRent } = useAdminServices();
  const { rentInfo } = useStore();

  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const cancel = () => {
    handleCancel(null);
    manageRent.clear();
  };

  const accept = async () => {
    const opts: OptionsObject = {
      variant: "success",
    };

    if (rentInfo.status === "pending") {
      const response = await manageRent.checkIn();
      if (response.status < 300) {
        handleSave(null);
        enqueueSnackbar("Check In realizado", opts);
        cancel();
      }
    }

    if (rentInfo.status === "checkedin") {
      const response = await manageRent.checkOut();
      if (response.status < 300) {
        handleSave(null);
        enqueueSnackbar("Check out realizado", opts);
        cancel();
      }
    }
  };

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
            {rentInfo?.reference}
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Cliente:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {rentInfo?.renterUser?.name} {rentInfo?.renterUser?.family_name}
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            DNI:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {rentInfo?.renterUser?.dni}
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Origen:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {rentInfo?.originOffice?.address},{" "}
            {rentInfo?.originOffice?.municipality.name},{" "}
            {rentInfo?.originOffice?.municipality.city.name}
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Destino:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {rentInfo?.destinyOffice?.address},{" "}
            {rentInfo?.destinyOffice?.municipality.name},{" "}
            {rentInfo?.destinyOffice?.municipality.city.name}
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Vehículo:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {rentInfo?.rentedVehicle?.mark} {rentInfo?.rentedVehicle?.model},
            Llave nº {rentInfo?.rentedVehicle?.id}
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Fechas:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {rentInfo?.startDate} / {rentInfo?.endDate}
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Estado:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {rentInfo?.status === "pending" && "Pendiente"}
            {rentInfo?.status === "checkedin" && "Entregado"}
            {rentInfo?.status === "delayed" && "Retrasado"}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        {handleCancel && <Button onClick={cancel}>Cancelar</Button>}
        {handleSave && (
          <Button
            variant="contained"
            onClick={accept}
            disabled={!rentInfo?.modifiable}
          >
            {rentInfo?.status === "pending" && "Entregar coche"}
            {["checkedin", "delayed"].includes(rentInfo?.status) &&
              "Devolver coche"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
