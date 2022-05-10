import { Grid } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RentData } from "../../components/organism/rent-data";
import { UserRegister } from "../../components/organism/user-register";
import { Layout } from "../../components/templates/layout";
import { CommonSection } from "../../components/templates/layout/common-section";
import { RentStepper } from "../../components/templates/layout/rent-stepper";
import { useStore } from "../../store";

export const Confirm: FC = () => {
  const navigate = useNavigate();
  const { selectedOffice, selectedVehicle } = useStore();

  useEffect(() => {
    if (!selectedOffice || !selectedVehicle) {
      navigate("/rent/location-date");
    }
  });
  return (
    <Layout showFooter={false}>
      <RentStepper
        stepperProps={{ activeStep: 2 }}
        backLink="/rent/search-car"
      />
      <CommonSection>
        <Grid container>
          <Grid item xs={12} md={4}>
            <RentData />
          </Grid>
          <Grid
            display="flex"
            justifyContent={"center"}
            px={4}
            item
            xs={12}
            md={8}
          >
            <UserRegister />
          </Grid>
        </Grid>
      </CommonSection>
    </Layout>
  );
};
