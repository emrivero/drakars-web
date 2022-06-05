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
import { Upper } from "../../../components/atoms/transforms/upper";
import { CustomTypography } from "../../../components/molecules/custom-typography";
import { PrimaryTypography } from "../../../components/molecules/primary-typography";
import { Layout } from "../../../components/templates/client/layout";
import { CommonSection } from "../../../components/templates/client/layout/common-section";

export const ContactPage = () => {
  const theme = useTheme();
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
            <Box sx={{ width: "40%" }}>
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
                    fullWidth
                    placeholder="Escriba su nombre"
                    label="Nombre"
                  />
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
                    fullWidth
                    placeholder="Escriba su email"
                    label="Email"
                  />
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
                    fullWidth
                    placeholder="Escriba su teléfono"
                    label="Teléfono"
                  />
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
                    rows={6}
                    maxRows={6}
                    multiline
                    fullWidth
                    placeholder="Escriba su consulta..."
                    label="Mensaje"
                  />
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Box sx={{ width: "40%" }}>
              <Button variant="contained" fullWidth>
                Enviar mensaje
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CommonSection>
    </Layout>
  );
};
