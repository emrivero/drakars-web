import { Search } from "@mui/icons-material";
import { Grid, TextField, useTheme } from "@mui/material";
import { FC } from "react";
import { Upper } from "../../components/atoms/transforms/upper";
import { CustomTypography } from "../../components/molecules/custom-typography";
import { OfficeSection } from "../../components/organism/office-section";
import { Layout } from "../../components/templates/layout";
import { CommonSection } from "../../components/templates/layout/common-section";

export const Offices: FC = () => {
  const theme = useTheme();
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
              fullWidth
              placeholder="Introduce nombre, municipio o provincia"
              InputProps={{
                type: "search",
                endAdornment: <Search />,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <OfficeSection
              title="Sevilla"
              offices={[
                "Tomares",
                "Aeropuerto Sevilla",
                "Estación St Justa",
                "Dos Hermanas, Av. Menéndez Pelayo",
              ]}
            />
            <OfficeSection
              title="Valencia"
              offices={[
                "Tomares",
                "Aeropuerto Sevilla",
                "Estación St Justa",
                "Dos Hermanas, Av. Menéndez Pelayo",
              ]}
            />
            <OfficeSection
              title="Barcelona"
              offices={[
                "Tomares",
                "Aeropuerto Sevilla",
                "Estación St Justa",
                "Dos Hermanas, Av. Menéndez Pelayo",
              ]}
            />
            <OfficeSection
              title="Madrid"
              offices={[
                "Tomares",
                "Aeropuerto Sevilla",
                "Estación St Justa",
                "Dos Hermanas, Av. Menéndez Pelayo",
              ]}
            />
          </Grid>
        </Grid>
      </CommonSection>
    </Layout>
  );
};
