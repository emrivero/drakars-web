import { FC } from "react";
import { Layout } from "../../components/templates/layout";
import { RentStepper } from "../../components/templates/layout/rent-stepper";

export const Confirm: FC = () => {
  return (
    <Layout showFooter={false}>
      <RentStepper stepperProps={{ activeStep: 2 }} backLink="/rent/search-car">
        contenido
      </RentStepper>
    </Layout>
  );
};
