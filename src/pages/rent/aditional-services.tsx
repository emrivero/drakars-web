import { FC } from "react";
import { Layout } from "../../components/templates/layout";
import { RentStepper } from "../../components/templates/layout/rent-stepper";

export const AditionalServices: FC = () => {
  return (
    <Layout showFooter={false}>
      <RentStepper stepperProps={{ activeStep: 2 }}>contenido</RentStepper>
    </Layout>
  );
};
