import { Grid, useTheme } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upper } from "../../../components/atoms/transforms/upper";
import { CustomTypography } from "../../../components/molecules/custom-typography";
import { CarFilter } from "../../../components/organism/car-filter";
import { CarData } from "../../../components/organism/rent-car-data";
import { Layout } from "../../../components/templates/client/layout";
import { CommonSection } from "../../../components/templates/client/layout/common-section";

import { useVehicleService } from "../../../service/vehicle/application";
import { useStore } from "../../../store";

export const RentCar: FC = () => {
  const { finder } = useVehicleService();
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    data: { data },
    filter,
  } = useStore((state) => state.vehicles);

  useEffect(() => {
    finder.fetchVehicles();
  }, []);

  return (
    <Layout>
      <CommonSection>
        <Grid container>
          <Grid item xs={12}>
            <CustomTypography
              type="open"
              align="center"
              color={theme.palette.primary.dark}
              variant="h3"
            >
              <Upper>nuestra flota de coches</Upper>
            </CustomTypography>
          </Grid>
          <CarFilter sx={{ my: 4 }} filter={filter} paginator={finder} />
          {data.map((data) => {
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
                  onAction={() => navigate("/rent/location-date")}
                  actionText="Reservar"
                  data={data}
                  imageSrc="https://www.centauro.net/_next/image/?url=https%3A%2F%2Fcdn.centauro.net%2Fweb%2FA_400738ceb4.jpg&w=384&q=90"
                />
              </Grid>
            );
          })}
        </Grid>
      </CommonSection>
    </Layout>
  );
};
