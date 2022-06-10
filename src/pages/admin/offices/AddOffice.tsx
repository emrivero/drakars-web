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
import { FC, useEffect, useState } from "react";
import { ErrorTypography } from "../../../components/molecules/error-typography";
import { PrimaryTypography } from "../../../components/molecules/primary-typography";
import { SearchInput } from "../../../components/molecules/search";
import { AdminLayout } from "../../../components/templates/admin/layout";
import { useCityService } from "../../../service/city/application";
import { useMunicipalityService } from "../../../service/municipality/application";
import { useOfficeService } from "../../../service/office/application";
import { useStore } from "../../../store";

export const AddOffice: FC = () => {
  const { creator, validator } = useOfficeService();
  const {
    mappers: { CitySelectOptions },
  } = useCityService();
  const {
    mappers: { MunicipalitySelectOptions },
  } = useMunicipalityService();
  const [firstValidate, setFirstValidate] = useState(false);

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
    morningOpeningTime,
    morningClosingTime,
    eveningOpeningTime,
    eveningClosingTime,
    eveningTime,
    phone,
  } = useStore((state) => state.newOffice);
  const { newOffice } = useStore();

  const cityList = cities
    .map(CitySelectOptions)
    .concat([{ label: "", value: null }]);
  const municipalityList = municipalities
    .map(MunicipalitySelectOptions)
    .concat([{ label: "", value: null }]);

  useEffect(() => {
    return () => {
      creator.clear();
      setFirstValidate(false);
      validator.setValid();
    };
  }, []);

  useEffect(() => {
    if (!eveningTime) {
      creator.setState({
        eveningClosingTime: "",
        eveningOpeningTime: "",
      });
    }
  }, [eveningTime]);

  const createOffice = async () => {
    setFirstValidate(true);
    if (eveningTime && !eveningClosingTime && !eveningOpeningTime) {
      enqueueSnackbar("Datos inválidos", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }
    const response = await creator.create();
    if (response.status < 300) {
      creator.clear();
      enqueueSnackbar("Oficina creada", {
        variant: "success",
        autoHideDuration: 2000,
      });
      validator.setValid();
      setFirstValidate(false);
    } else {
      enqueueSnackbar("Datos inválidos", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  if (firstValidate) {
    validator.validate(newOffice);
  }

  const validation = validator.validateInfo;

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
            TextFieldProps={{
              label: "Ciudad",
              error: !validation.cityId.valid,
            }}
          />
          <Box sx={{ pl: 1 }}>
            <ErrorTypography hidden={validation.cityId.valid}>
              {validation.cityId.errorMessage}
            </ErrorTypography>
          </Box>
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
            TextFieldProps={{
              label: "Elige municipio",
              error: !validation.municipalityId.valid,
            }}
          />
          <Box sx={{ pl: 1 }}>
            <ErrorTypography hidden={validation.municipalityId.valid}>
              {validation.municipalityId.errorMessage}
            </ErrorTypography>
          </Box>
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
            <Box sx={{ p: 1, flexGrow: 1 / 4 }}>
              <TextField
                fullWidth
                placeholder="Escriba el nombre de la oficina"
                label="Nombre"
                value={name}
                onChange={(e) => creator.setState({ name: e.target.value })}
                error={!validation.name.valid}
              />
              <ErrorTypography hidden={validation.name.valid}>
                {validation.name.errorMessage}
              </ErrorTypography>
            </Box>
            <Box sx={{ p: 1, flexGrow: 1 / 2 }}>
              <TextField
                fullWidth
                placeholder="Escriba la dirección de la oficina"
                label="Dirección"
                value={address}
                onChange={(e) => creator.setState({ address: e.target.value })}
                error={!validation.address.valid}
              />
              <ErrorTypography hidden={validation.address.valid}>
                {validation.address.errorMessage}
              </ErrorTypography>
            </Box>
            <Box sx={{ p: 1, flexGrow: 1 / 4 }}>
              <TextField
                fullWidth
                placeholder="Escriba código postal de la oficina"
                label="Código postal"
                value={zipCode}
                error={!validation.zipCode.valid}
                onChange={(e) => creator.setState({ zipCode: e.target.value })}
              />
              <ErrorTypography hidden={validation.zipCode.valid}>
                {validation.zipCode.errorMessage}
              </ErrorTypography>
            </Box>
            <Box sx={{ p: 1, flexGrow: 1 / 4 }}>
              <TextField
                fullWidth
                placeholder="Escriba teléfono de la oficina"
                label="Teléfono"
                value={phone}
                error={!validation.phone.valid}
                onChange={(e) => creator.setState({ phone: e.target.value })}
              />
              <ErrorTypography hidden={validation.phone.valid}>
                {validation.phone.errorMessage}
              </ErrorTypography>
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
                error={!validation.morningOpeningTime.valid}
              />
              <ErrorTypography hidden={validation.morningOpeningTime.valid}>
                {validation.morningOpeningTime.errorMessage}
              </ErrorTypography>
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
                error={!validation.morningClosingTime.valid}
              />
              <ErrorTypography hidden={validation.morningClosingTime.valid}>
                {validation.morningClosingTime.errorMessage}
              </ErrorTypography>
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
        {eveningTime && (
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
                  error={!validation.eveningOpeningTime.valid}
                />
                <ErrorTypography hidden={validation.eveningOpeningTime.valid}>
                  {validation.eveningOpeningTime.errorMessage}
                </ErrorTypography>
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
                  error={!validation.eveningClosingTime.valid}
                />
                <ErrorTypography hidden={validation.eveningClosingTime.valid}>
                  {validation.eveningClosingTime.errorMessage}
                </ErrorTypography>
              </Box>
            </Box>
          </Grid>
        )}
        <Grid item xs={8} />
        <Grid item xs={12}>
          <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>
            <Button
              color="success"
              variant="contained"
              onClick={createOffice}
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
