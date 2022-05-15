import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router";
import { Form } from "../../../components/organism/form";
import { ProfileLayout } from "../../../components/templates/client/layout/profile";
import { useRentCarService } from "../../../service/rent-car/application";
import { useStore } from "../../../store";

export const Profile: FC = () => {
  const theme = useTheme();
  const { userData } = useStore((state) => state.rentData);
  const { saveUserData, confirm } = useRentCarService();
  const navigate = useNavigate();

  return (
    <ProfileLayout title="Datos personales">
      <Box width="100%">
        <Form paperProps={{ elevation: 0 }} showActions={false}>
          <Grid container mt={1} rowSpacing={4} columnSpacing={2} pb={5}>
            <Grid item md={12}>
              <FormControl fullWidth>
                <TextField
                  onChange={(e) => saveUserData.set({ name: e.target.value })}
                  value={"Antonio"}
                  required
                  type="text"
                  fullWidth
                  label="Nombre"
                />
              </FormControl>
            </Grid>
            <Grid item md={12}>
              <FormControl fullWidth>
                <TextField
                  onChange={(e) =>
                    saveUserData.set({ lastName: e.target.value })
                  }
                  value={"Martínez Ruiz"}
                  required
                  type="text"
                  fullWidth
                  label="Apellidos"
                />
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <FormControl fullWidth>
                <TextField
                  onChange={(e) => saveUserData.set({ dni: e.target.value })}
                  type="text"
                  value={"98765432L"}
                  disabled
                  fullWidth
                  label="DNI/NIE"
                />
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <FormControl fullWidth>
                <TextField
                  onChange={(e) => saveUserData.set({ email: e.target.value })}
                  value={"micorreo@correo.es"}
                  disabled
                  type="text"
                  fullWidth
                  label="Correo eléctronico"
                />
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <FormControl fullWidth>
                <TextField
                  onChange={(e) => saveUserData.set({ phone: e.target.value })}
                  value={678456732}
                  required
                  type="text"
                  fullWidth
                  label="Número de teléfono móvil"
                />
              </FormControl>
            </Grid>
            <Grid md={12} p={2} display="flex" justifyContent="center">
              <Button
                size="large"
                sx={{ px: 4, py: 1 }}
                variant="contained"
                color="primary"
                // onClick={onConfirm}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </ProfileLayout>
  );
};
