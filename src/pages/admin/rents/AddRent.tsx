import { Save } from "@mui/icons-material";
import { Box, Button, FormLabel, Grid, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useEffect } from "react";
import { PrimaryTypography } from "../../../components/molecules/primary-typography";
import { SearchInput } from "../../../components/molecules/search";
import { FormSelect } from "../../../components/organism/form-select";
import { AdminLayout } from "../../../components/templates/admin/layout";
import { useOfficeService } from "../../../service/office/application";
import { useVehicleService } from "../../../service/vehicle/application";
import { MarkTypeOptions } from "../../../service/vehicle/application/enum/mark";
import { VehicleYearsOption } from "../../../service/vehicle/application/enum/year";
import { useStore } from "../../../store";

export const CreateRent: FC = () => {
  const { creator } = useVehicleService();
  const {
    mappers: { OfficeSelectOption },
  } = useOfficeService();

  const { enqueueSnackbar } = useSnackbar();

  const {
    mark,
    model,
    offices,
    searchOffice,
    officeId,
    seats,
    fuel,
    transmission,
    status,
    type,
    year,
    pricePerDay,
    doors,
  } = useStore((state) => state.newVehicle);

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
    <AdminLayout title="Crear una reserva">
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={4}>
          <Box sx={{ p: 1 }}>
            <FormLabel>
              <PrimaryTypography fontWeight={500}>
                Nombre de cliente
              </PrimaryTypography>
            </FormLabel>
          </Box>
          <SearchInput
            AutocompleteProps={{
              noOptionsText: "Sin coincidencias",
              sx: { p: 1 },
              options: MarkTypeOptions,
              value: { label: mark, value: mark },
              onChange: (e, opt) =>
                opt &&
                creator.setState({
                  mark: opt?.value,
                }),
            }}
            TextFieldProps={{ label: "Marca" }}
          />
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ p: 1 }}>
            <FormLabel>
              <PrimaryTypography fontWeight={500}>
                Apellidos de cliente
              </PrimaryTypography>
            </FormLabel>
          </Box>
          <Box sx={{ p: 1, flexGrow: 1 / 3 }}>
            <TextField
              fullWidth
              placeholder="Escriba el nombre de modelo del vehículo"
              label="Modelo"
              value={model}
              onChange={(e) => creator.setState({ model: e.target.value })}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ p: 1 }}>
            <FormLabel>
              <PrimaryTypography fontWeight={500}>
                DNI de cliente
              </PrimaryTypography>
            </FormLabel>
          </Box>
          <SearchInput
            AutocompleteProps={{
              noOptionsText: "Sin coincidencias",
              sx: { p: 1 },
              options: offices.map(OfficeSelectOption),
              onInputChange: (_, value, reason) => {
                reason === "input"
                  ? creator.searchOffice(value)
                  : creator.clearSearch();
              },

              onChange: (e, opt) =>
                opt &&
                creator.setState({
                  officeId: opt?.value,
                  searchOffice: opt?.label,
                }),
              value: {
                value: officeId,
                label: searchOffice,
              },
            }}
            TextFieldProps={{ label: "Oficina" }}
          />
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ p: 1 }}>
            <FormLabel>
              <PrimaryTypography fontWeight={500}>
                Correo de cliente
              </PrimaryTypography>
            </FormLabel>
          </Box>
          <Box sx={{ p: 1 }}>
            <FormSelect
              label="Asientos"
              labelId="seats"
              selectInputProps={{
                value: type,
                onChange: (e) => creator.setState({ type: e.target.value }),
                items: [
                  { label: "Pequeño", value: "small" },
                  { label: "Mediano", value: "medium" },
                  { label: "Familiar", value: "large" },
                  { label: "Premium", value: "premium" },
                ],
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ p: 1 }}>
            <FormLabel>
              <PrimaryTypography fontWeight={500}>
                Año de fabricación
              </PrimaryTypography>
            </FormLabel>
          </Box>
          <Box sx={{ p: 1 }}>
            <FormSelect
              label="Año"
              labelId="year"
              selectInputProps={{
                value: year,
                onChange: (e) => creator.setState({ year: e.target.value }),
                items: VehicleYearsOption,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ p: 1 }}>
            <FormLabel>
              <PrimaryTypography fontWeight={500}>
                Precio por día
              </PrimaryTypography>
            </FormLabel>
          </Box>
          <Box sx={{ p: 1, flexGrow: 1 / 3 }}>
            <TextField
              type="number"
              fullWidth
              placeholder="Escriba el nombre de modelo del vehículo"
              label="Precio"
              value={pricePerDay}
              onChange={(e) =>
                creator.setState({ pricePerDay: parseFloat(e.target.value) })
              }
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ p: 1 }}>
            <FormLabel>
              <PrimaryTypography fontWeight={500}>
                Número de asientos
              </PrimaryTypography>
            </FormLabel>
          </Box>
          <Box sx={{ p: 1 }}>
            <FormSelect
              label="Asientos"
              labelId="seats"
              selectInputProps={{
                value: seats,
                onChange: (e) => creator.setState({ seats: e.target.value }),
                items: [
                  { label: "2", value: 2 },
                  { label: "4", value: 4 },
                  { label: "5", value: 5 },
                  { label: "6", value: 6 },
                ],
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ p: 1 }}>
            <FormLabel>
              <PrimaryTypography fontWeight={500}>
                Número de puertas
              </PrimaryTypography>
            </FormLabel>
          </Box>
          <Box sx={{ p: 1 }}>
            <FormSelect
              label="Puertas"
              labelId="doors"
              selectInputProps={{
                value: doors,
                onChange: (e) => creator.setState({ doors: e.target.value }),
                items: [
                  { label: "2", value: 2 },
                  { label: "3", value: 3 },
                  { label: "4", value: 4 },
                  { label: "5", value: 5 },
                ],
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ p: 1 }}>
            <FormLabel>
              <PrimaryTypography fontWeight={500}>
                Tipo de combustible
              </PrimaryTypography>
            </FormLabel>
          </Box>
          <Box sx={{ p: 1 }}>
            <FormSelect
              label="Combustible"
              labelId="fuel"
              selectInputProps={{
                value: fuel,
                onChange: (e) => creator.setState({ fuel: e.target.value }),
                items: [
                  { label: "Gasolina", value: "fuel" },
                  { label: "Diésel", value: "diesel" },
                  { label: "Eléctrico", value: "electric" },
                ],
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ p: 1 }}>
            <FormLabel>
              <PrimaryTypography fontWeight={500}>
                Tipo de transmisión
              </PrimaryTypography>
            </FormLabel>
          </Box>
          <Box sx={{ p: 1 }}>
            <FormSelect
              label="Transmisión"
              labelId="transmission"
              selectInputProps={{
                value: transmission,
                onChange: (e) =>
                  creator.setState({ transmission: e.target.value }),
                items: [
                  { label: "Manual", value: "manual" },
                  { label: "Automático", value: "automatic" },
                ],
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>
            <Button
              color="success"
              variant="contained"
              onClick={() => creator.create()}
              startIcon={<Save />}
            >
              Añadir vehículo
            </Button>
          </Box>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};
