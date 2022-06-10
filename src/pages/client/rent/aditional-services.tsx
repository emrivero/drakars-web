import { FC } from "react";
import { Layout } from "../../../components/templates/client/layout";
import { RentStepper } from "../../../components/templates/client/layout/rent-stepper";

export const AditionalServices: FC = () => {
  return (
    <Layout showFooter={false}>
      <RentStepper stepperProps={{ activeStep: 2 }}>contenido</RentStepper>
    </Layout>
  );
};
