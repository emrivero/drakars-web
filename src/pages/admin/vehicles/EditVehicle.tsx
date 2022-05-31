import { Image, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Securized } from "../../../auth/securized";
import { ErrorTypography } from "../../../components/molecules/error-typography";
import { LoadingPage } from "../../../components/molecules/loading-page";
import { PrimaryTypography } from "../../../components/molecules/primary-typography";
import { SearchInput } from "../../../components/molecules/search";
import { FormSelect } from "../../../components/organism/form-select";
import { ImageGallery } from "../../../components/organism/image-gallery";
import { AdminLayout } from "../../../components/templates/admin/layout";
import { useOfficeService } from "../../../service/office/application";
import { useAdminServices } from "../../../service/user/admin/application";
import { useVehicleService } from "../../../service/vehicle/application";
import { MarkTypeOptions } from "../../../service/vehicle/application/enum/mark";
import { VehicleYearsOption } from "../../../service/vehicle/application/enum/year";
import { useStore } from "../../../store";

export const EditVehicle: FC = () => {
  const [openGallery, setOpenGallery] = useState(false);
  const { paginatorVehicleImage } = useAdminServices();
  const { updater, vehicleValidator } = useVehicleService();
  const {
    mappers: { OfficeSelectOption },
  } = useOfficeService();
  const [firstValidate, setFirstValidate] = useState(false);
  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { editVehicle } = useStore((state) => state);
  const {
    mark,
    model,
    offices,
    searchOffice,
    officeId,
    seats,
    fuel,
    transmission,
    type,
    year,
    pricePerDay,
    doors,
    image,
    id,
  } = editVehicle;

  useEffect(() => {
    paginatorVehicleImage.paginate();
    return () => {
      updater.clear();
      setFirstValidate(false);
      vehicleValidator.setValid();
    };
  }, []);

  const updateVehicle = async () => {
    setFirstValidate(true);
    const response = await updater.update();
    if (response.status < 300) {
      enqueueSnackbar("Vehículo modificado", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } else {
      enqueueSnackbar("Error de servidor", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
    vehicleValidator.setValid();
    setFirstValidate(false);
  };

  if (firstValidate) {
    vehicleValidator.validate(editVehicle);
  }

  const validation = vehicleValidator.validateInfo;

  if (!id) {
    navigation(-1);
    return <LoadingPage />;
  }

  return (
    <AdminLayout title="Editar vehículo">
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={3}>
          <Box sx={{ p: 1 }}>
            <FormLabel>
              <PrimaryTypography fontWeight={500}>
                Imagen del vehículo
              </PrimaryTypography>
            </FormLabel>
          </Box>
          <Box
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "column",
              height: "60%",
            }}
          >
            {image ? (
              <>
                <img
                  src={`${process.env.REACT_APP_API_URL}${image.url}`}
                  width={300}
                />
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => setOpenGallery(true)}
                >
                  Cambiar imagen
                </Button>
              </>
            ) : (
              <>
                <Image sx={{ width: "100%", height: "100%" }} />
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => setOpenGallery(true)}
                >
                  Elegir imagen
                </Button>
              </>
            )}
            <ErrorTypography hidden={validation.image.valid}>
              {validation.image.errorMessage}
            </ErrorTypography>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Grid container>
            <Grid item xs={4}>
              <Box sx={{ p: 1 }}>
                <FormLabel>
                  <PrimaryTypography fontWeight={500}>
                    Elija un modelo
                  </PrimaryTypography>
                </FormLabel>
              </Box>
              <Box sx={{ p: 1, flexGrow: 1 / 3 }}>
                <SearchInput
                  AutocompleteProps={{
                    noOptionsText: "Sin coincidencias",
                    options: MarkTypeOptions,
                    value: { label: mark, value: mark },
                    onChange: (e, opt) =>
                      opt &&
                      updater.setState({
                        mark: opt?.value,
                      }),
                  }}
                  TextFieldProps={{
                    label: "Marca",
                    error: !validation.mark.valid,
                  }}
                />
                <ErrorTypography hidden={validation.mark.valid}>
                  {validation.mark.errorMessage}
                </ErrorTypography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ p: 1 }}>
                <FormLabel>
                  <PrimaryTypography fontWeight={500}>
                    Nombre de modelo
                  </PrimaryTypography>
                </FormLabel>
              </Box>
              <Box sx={{ p: 1, flexGrow: 1 / 3 }}>
                <TextField
                  fullWidth
                  placeholder="Escriba el nombre de modelo del vehículo"
                  label="Modelo"
                  value={model}
                  onChange={(e) => updater.setState({ model: e.target.value })}
                  error={!validation.model.valid}
                />
                <ErrorTypography hidden={validation.model.valid}>
                  {validation.model.errorMessage}
                </ErrorTypography>
              </Box>
            </Grid>
            <Securized>
              <Grid item xs={4}>
                <Box sx={{ p: 1 }}>
                  <FormLabel>
                    <PrimaryTypography fontWeight={500}>
                      Asigne una oficina
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
                        ? updater.searchOffice(value)
                        : updater.clearSearch();
                    },

                    onChange: (e, opt) =>
                      opt &&
                      updater.setState({
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
            </Securized>
            <Grid item xs={4}>
              <Box sx={{ p: 1 }}>
                <FormLabel>
                  <PrimaryTypography fontWeight={500}>
                    Tipología de vehículo
                  </PrimaryTypography>
                </FormLabel>
              </Box>
              <Box sx={{ p: 1 }}>
                <FormSelect
                  label="Asientos"
                  labelId="seats"
                  selectInputProps={{
                    value: type,
                    onChange: (e) => updater.setState({ type: e.target.value }),
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
                    onChange: (e) => updater.setState({ year: e.target.value }),
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
                  error={!validation.pricePerDay.valid}
                  onChange={(e) =>
                    updater.setState({
                      pricePerDay: parseFloat(e.target.value),
                    })
                  }
                />
                <ErrorTypography hidden={validation.pricePerDay.valid}>
                  {validation.pricePerDay.errorMessage}
                </ErrorTypography>
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
                    onChange: (e) =>
                      updater.setState({ seats: e.target.value }),
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
                    onChange: (e) =>
                      updater.setState({ doors: e.target.value }),
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
                    onChange: (e) => updater.setState({ fuel: e.target.value }),
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
                      updater.setState({ transmission: e.target.value }),
                    items: [
                      { label: "Manual", value: "manual" },
                      { label: "Automático", value: "automatic" },
                    ],
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>
            <Button
              color="success"
              variant="contained"
              onClick={updateVehicle}
              startIcon={<Save />}
            >
              Modificar vehículo
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={openGallery}
        maxWidth={"xl"}
        PaperProps={{
          sx: {
            minWidth: "1260px",
          },
        }}
        onClose={() => setOpenGallery(false)}
      >
        <DialogTitle>Imágenes de vehículos</DialogTitle>
        <DialogContent>
          <ImageGallery
            handleCancel={() => setOpenGallery(false)}
            onConfirm={(image) => updater.setState({ image })}
          />
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};
