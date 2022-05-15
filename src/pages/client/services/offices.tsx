import { Search } from "@mui/icons-material";
import { Grid, TextField, useTheme } from "@mui/material";
import { FC, useEffect } from "react";
import { Upper } from "../../../components/atoms/transforms/upper";
import { CustomTypography } from "../../../components/molecules/custom-typography";
import { OfficeSection } from "../../../components/organism/office-section";
import { Layout } from "../../../components/templates/layout";
import { CommonSection } from "../../../components/templates/layout/common-section";
import { useOfficeService } from "../../../service/office/application";
import { useStore } from "../../../store";

export const Offices: FC = () => {
  const theme = useTheme();
  const { data } = useStore((state) => state.offices);
  const {
    finder,
    mappers: { CityWithOffices },
  } = useOfficeService();

  useEffect(() => {
    finder.fetch();
  }, []);

  const mappedData = CityWithOffices.create(data).data;
  return (
    <Layout>
      <CommonSection>
        <Grid container gap={[0, 4]}>
          <Grid item xs={12}>
            <CustomTypography
              type="open"
              align="center"
              color={theme.palette.primary.dark}
              variant="h3"
            >
              <Upper>nuestra red de oficinas</Upper>
            </CustomTypography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => finder.onSearch({ search: e.target.value })}
              fullWidth
              placeholder="Introduce nombre de oficina, municipio, provincia o código postal"
              InputProps={{
                type: "search",
                endAdornment: <Search />,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {mappedData.map((data) => {
              return (
                <OfficeSection
                  key={data.city.name}
                  title={data.city.name}
                  offices={data.offices}
                />
              );
            })}
          </Grid>
        </Grid>
      </CommonSection>
    </Layout>
  );
};
