import { Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useEffect } from "react";
import { PrimaryTypography } from "../../../components/molecules/primary-typography";
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
    morningOpeningTime,
    morningClosingTime,
    eveningOpeningTime,
    eveningClosingTime,
    eveningTime,
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
            <FormLabel>
              <PrimaryTypography fontWeight={500}>
                Busque una ciudad
              </PrimaryTypography>
            </FormLabel>
          </Box>
          <SearchInput
            AutocompleteProps={{
              noOptionsText: "Sin coincidencias",
              sx: { p: 1 },
              options: cityList,
              onInputChange: (_, value, reason) => {
                reason === "input"
                  ? creator.searchCity(value)
                  : creator.clearSearch();
              },

              onChange: (e, opt) =>
                opt &&
                creator.setState({
                  cityId: opt?.value,
                  searchCity: opt?.label,
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
            <FormLabel>
              <PrimaryTypography fontWeight={500}>
                Busque un municipio
              </PrimaryTypography>
            </FormLabel>
          </Box>
          <SearchInput
            AutocompleteProps={{
              noOptionsText: "Sin coincidencias",
              sx: { p: 1 },
              options: municipalityList,
              onInputChange: (_, value, reason) =>
                reason === "input"
                  ? creator.searchMunicipality(value)
                  : creator.clearMunicipalitySerch(),
              onChange: (e, opt) =>
                creator.setState({
                  municipalityId: opt?.value,
                  searchMunicipality: opt?.label,
                }),
              value: {
                value: municipalityId,
                label: searchMunicipality,
              },
              disabled: !cityId,
            }}
            TextFieldProps={{ label: "Elige municipio" }}
          />
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={12}>
          <Box sx={{ p: 1 }}>
            <FormLabel>
              <PrimaryTypography fontWeight={500}>
                Información general
              </PrimaryTypography>
            </FormLabel>
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
        <Grid item xs={6}>
          <Box sx={{ p: 1 }}>
            <FormLabel>
              <PrimaryTypography fontWeight={500}>
                Horario de mañana
              </PrimaryTypography>
            </FormLabel>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ p: 1, flexGrow: 1 / 3 }}>
              <TextField
                fullWidth
                onChange={(e) =>
                  creator.setState({ morningOpeningTime: e.target.value })
                }
                type="time"
                label="Hora de apertura"
                value={morningOpeningTime}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
              />
            </Box>
            <Box sx={{ p: 1, flexGrow: 1 / 3 }}>
              <TextField
                fullWidth
                onChange={(e) =>
                  creator.setState({ morningClosingTime: e.target.value })
                }
                type="time"
                label="Hora de cierre"
                value={morningClosingTime}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
              />
            </Box>
            <Box sx={{ p: 1, flexGrow: 1 / 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={eveningTime}
                    onChange={(e) =>
                      creator.setState({ eveningTime: e.target.checked })
                    }
                  />
                }
                label="Añadir horario de tarde"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={4}>
          <Box sx={{ p: 1 }}>
            <FormLabel>
              <PrimaryTypography fontWeight={500}>
                Horario de tarde
              </PrimaryTypography>
            </FormLabel>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ p: 1, flexGrow: 1 / 2 }}>
              <TextField
                fullWidth
                onChange={(e) =>
                  creator.setState({ eveningOpeningTime: e.target.value })
                }
                type="time"
                value={eveningOpeningTime}
                label="Hora de apertura"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
              />
            </Box>
            <Box sx={{ p: 1, flexGrow: 1 / 2 }}>
              <TextField
                fullWidth
                onChange={(e) =>
                  creator.setState({ eveningClosingTime: e.target.value })
                }
                type="time"
                label="Hora de cierre"
                value={eveningClosingTime}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
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
