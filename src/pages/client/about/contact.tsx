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
import { useTranslate } from "../../../i18n/useTranslate";

export const ContactPage = () => {
  const theme = useTheme();
  const { t } = useTranslate();
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
              <Upper>{t("contact")}</Upper>
            </CustomTypography>
            <Typography variant="h4" align="center">
              {t("let")}
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
                      {t("name2")}
                    </PrimaryTypography>
                  </FormLabel>
                </Box>
                <Box sx={{ p: 1, flexGrow: 1 / 3 }}>
                  <TextField
                    fullWidth
                    placeholder="Escriba su nombre"
                    label={t("name3")}
                  />
                </Box>
                <Box sx={{ p: 1 }}>
                  <FormLabel>
                    <PrimaryTypography fontWeight={500}>
                      {t("email")}
                    </PrimaryTypography>
                  </FormLabel>
                </Box>
                <Box sx={{ p: 1, flexGrow: 1 / 3 }}>
                  <TextField
                    fullWidth
                    placeholder="Escriba su email"
                    label={t("email2")}
                  />
                </Box>
                <Box sx={{ p: 1 }}>
                  <FormLabel>
                    <PrimaryTypography fontWeight={500}>
                      {t("phone")}
                    </PrimaryTypography>
                  </FormLabel>
                </Box>
                <Box sx={{ p: 1, flexGrow: 1 / 3 }}>
                  <TextField
                    fullWidth
                    placeholder="Escriba su teléfono"
                    label={t("phone2")}
                  />
                </Box>
                <Box sx={{ p: 1 }}>
                  <FormLabel>
                    <PrimaryTypography fontWeight={500}>
                      {t("message")}
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
                    label={t("message2")}
                  />
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Box sx={{ width: "40%" }}>
              <Button variant="contained" fullWidth>
                {t("send")}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CommonSection>
    </Layout>
  );
};
