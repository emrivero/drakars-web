import { Grid } from "@mui/material";
import { FC } from "react";
import { SearchInput } from "../../../components/molecules/search";
import { AdminLayout } from "../../../components/templates/admin/layout";
import { useCityService } from "../../../service/city/application";
import { useMunicipalityService } from "../../../service/municipality/application";
import { useOfficeService } from "../../../service/office/application";
import { useStore } from "../../../store";

export const AddOffice: FC = () => {
  const { creator } = useOfficeService();
  const {
    mappers: { CitySelectOptions },
  } = useCityService();
  const {
    mappers: { MunicipalitySelectOptions },
  } = useMunicipalityService();

  const {
    cities,
    municipalities,
    cityId,
    municipalityId,
    searchCity,
    searchMunicipality,
  } = useStore((state) => state.newOffice);

  const cityList = cities
    .map(CitySelectOptions)
    .concat([{ label: "", value: null }]);
  const municipalityList = municipalities
    .map(MunicipalitySelectOptions)
    .concat([{ label: "", value: null }]);

  return (
    <AdminLayout title="Añadir oficina">
      <Grid container columnSpacing={2}>
        <Grid item xs={4}>
          <SearchInput
            AutocompleteProps={{
              options: cityList,
              onInputChange: (_, value, reason) =>
                reason === "input"
                  ? creator.searchCity(value)
                  : creator.clearSearch(),

              onChange: (e, { value, label }) =>
                creator.setState({
                  cityId: value,
                  searchCity: label,
                }),
              value: {
                value: cityId,
                label: searchCity,
              },
            }}
            TextFieldProps={{ label: "Ciudad" }}
          />
        </Grid>
        <Grid item xs={4}>
          <SearchInput
            AutocompleteProps={{
              options: municipalityList,
              onInputChange: (_, value, reason) =>
                reason === "input"
                  ? creator.searchMunicipality(value)
                  : creator.clearMunicipalitySerch(),
              onChange: (e, { value, label }) =>
                creator.setState({
                  municipalityId: value,
                  searchMunicipality: label,
                }),
              value: {
                value: municipalityId,
                label: searchMunicipality,
              },
            }}
            TextFieldProps={{ label: "Elige municipio" }}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};
