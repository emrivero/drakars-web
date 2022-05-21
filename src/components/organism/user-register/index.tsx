import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Switch,
  TextareaAutosize,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/use-auth";
import { Routes } from "../../../routes/routes";
import { useRentCarService } from "../../../service/rent-car/application";
import { UserData } from "../../../service/rent-car/application/model/user-data";
import { useClientService } from "../../../service/user/client/application";
import { useStore } from "../../../store";
import { ErrorTypography } from "../../molecules/error-typography";
import { SectionHeader } from "../../molecules/section";
import { Form } from "../form";

export const UserRegister: FC = () => {
  const theme = useTheme();
  const { userData } = useStore((state) => state.rentData);
  const { saveUserData, confirm, ConfirmFormValidator } = useRentCarService();
  const [firstValidate, setFirstValidate] = useState(false);
  const { getter } = useClientService();
  const confirmDialog = useConfirm();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      getter.getMe();
    }
  }, []);

  const onChange = (e, name: keyof UserData) => {
    saveUserData.set({ [name]: e.target.value });
  };

  if (firstValidate) {
    ConfirmFormValidator.validate(userData);
  }

  const { dni, email, name, lastName, phone } =
    ConfirmFormValidator.validateInfo;

  const conflictDialog = async () => {
    await confirmDialog({
      title: (
        <ErrorTypography variant="h5" align="center">
          Error
        </ErrorTypography>
      ),
      confirmationButtonProps: {
        sx: { display: "none" },
      },
      confirmationText: "Confirmar bajar",
      cancellationText: "Entendido",
      description: (
        <>
          <ErrorTypography variant="h6" align="center">
            Existe una cuenta registrada con este email.
          </ErrorTypography>
          <ErrorTypography variant="h6" align="center">
            Acceda a su cuenta para hacer uso de nuestros servicios.
          </ErrorTypography>
        </>
      ),
    });
  };

  const forbiddenDialog = async () => {
    await confirmDialog({
      title: (
        <ErrorTypography variant="h5" align="center">
          Error
        </ErrorTypography>
      ),
      confirmationButtonProps: {
        sx: { display: "none" },
      },
      confirmationText: "Confirmar bajar",
      cancellationText: "Entendido",
      description: (
        <>
          <ErrorTypography variant="h6" align="center">
            Ya tiene una reserva hecha con esta cuenta.
          </ErrorTypography>
          <ErrorTypography variant="h6" align="center">
            Si necesita cancelarla vaya a la sección de {'"'}Gestionar Reserva
            {'"'}.
          </ErrorTypography>
        </>
      ),
    });
  };

  const onConfirm = async () => {
    const { status } = await confirm.confirm();

    if (status < 300) {
      navigate(Routes.SUCCESS_PAGE);
    }
    if (status === 400) {
      setFirstValidate(true);
    }

    if (status === 409) {
      conflictDialog();
    }

    if (status === 403) {
      forbiddenDialog();
    }
  };
  return (
    <Box width="100%">
      <Form
        paperProps={{ elevation: 0 }}
        saveContent="Continuar"
        buttomComponent={
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onConfirm}
          >
            Continuar
          </Button>
        }
      >
        <SectionHeader
          title="Datos personales"
          color={theme.palette.secondary.main}
        >
          <Grid container mt={1} rowSpacing={4} columnSpacing={2} pb={5}>
            <Grid item md={12}>
              <FormControl fullWidth>
                <TextField
                  onChange={(e) => onChange(e, "name")}
                  value={userData.name}
                  error={!name.valid}
                  required
                  type="text"
                  fullWidth
                  label="Nombre"
                />
              </FormControl>
              <ErrorTypography hidden={name.valid}>
                {name.errorMessage}
              </ErrorTypography>
            </Grid>
            <Grid item md={12}>
              <FormControl fullWidth>
                <TextField
                  onChange={(e) => onChange(e, "lastName")}
                  value={userData.lastName}
                  required
                  type="text"
                  fullWidth
                  label="Apellidos"
                  error={!lastName.valid}
                />
                <ErrorTypography hidden={lastName.valid}>
                  {lastName.errorMessage}
                </ErrorTypography>
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <FormControl fullWidth>
                <TextField
                  onChange={(e) => onChange(e, "dni")}
                  value={userData.dni}
                  required
                  type="text"
                  fullWidth
                  error={!dni.valid}
                  label="DNI/NIE"
                />
              </FormControl>
              <ErrorTypography hidden={dni.valid}>
                {dni.errorMessage}
              </ErrorTypography>
            </Grid>
            <Grid item md={4}>
              <FormControl fullWidth>
                <TextField
                  onChange={(e) => onChange(e, "email")}
                  error={!email.valid}
                  value={userData.email}
                  required
                  type="text"
                  fullWidth
                  label="Correo eléctronico"
                />
              </FormControl>
              <ErrorTypography hidden={email.valid}>
                {email.errorMessage}
              </ErrorTypography>
            </Grid>
            <Grid item md={4}>
              <FormControl fullWidth>
                <TextField
                  onChange={(e) => onChange(e, "phone")}
                  value={userData.phone}
                  error={!phone.valid}
                  required
                  type="text"
                  fullWidth
                  label="Número de teléfono móvil"
                />
              </FormControl>
              <ErrorTypography hidden={phone.valid}>
                {phone.errorMessage}
              </ErrorTypography>
            </Grid>
          </Grid>
        </SectionHeader>
        <SectionHeader title="Pago" color={theme.palette.secondary.main}>
          <Grid container my={8}>
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="center"
              flexDirection={"column"}
              alignItems="center"
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={userData.onlinePay}
                    onChange={(e) =>
                      saveUserData.set({
                        onlinePay: e.target.checked,
                      })
                    }
                    name="online_pay"
                  />
                }
                label="Pago online"
              />
              {userData.onlinePay && (
                <FormControl>
                  <RadioGroup
                    row
                    defaultValue="visa"
                    name="radio-buttons-group"
                    onChange={(_, value: "visa" | "paypal") =>
                      saveUserData.set({ paymentType: value })
                    }
                  >
                    <FormControlLabel
                      value="visa"
                      control={<Radio />}
                      label="Visa"
                    />
                    <FormControlLabel
                      value="paypal"
                      control={<Radio />}
                      label="Paypal"
                    />
                  </RadioGroup>
                </FormControl>
              )}
              {!userData.onlinePay && (
                <Typography fontStyle={"italic"} sx={{ mt: 4 }}>
                  El pago se hará presencialmente a la entrega del vehículo.
                </Typography>
              )}
            </Grid>
          </Grid>
        </SectionHeader>
        <SectionHeader title="Comentarios" color={theme.palette.secondary.main}>
          <Grid container mt={4} columnSpacing={2} pb={5}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextareaAutosize
                  minRows={5}
                  placeholder="Escribe aquí tus observaciones..."
                />
              </FormControl>
            </Grid>
          </Grid>
        </SectionHeader>
      </Form>
    </Box>
  );
};
