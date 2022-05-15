import { Grid, useTheme } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upper } from "../../../components/atoms/transforms/upper";
import { CustomTypography } from "../../../components/molecules/custom-typography";
import { LoadingPage } from "../../../components/molecules/loading-page";
import { CarFilter } from "../../../components/organism/car-filter";
import { CarData } from "../../../components/organism/rent-car-data";
import { Layout } from "../../../components/templates/layout";
import { CommonSection } from "../../../components/templates/layout/common-section";
import { RentStepper } from "../../../components/templates/layout/rent-stepper";
import { VehiclesNotFound } from "../../../components/templates/not-found/vehicles";
import { useRentCarService } from "../../../service/rent-car/application";
import { useStore } from "../../../store";

export const SearchCar: FC = () => {
  const { filterer, finder } = useRentCarService();
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    data: { data, meta },
    filter,
  } = useStore((state) => state.rentData.availableVehicles);

  const {
    selectedOffice: { originOffice },
  } = useStore((state) => state.rentData);

  useEffect(() => {
    if (!originOffice) {
      navigate("/rent/location-date");
    }
    finder.list();
    return () => finder.clear();
  }, []);

  if (!originOffice) {
    return <LoadingPage />;
  }

  return (
    <Layout showFooter={false}>
      <RentStepper
        stepperProps={{ activeStep: 1 }}
        backLink="/rent/location-date"
      />
      <CommonSection>
        {data?.length > 0 ? (
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <CustomTypography
                type="open"
                align="center"
                color={theme.palette.primary.dark}
                variant="h3"
              >
                <Upper>elige tu coche</Upper>
              </CustomTypography>
            </Grid>
            <CarFilter sx={{ mt: 4 }} filter={filter} paginator={finder} />
            <Grid container>
              {data.map((data) => {
                return (
                  <Grid
                    item
                    key={data.title}
                    xs={12}
                    sm={6}
                    md={3}
                    sx={{ mt: 4, p: 1 }}
                  >
                    <CarData
                      actionText="Elegir"
                      onAction={() => {
                        filterer.selectVehicle(data);
                        navigate("/rent/confirm");
                      }}
                      data={data}
                      imageSrc="https://www.centauro.net/_next/image/?url=https%3A%2F%2Fcdn.centauro.net%2Fweb%2FA_400738ceb4.jpg&w=384&q=90"
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        ) : (
          !!meta && <VehiclesNotFound />
        )}
      </CommonSection>
    </Layout>
  );
};