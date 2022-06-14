import { Grid, Typography, useTheme } from "@mui/material";
import { Upper } from "../../../components/atoms/transforms/upper";
import { CustomTypography } from "../../../components/molecules/custom-typography";
import { FaqItem } from "../../../components/molecules/faq-item";
import { Layout } from "../../../components/templates/client/layout";
import { CommonSection } from "../../../components/templates/client/layout/common-section";
import { useTranslate } from "../../../i18n/useTranslate";

const Faq = () => {
  const theme = useTheme();
  const { t } = useTranslate();

  return (
    <Layout>
      <CommonSection>
        <Grid container gap={[0, 8]}>
          <Grid item xs={12}>
            <CustomTypography
              type="open"
              align="center"
              color={theme.palette.primary.dark}
              variant="h3"
            >
              <Upper>{t("frequently")}</Upper>
            </CustomTypography>
            <Typography align="center">{t("tohelp")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <FaqItem title={t("whocan")}>{t("thedriver")}</FaqItem>
            <FaqItem title={t("privacy")}>{t("personal")}</FaqItem>
            <FaqItem title={t("can")}>{t("yes")}</FaqItem>
            <FaqItem title={t("reserve")}>{t("inDrakars")}</FaqItem>
            <FaqItem title={t("why")}>{t("credit")}</FaqItem>
            <FaqItem title={t("ifi")}>{t("before")}</FaqItem>
          </Grid>
        </Grid>
      </CommonSection>
    </Layout>
  );
};

export default Faq;
