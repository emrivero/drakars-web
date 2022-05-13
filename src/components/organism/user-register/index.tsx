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
  useTheme,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useRentCarService } from "../../../service/rent-car/application";
import { useStore } from "../../../store";
import { SectionHeader } from "../../molecules/section";
import { Form } from "../form";

export const UserRegister: FC = () => {
  const theme = useTheme();
  const { userData } = useStore((state) => state.rentData);
  const { saveUserData, confirm } = useRentCarService();
  const navigate = useNavigate();

  const onConfirm = async () => {
    await confirm.confirm();
    navigate("/rent/success");
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
                  onChange={(e) => saveUserData.set({ name: e.target.value })}
                  value={userData.name}
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
                  value={userData.lastName}
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
                  value={userData.dni}
                  required
                  type="text"
                  fullWidth
                  label="DNI/NIE"
                />
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <FormControl fullWidth>
                <TextField
                  onChange={(e) => saveUserData.set({ email: e.target.value })}
                  value={userData.email}
                  required
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
                  value={userData.phone}
                  required
                  type="text"
                  fullWidth
                  label="Número de teléfono móvil"
                />
              </FormControl>
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
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
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
                      value="male"
                      control={<Radio />}
                      label="cash"
                    />
                  </RadioGroup>
                </FormControl>
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
