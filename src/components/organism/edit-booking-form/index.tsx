import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { FC } from "react";
import { useRentCarService } from "../../../service/rent-car/application";
import { useStore } from "../../../store";
import { PrimaryTypography } from "../../molecules/primary-typography";
import { EditBookingForm } from "./form";

export const EditManageModal: FC<DialogProps> = (props) => {
  const { reference, renterUser } = useStore((state) => state.rentConfirmData);
  const confirm = useConfirm();
  const { editor, getter } = useRentCarService();
  const onEdit = async () => {
    const data = await editor.edit();
    if (data) {
      confirm({
        title: "",
        cancellationButtonProps: {
          sx: { display: "none" },
        },
        confirmationText: "Volver",
        description: (
          <>
            <PrimaryTypography variant="h4" align="center">
              ¡Reserva modificada!
            </PrimaryTypography>
          </>
        ),
      });
      props.onClose({}, "backdropClick");
      getter.fetch(renterUser.dni, reference);
    }
  };
  return (
    <Dialog {...props} sx={{ minHeight: { md: "500px" } }}>
      <DialogTitle>
        <PrimaryTypography variant="h5">Cambio de reserva</PrimaryTypography>
      </DialogTitle>
      <DialogContent sx={{ minHeight: { md: "475px" } }}>
        <EditBookingForm />
        <DialogContentText>
          <Typography fontStyle="italic">
            Nota: El cambio de reserva no permite modificar tu datos de origen
            ni el vehículo elegido.
          </Typography>
          <Typography fontStyle="italic">
            Si necesita cambiar algunos de estos datos primero debe cancelar la
            reserva actual y volver a hacer una reserva nueva.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => props.onClose(e, "backdropClick")}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={onEdit} autoFocus>
          Cambiar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
