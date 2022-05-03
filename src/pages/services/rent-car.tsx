import { Search } from "@mui/icons-material";
import { Grid, TextField, useTheme } from "@mui/material";
import { FC } from "react";
import { Upper } from "../../components/atoms/transforms/upper";
import { CustomTypography } from "../../components/molecules/custom-typography";
import { CarData, CarDataProps } from "../../components/organism/rent-car-data";
import { Layout } from "../../components/templates/layout";
import { CommonSection } from "../../components/templates/layout/common-section";

const data: CarDataProps[] = [
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

export const RentCar: FC = () => {
  const theme = useTheme();
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
          <Grid item xs={12} sx={{ mt: 4 }}>
            <TextField
              fullWidth
              placeholder="Introduce marca o modelo de vehículo"
              InputProps={{
                type: "search",
                endAdornment: <Search />,
              }}
            />
          </Grid>
          {data.map((props: CarDataProps) => {
            return (
              <Grid
                key={props.title}
                xs={12}
                sm={6}
                md={4}
                sx={{ mt: 4, p: 1 }}
              >
                <CarData {...props} />
              </Grid>
            );
          })}
        </Grid>
      </CommonSection>
    </Layout>
  );
};
