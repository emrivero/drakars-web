import {
  Box,
  Button,
  FormLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Upper } from "../../../components/atoms/transforms/upper";
import { CustomTypography } from "../../../components/molecules/custom-typography";
import { ErrorTypography } from "../../../components/molecules/error-typography";
import { PrimaryTypography } from "../../../components/molecules/primary-typography";
import { Layout } from "../../../components/templates/client/layout";
import { CommonSection } from "../../../components/templates/client/layout/common-section";
import { FormValidator } from "../../../service/base/utils/FormValidator";
import { ClientClient } from "../../../service/user/client/client";

interface ContactType {
  name: string;
  phone: string;
  message: string;
  email: string;
}

const ContactFormValidator = new FormValidator<ContactType>({
  phone: [
    {
      errorMessage: "El formato es 6 números comenzando en 6 o 7.",
      isValid: (value) => {
        return /^\+?(6\d{2}|7[1-9]\d{1})\d{6}$/.test(value);
      },
    },
  ],
  name: [
    {
      errorMessage: "El nombre no puede estar vacío",
      isValid: (value) => value !== "",
    },
  ],
  message: [
    {
      errorMessage: "El mensaje no puede estar vacío",
      isValid: (value) => value !== "",
    },
  ],
  email: [
    {
      isValid: (value) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value),
      errorMessage: "El email tiene que ser válido",
    },
  ],
});

export const ContactPage = () => {
  const client = new ClientClient();
  const [firstValidate, setFirstValidate] = useState(false);
  const theme = useTheme();
  const [state, setState] = useState<ContactType>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { name, email, message, phone } = state;
  const { enqueueSnackbar } = useSnackbar();
  const onSend = async () => {
    const response = await client.post("contact", state);

    if (response.status === 201) {
      enqueueSnackbar("Mensaje enviado", {
        variant: "success",
        autoHideDuration: 2000,
        anchorOrigin: { horizontal: "center", vertical: "top" },
      });
      setState({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setFirstValidate(false);
    } else {
      enqueueSnackbar("Formulario inválido", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: { horizontal: "center", vertical: "top" },
      });
      setFirstValidate(true);
    }
  };

  if (firstValidate) {
    ContactFormValidator.validate(state);
  }

  const validateState = ContactFormValidator.validateInfo;

  useEffect(() => {
    return () => ContactFormValidator.setValid();
  });

  return (
    <Layout>
      <CommonSection>
        <Grid container gap={[0, 4]}>
          <Grid item xs={12}>
            <CustomTypography
              type="open"
              align="center"
              color={theme.palette.primary.dark}
              variant="h3"
            >
              <Upper>Contáctanos</Upper>
            </CustomTypography>
            <Typography variant="h4" align="center">
              Haznos saber en qué podemos ayudarte
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} display="flex" justifyContent="center" mt={2}>
            <Box sx={{ width: { md: "40%", xs: "70%" } }}>
              <Paper>
                <Box sx={{ p: 1 }}>
                  <FormLabel>
                    <PrimaryTypography fontWeight={500}>
                      Su nombre
                    </PrimaryTypography>
                  </FormLabel>
                </Box>
                <Box sx={{ p: 1, flexGrow: 1 / 3 }}>
                  <TextField
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    value={name}
                    required
                    fullWidth
                    placeholder="Escriba su nombre"
                    label="Nombre"
                    error={!validateState?.name?.valid}
                  />
                  <ErrorTypography hidden={validateState?.name?.valid}>
                    {validateState?.name?.errorMessage}
                  </ErrorTypography>
                </Box>
                <Box sx={{ p: 1 }}>
                  <FormLabel>
                    <PrimaryTypography fontWeight={500}>
                      Su email
                    </PrimaryTypography>
                  </FormLabel>
                </Box>
                <Box sx={{ p: 1, flexGrow: 1 / 3 }}>
                  <TextField
                    onChange={(e) =>
                      setState({ ...state, email: e.target.value })
                    }
                    value={email}
                    required
                    fullWidth
                    placeholder="Escriba su email"
                    label="Email"
                    error={!validateState?.email?.valid}
                  />
                  <ErrorTypography hidden={validateState?.email?.valid}>
                    {validateState?.email?.errorMessage}
                  </ErrorTypography>
                </Box>
                <Box sx={{ p: 1 }}>
                  <FormLabel>
                    <PrimaryTypography fontWeight={500}>
                      Un teléfono de contacto
                    </PrimaryTypography>
                  </FormLabel>
                </Box>
                <Box sx={{ p: 1, flexGrow: 1 / 3 }}>
                  <TextField
                    onChange={(e) =>
                      setState({ ...state, phone: e.target.value })
                    }
                    value={phone}
                    required
                    fullWidth
                    placeholder="Escriba su teléfono"
                    label="Teléfono"
                    error={!validateState?.phone?.valid}
                  />
                  <ErrorTypography hidden={validateState?.phone?.valid}>
                    {validateState?.phone?.errorMessage}
                  </ErrorTypography>
                </Box>
                <Box sx={{ p: 1 }}>
                  <FormLabel>
                    <PrimaryTypography fontWeight={500}>
                      Su mensaje
                    </PrimaryTypography>
                  </FormLabel>
                </Box>
                <Box sx={{ p: 1, flexGrow: 1 / 3 }}>
                  <TextField
                    onChange={(e) =>
                      setState({ ...state, message: e.target.value })
                    }
                    value={message}
                    required
                    rows={6}
                    maxRows={6}
                    multiline
                    fullWidth
                    placeholder="Escriba su consulta..."
                    label="Mensaje"
                    error={!validateState?.message?.valid}
                  />
                  <ErrorTypography hidden={validateState?.message?.valid}>
                    {validateState?.message?.errorMessage}
                  </ErrorTypography>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Box sx={{ width: { md: "40%", xs: "70%" } }}>
              <Button variant="contained" fullWidth onClick={onSend}>
                Enviar mensaje
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CommonSection>
    </Layout>
  );
};
