import { Box, Grid, useTheme } from "@mui/material";
import { FC } from "react";
import { Upper } from "../../../components/atoms/transforms/upper";
import { CustomTypography } from "../../../components/molecules/custom-typography";
import { Filter } from "../../../components/organism/rent-filter/filter";
import { Layout } from "../../../components/templates/client/layout";
import { CommonSection } from "../../../components/templates/client/layout/common-section";
import { RentStepper } from "../../../components/templates/client/layout/rent-stepper";
import { useTranslate } from "../../../i18n/useTranslate";

export const LocationDate: FC = () => {
  const theme = useTheme();
  const { t } = useTranslate();

  return (
    <Layout showFooter={false}>
      <RentStepper stepperProps={{ activeStep: 0 }}>
        <CommonSection>
          <Grid container>
            <Grid item xs={12}>
              <CustomTypography
                type="open"
                align="center"
                color={theme.palette.primary.dark}
                variant="h3"
              >
                <Upper>{t("choosedate")}</Upper>
              </CustomTypography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ mt: 4, p: 4 }}
              display="flex"
              justifyContent="center"
            >
              <Box sx={{ width: { lg: "80%", md: "70vw", sm: "95%" } }}>
                <Filter showTitle={false} />
              </Box>
            </Grid>
          </Grid>
        </CommonSection>
      </RentStepper>
    </Layout>
  );
};
