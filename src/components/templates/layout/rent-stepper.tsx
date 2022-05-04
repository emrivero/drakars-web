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
              <StepLabel>Lugar y fecha</StepLabel>
            </Step>
            <Step>
              <StepLabel>Coche</StepLabel>
            </Step>
            {/* <Step>
              <StepLabel>Servicios adicionales</StepLabel>
            </Step> */}
            <Step>
              <StepLabel>Confirmación</StepLabel>
            </Step>
          </Stepper>
        </Grid>
        {backLink && (
          <Grid item xs={12} sx={{ mt: 4 }}>
            <Button onClick={() => navigate(backLink)}>Atrás</Button>
          </Grid>
        )}
      </Grid>
      {children}
    </Container>
  );
};
