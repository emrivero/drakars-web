import {
  Button,
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
  StepperProps,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../../../i18n/useTranslate";

export interface RentStepperProps {
  stepperProps?: StepperProps;
  backLink?: string;
}

export const RentStepper: FC<RentStepperProps> = ({
  children,
  stepperProps = {},
  backLink = null,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslate();
  return (
    <Container
      maxWidth={false}
      sx={{
        width: { xs: "100%", md: "65%" },
        mt: 10,
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Stepper {...stepperProps}>
            <Step>
              <StepLabel>{t("placedate")}</StepLabel>
            </Step>
            <Step>
              <StepLabel>{t("car")}</StepLabel>
            </Step>
            {/* <Step>
              <StepLabel>Servicios adicionales</StepLabel>
            </Step> */}
            <Step>
              <StepLabel>{t("confirmation")}</StepLabel>
            </Step>
          </Stepper>
        </Grid>
        {backLink && (
          <Grid item xs={12} sx={{ mt: 4 }}>
            <Button onClick={() => navigate(backLink)}>{t("back")}</Button>
          </Grid>
        )}
      </Grid>
      {children}
    </Container>
  );
};
