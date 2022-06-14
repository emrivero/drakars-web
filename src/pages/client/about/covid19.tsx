import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Upper } from "../../../components/atoms/transforms/upper";
import { Banner } from "../../../components/molecules/banner";
import { CustomTypography } from "../../../components/molecules/custom-typography";
import { Layout } from "../../../components/templates/client/layout";
import { CommonSection } from "../../../components/templates/client/layout/common-section";
import { useTranslate } from "../../../i18n/useTranslate";

const Covid19 = () => {
  const theme = useTheme();
  const { t } = useTranslate();
  return (
    <Layout>
      <CommonSection>
        <Grid container gap={[0, 4]}>
          <Grid item xs={12}>
            <Box>
              <CustomTypography
                type="open"
                align="center"
                color={theme.palette.primary.dark}
                variant="h3"
              >
                <Upper>{t("measure")}</Upper>
              </CustomTypography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography>{t("safety")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Banner title={t("free")} />
          </Grid>
          <Grid item xs={12}>
            <CustomTypography>{t("ifyou")}</CustomTypography>
            <br />
            <CustomTypography>{t("cancel")}</CustomTypography>
          </Grid>
          <Grid item xs={12}>
            <Banner title={t("cleaning")} />
          </Grid>
          <Grid item xs={12}>
            <CustomTypography>{t("suppliers")}</CustomTypography>
            <br />
            <CustomTypography variant="h6">
              {t("desinfection")}
            </CustomTypography>
            <br />
            <CustomTypography>{t("rigorous")}</CustomTypography>
            <br />
            <CustomTypography variant="h6">{t("special")}</CustomTypography>
            <br />
            <CustomTypography>{t("likewise")}</CustomTypography>
          </Grid>
          <Grid item xs={12}>
            <Banner title={t("changes")} />
          </Grid>
          <Grid item xs={12}>
            <CustomTypography>{t("rental")}</CustomTypography>
            <br />
            <CustomTypography variant="h6">{t("distancing")}</CustomTypography>
            <br />
            <CustomTypography>{t("anyone")}</CustomTypography>
            <br />
            <CustomTypography variant="h6">{t("follow")}</CustomTypography>
            <br />
            <CustomTypography>{t("situation")}</CustomTypography>
          </Grid>
        </Grid>
      </CommonSection>
    </Layout>
  );
};

export default Covid19;
