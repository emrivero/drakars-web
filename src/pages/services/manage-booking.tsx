import { Container, Grid, useTheme } from "@mui/material";
import { FC } from "react";
import { Capitalize } from "../../components/atoms/transforms/capitalize";
import { Upper } from "../../components/atoms/transforms/upper";
import { CustomTypography } from "../../components/molecules/custom-typography";
import { ManageBookingForm } from "../../components/organism/manage-booking-form";
import { Layout } from "../../components/templates/layout";
import { CommonSection } from "../../components/templates/layout/common-section";

export const ManageBooking: FC = () => {
  const theme = useTheme();
  return (
    <Layout showFooter={false}>
      <CommonSection>
        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <CustomTypography
              type="open"
              align="center"
              color={theme.palette.primary.dark}
              variant="h3"
            >
              <Upper>gestiona tu reserva</Upper>
            </CustomTypography>
          </Grid>
          <Grid item xs={12}>
            <CustomTypography align="center" color={"#999"} variant="h6">
              <Capitalize>
                modifica o cancela tu reserva según lo que necesites, sin
                complicaciones.
              </Capitalize>
            </CustomTypography>
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth={"md"}>
              <ManageBookingForm />
            </Container>
          </Grid>
        </Grid>
      </CommonSection>
    </Layout>
  );
};