import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { ErrorTypography } from "../../../components/molecules/error-typography";
import { Form } from "../../../components/organism/form";
import { ProfileLayout } from "../../../components/templates/client/layout/profile";
import { useClientService } from "../../../service/user/client/application";
import { useStore } from "../../../store";

export const Profile: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const { info } = useStore((state) => state.loggedClient);
  const navigate = useNavigate();
  const { getter, editor, formValidator } = useClientService();

  useEffect(() => {
    getter.getMe();
  }, []);

  const onConfirm = async () => {
    await editor.editMe();
    enqueueSnackbar("¡Información personal actualizada!", {
      variant: "success",
      autoHideDuration: 2 * 1000,
    });
  };

  const { phone, name, family_name } = formValidator.validate(info);

  return (
    <ProfileLayout title="Datos personales">
      <Box width="100%">
        <Form paperProps={{ elevation: 0 }} showActions={false}>
          <Grid container mt={1} rowSpacing={4} columnSpacing={2} pb={5}>
            <Grid item md={12}>
              <FormControl fullWidth>
                <TextField
                  onChange={(e) => getter.setClient({ name: e.target.value })}
                  value={info?.name || ""}
                  required
                  type="text"
                  fullWidth
                  label="Nombre"
                  error={!name.valid}
                />
                <ErrorTypography hidden={name.valid}>
                  {name.errorMessage}
                </ErrorTypography>
              </FormControl>
            </Grid>
            <Grid item md={12}>
              <FormControl fullWidth>
                <TextField
                  onChange={(e) =>
                    getter.setClient({ family_name: e.target.value })
                  }
                  value={info?.family_name || ""}
                  required
                  error={!family_name.valid}
                  type="text"
                  fullWidth
                  label="Apellidos"
                />
                <ErrorTypography hidden={family_name.valid}>
                  {family_name.errorMessage}
                </ErrorTypography>
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <FormControl fullWidth>
                <TextField
                  type="text"
                  value={info?.dni || ""}
                  disabled
                  fullWidth
                  label="DNI/NIE"
                />
                <Typography variant="caption" color="#aaa">
                  No puede editarse
                </Typography>
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <FormControl fullWidth>
                <TextField
                  value={info?.email || ""}
                  disabled
                  type="text"
                  fullWidth
                  label="Correo eléctronico"
                />
                <Typography variant="caption" color="#aaa">
                  No puede editarse
                </Typography>
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <FormControl fullWidth>
                <TextField
                  onChange={(e) => getter.setClient({ phone: e.target.value })}
                  value={info?.phone || ""}
                  required
                  error={!phone.valid}
                  type="text"
                  fullWidth
                  label="Número de teléfono móvil"
                />
                <ErrorTypography hidden={phone.valid}>
                  {phone.errorMessage}
                </ErrorTypography>
              </FormControl>
            </Grid>
            <Grid md={12} p={2} display="flex" justifyContent="center">
              <Button
                size="large"
                sx={{ px: 4, py: 1 }}
                variant="contained"
                color="primary"
                onClick={onConfirm}
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
