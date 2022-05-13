import { Grid, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { Upper } from "../../components/atoms/transforms/upper";
import { CustomTypography } from "../../components/molecules/custom-typography";
import { SecondaryTypography } from "../../components/molecules/secondary-typography";
import { Layout } from "../../components/templates/layout";
import { CommonSection } from "../../components/templates/layout/common-section";

export const RentSuccess: FC = () => {
  useEffect(() => {
    return;
  });
  return (
    <Layout showFooter={false}>
      <CommonSection>
        <Grid container width={"100%"}>
          <Grid item xs={12}>
            <SecondaryTypography variant="h2" align="center">
              Reserva Confirmada
            </SecondaryTypography>
          </Grid>
          <Grid xs={12}>
            <CustomTypography
              variant="h4"
              align="center"
              themeColor={(theme) => theme.palette.primary.main}
            >
              Su reserva se ha confirmado exitosamente.
            </CustomTypography>
          </Grid>
          <Grid xs={12} sx={{ mt: 12 }}>
            <Typography variant="h6">
              <Upper> Detalles de su reserva</Upper>
            </Typography>
          </Grid>
        </Grid>
      </CommonSection>
    </Layout>
  );
};
