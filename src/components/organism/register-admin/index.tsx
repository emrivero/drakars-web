import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, MouseEventHandler } from "react";
import { useAdminServices } from "../../../service/user/admin/application";
import { useStore } from "../../../store";
import { PrimaryTypography } from "../../molecules/primary-typography";

interface RegisterAdminProps {
  open: boolean;
  handleSave: MouseEventHandler;
  handleCancel: MouseEventHandler;
}

export const RegisterAdmin: FC<RegisterAdminProps> = ({
  open,
  handleCancel,
  handleSave,
}) => {
  const { creator } = useAdminServices();
  const { newAdmin } = useStore();
  const theme = useTheme();

  return (
    <Dialog open={open} sx={{ p: 4 }}>
      <DialogTitle>
        <Typography
          component="p"
          variant="h5"
          color={theme.palette.primary.dark}
        >
          Añadir administrador
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ minWidth: 500 }}>
        <Grid container>
          <Grid item sm={12}>
            <Box sx={{ p: 1 }}>
              <FormLabel>
                <PrimaryTypography fontWeight={500}>
                  Nombre del usuario
                </PrimaryTypography>
              </FormLabel>
            </Box>
            <Box sx={{ display: "flex" }}>
              <TextField
                onChange={(e) =>
                  creator.setAdminState({ name: e.target.value })
                }
                fullWidth
                placeholder="Escriba el nombre de la oficina"
                label="Nombre"
                value={newAdmin.name}
              />
            </Box>
          </Grid>
          <Grid item sm={12}>
            <Box sx={{ p: 1 }}>
              <FormLabel>
                <PrimaryTypography fontWeight={500}>
                  Apellidos del usuario
                </PrimaryTypography>
              </FormLabel>
            </Box>
            <Box sx={{ display: "flex" }}>
              <TextField
                fullWidth
                onChange={(e) =>
                  creator.setAdminState({ family_name: e.target.value })
                }
                placeholder="Escriba los apellidos del usuario"
                label="Apellidos"
                value={newAdmin.family_name}
              />
            </Box>
          </Grid>
          <Grid item sm={12}>
            <Box sx={{ p: 1 }}>
              <FormLabel>
                <PrimaryTypography fontWeight={500}>
                  Correo del usuario
                </PrimaryTypography>
              </FormLabel>
            </Box>
            <Box sx={{ display: "flex" }}>
              <TextField
                fullWidth
                onChange={(e) =>
                  creator.setAdminState({ email: e.target.value })
                }
                placeholder="Escriba el correo del usuario"
                label="Correo eléctronico"
                value={newAdmin.email}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
