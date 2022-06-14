import { Box, Grid, Typography, useTheme } from "@mui/material";
import { Upper } from "../../../components/atoms/transforms/upper";
import { CustomTypography } from "../../../components/molecules/custom-typography";
import { PrimarySpan } from "../../../components/molecules/primary-span";
import { PrimaryTypography } from "../../../components/molecules/primary-typography";
import { Layout } from "../../../components/templates/client/layout";
import { CommonSection } from "../../../components/templates/client/layout/common-section";
import { useTranslate } from "../../../i18n/useTranslate";

const AboutUs = () => {
  const theme = useTheme();
  const { t } = useTranslate();
  return (
    <Layout>
      <CommonSection>
        <Grid
          container
          gap={[0, 4]}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.02)",
            padding: 2,
            borderRadius: "5%",
          }}
        >
          <Grid item xs={12}>
            <CustomTypography
              type="open"
              align="center"
              color={theme.palette.primary.dark}
              variant="h3"
            >
              <Upper>{t("about")}</Upper>
            </CustomTypography>
            <Typography variant="h4" align="center">
              {t("summary")}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <img
              src="/img/about.jpg"
              width="100%"
              style={{ borderRadius: "5%" }}
            />
          </Grid>
          <Grid item xs={8} display="flex" alignItems={"center"}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h6" fontWeight={400} paragraph={true}>
                <PrimarySpan fontWeight={"bolder"}>Drakars</PrimarySpan>{" "}
                {t("itsorigins")}
              </Typography>
              <Typography variant="h6" fontWeight={400} paragraph={true}>
                {t("determined")}{" "}
                <PrimarySpan fontWeight={"bolder"}>Drakars</PrimarySpan>.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={8} display="flex" alignItems={"center"}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h6" fontWeight={400} paragraph={true}>
                {t("name")}
              </Typography>
              <Typography variant="h6" fontWeight={400} paragraph={true}>
                {t("thirty")}{" "}
                <PrimarySpan fontWeight={"bolder"}>Drakars</PrimarySpan>{" "}
                {t("spread")}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <img
              src="/img/drakkar.jpg"
              width="100%"
              style={{ borderRadius: "5%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight={400} paragraph={true}>
              {t("in")} <PrimarySpan fontWeight={"bolder"}>Drakars</PrimarySpan>{" "}
              {t("wewant")}{" "}
              <PrimarySpan fontWeight={"bolder"}>{t("experience")}</PrimarySpan>{" "}
              {t("convey")} <b>{t("choose")}</b>
            </Typography>
            <PrimaryTypography
              textAlign="center"
              letterSpacing={6}
              variant={"h4"}
              paragraph
            >
              <Upper>{t("journey")}</Upper>
            </PrimaryTypography>
            <PrimaryTypography
              textAlign="center"
              letterSpacing={3}
              variant={"h4"}
            >
              <Upper>{t("welcome")}</Upper>
            </PrimaryTypography>
          </Grid>
        </Grid>
      </CommonSection>
    </Layout>
  );
};

export default AboutUs;
