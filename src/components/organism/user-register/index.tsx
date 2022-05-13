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
import { FC, useState } from "react";
import { SectionHeader } from "../../molecules/section";
import { Form } from "../form";

export const UserRegister: FC = () => {
  const theme = useTheme();
  const [onlinePay, setOnlinePay] = useState(true);
  return (
    <Box width="100%">
      <Form
        paperProps={{ elevation: 0 }}
        saveContent="Continuar"
        handleSubmit={() => null}
        buttomComponent={
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => null}
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
            <Grid item md={6}>
              <FormControl fullWidth>
                <TextField
                  required
                  variant="standard"
                  type="text"
                  fullWidth
                  label="Nombre"
                />
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl fullWidth>
                <TextField
                  required
                  variant="standard"
                  type="text"
                  fullWidth
                  label="Apellidos"
                />
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <FormControl fullWidth>
                <TextField
                  required
                  variant="standard"
                  type="text"
                  fullWidth
                  label="DNI/NIE"
                />
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <FormControl fullWidth>
                <TextField
                  required
                  variant="standard"
                  type="text"
                  fullWidth
                  label="Correo eléctronico"
                />
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <FormControl fullWidth>
                <TextField
                  required
                  variant="standard"
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
                    checked={onlinePay}
                    onChange={() => setOnlinePay(!onlinePay)}
                    name="online_pay"
                  />
                }
                label="Pago online"
              />
              {onlinePay && (
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Visa"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Paypal"
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
