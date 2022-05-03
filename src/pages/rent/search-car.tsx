import { Grid, useTheme } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Upper } from "../../components/atoms/transforms/upper";
import { CustomTypography } from "../../components/molecules/custom-typography";
import { CarFilter } from "../../components/organism/car-filter";
import { CarData, CarDataProps } from "../../components/organism/rent-car-data";
import { Layout } from "../../components/templates/layout";
import { CommonSection } from "../../components/templates/layout/common-section";
import { RentStepper } from "../../components/templates/layout/rent-stepper";

const data: Partial<CarDataProps>[] = [
  {
    title: "Fiat 500",
    category: "small",
    doors: 3,
    fuel: "diesel",
    seats: 4,
    height: "200px",
    type: "manual",
    imageSrc:
      "https://www.centauro.net/_next/image/?url=https%3A%2F%2Fcdn.centauro.net%2Fweb%2FA_400738ceb4.jpg&w=384&q=90",
  },
  {
    title: "Fiat 500",
    category: "small",
    doors: 3,
    fuel: "diesel",
    seats: 4,
    height: "200px",
    type: "manual",
    imageSrc:
      "https://www.centauro.net/_next/image/?url=https%3A%2F%2Fcdn.centauro.net%2Fweb%2Ffiat_panda_a1_0a7355a355.jpg&w=384&q=90",
  },
  {
    title: "Fiat 500",
    category: "small",
    doors: 3,
    fuel: "diesel",
    seats: 4,
    height: "200px",
    type: "manual",
    imageSrc:
      "https://www.centauro.net/_next/image/?url=https%3A%2F%2Fcdn.centauro.net%2Fweb%2FA_400738ceb4.jpg&w=384&q=90",
  },
  {
    title: "Fiat 500",
    category: "small",
    doors: 3,
    fuel: "diesel",
    seats: 4,
    height: "200px",
    type: "manual",
    imageSrc:
      "https://www.centauro.net/_next/image/?url=https%3A%2F%2Fcdn.centauro.net%2Fweb%2FA_400738ceb4.jpg&w=384&q=90",
  },
  {
    title: "Fiat 500",
    category: "small",
    doors: 3,
    fuel: "diesel",
    seats: 4,
    height: "200px",
    type: "manual",
    imageSrc:
      "https://www.centauro.net/_next/image/?url=https%3A%2F%2Fcdn.centauro.net%2Fweb%2FA_400738ceb4.jpg&w=384&q=90",
  },
  {
    title: "Fiat 500",
    category: "small",
    doors: 3,
    fuel: "diesel",
    seats: 4,
    height: "200px",
    type: "manual",
    imageSrc:
      "https://www.centauro.net/_next/image/?url=https%3A%2F%2Fcdn.centauro.net%2Fweb%2FA_400738ceb4.jpg&w=384&q=90",
  },
  {
    title: "Fiat 500",
    category: "small",
    doors: 3,
    fuel: "diesel",
    seats: 4,
    height: "200px",
    type: "manual",
    imageSrc:
      "https://www.centauro.net/_next/image/?url=https%3A%2F%2Fcdn.centauro.net%2Fweb%2FA_400738ceb4.jpg&w=384&q=90",
  },
];

export const SearchCar: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Layout showFooter={false}>
      <RentStepper
        stepperProps={{ activeStep: 1 }}
        backLink="/rent/location-date"
      />
      <CommonSection>
        {/* TODO: PAGINA DE FILTROS DE COCHE */}
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
          <CarFilter sx={{ mt: 4 }} />
          <Grid container>
            {data.map((props: CarDataProps) => {
              return (
                <Grid
                  key={props.title}
                  xs={12}
                  sm={6}
                  md={3}
                  sx={{ mt: 4, p: 1 }}
                >
                  <CarData
                    actionText="Elegir"
                    onAction={() => navigate("/rent/confirm")}
                    {...props}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </CommonSection>
    </Layout>
  );
};
