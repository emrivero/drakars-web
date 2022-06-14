import { Grid, useTheme } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upper } from "../../../components/atoms/transforms/upper";
import { CustomTypography } from "../../../components/molecules/custom-typography";
import { LoadingPage } from "../../../components/molecules/loading-page";
import { CarFilter } from "../../../components/organism/car-filter";
import { CarData } from "../../../components/organism/rent-car-data";
import { Layout } from "../../../components/templates/client/layout";
import { CommonSection } from "../../../components/templates/client/layout/common-section";
import { RentStepper } from "../../../components/templates/client/layout/rent-stepper";
import { VehiclesNotFound } from "../../../components/templates/client/not-found/vehicles";
import { useTranslate } from "../../../i18n/useTranslate";
import { Routes } from "../../../routes/routes";
import { useRentCarService } from "../../../service/rent-car/application";
import { useStore } from "../../../store";

export const SearchCar: FC = () => {
  const { filterer, finder } = useRentCarService();
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslate();
  const {
    data: { data, meta },
    filter,
  } = useStore((state) => state.rentData.availableVehicles);

  const {
    selectedOffice: { originOffice },
  } = useStore((state) => state.rentData);

  useEffect(() => {
    if (!originOffice) {
      navigate(Routes.LOCATION_DATE_PAGE);
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
        backLink={Routes.LOCATION_DATE_PAGE}
      />
      <CommonSection>
        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <CustomTypography
              type="open"
              align="center"
              color={theme.palette.primary.dark}
              variant="h3"
            >
              <Upper>{t("choosecar")}</Upper>
            </CustomTypography>
          </Grid>
          <CarFilter sx={{ mt: 4 }} filter={filter} paginator={finder} />
          <Grid container justifyContent={"center"}>
            {data?.length > 0
              ? data.map((data) => {
                  return (
                    <Grid
                      item
                      key={data.title}
                      xs={12}
                      sm={6}
                      md={4}
                      sx={{ mt: 4, p: 1 }}
                    >
                      <CarData
                        actionText={t("choose2")}
                        onAction={() => {
                          filterer.selectVehicle(data);
                          navigate(Routes.CONFIRM_PAGE);
                        }}
                        data={data}
                        imageSrc={`${process.env.REACT_APP_API_URL}${data?.image?.url}`}
                      />
                    </Grid>
                  );
                })
              : !!meta && <VehiclesNotFound />}
          </Grid>
        </Grid>
      </CommonSection>
    </Layout>
  );
};
