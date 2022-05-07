import { Save } from "@mui/icons-material";
import { Box, Button, FormLabel, Grid, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useEffect } from "react";
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

  const { enqueueSnackbar } = useSnackbar();

  const {
    cities,
    municipalities,
    cityId,
    municipalityId,
    searchCity,
    searchMunicipality,
    zipCode,
    address,
    name,
    status,
  } = useStore((state) => state.newOffice);

  const cityList = cities
    .map(CitySelectOptions)
    .concat([{ label: "", value: null }]);
  const municipalityList = municipalities
    .map(MunicipalitySelectOptions)
    .concat([{ label: "", value: null }]);

  useEffect(() => {
    if (status === "success") {
      enqueueSnackbar("Oficina creada", {
        variant: status,
        autoHideDuration: 2000,
      });
    }

    if (status === "error") {
      enqueueSnackbar("Error de servidor", {
        variant: status,
        autoHideDuration: 2000,
      });
    }
  }, [status]);

  return (
    <AdminLayout title="Añadir oficina">
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={4}>
          <Box sx={{ p: 1 }}>
            <FormLabel>Busque una ciudad</FormLabel>
          </Box>
          <SearchInput
            AutocompleteProps={{
              sx: { p: 1 },
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
          <Box sx={{ p: 1 }}>
            <FormLabel>Busque un municipio</FormLabel>
          </Box>
          <SearchInput
            AutocompleteProps={{
              sx: { p: 1 },
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
        <Grid item xs={4} />
        <Grid item xs={12}>
          <Box sx={{ p: 1 }}>
            <FormLabel>Información general</FormLabel>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ p: 1, flexGrow: 1 / 3 }}>
              <TextField
                fullWidth
                placeholder="Escriba el nombre de la oficina"
                label="Nombre"
                value={name}
                onChange={(e) => creator.setState({ name: e.target.value })}
              />
            </Box>
            <Box sx={{ p: 1, flexGrow: 2 / 3 }}>
              <TextField
                fullWidth
                placeholder="Escriba la dirección de la oficina"
                label="Dirección"
                value={address}
                onChange={(e) => creator.setState({ address: e.target.value })}
              />
            </Box>
            <Box sx={{ p: 1, flexGrow: 1 / 3 }}>
              <TextField
                fullWidth
                placeholder="Escriba código postal de la oficina"
                label="Código postal"
                value={zipCode}
                onChange={(e) => creator.setState({ zipCode: e.target.value })}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ p: 1 }}>
            <FormLabel>Añada el horario de la oficina</FormLabel>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ p: 1, flexGrow: 1 / 2 }}>
              <TextField
                fullWidth
                type="time"
                label="Hora de apertura"
                value={""}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box sx={{ p: 1, flexGrow: 1 / 2 }}>
              <TextField
                fullWidth
                type="time"
                label="Hora de cierre"
                value={""}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={12}>
          <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>
            <Button
              color="success"
              variant="contained"
              onClick={() => creator.create()}
              startIcon={<Save />}
            >
              Añadir oficina
            </Button>
          </Box>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};
