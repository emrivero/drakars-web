import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../routes/routes";
import { useRentCarService } from "../../../service/rent-car/application";
import { HoursOptions } from "../../../service/rent-car/application/model/HoursOptions";
import { useStore } from "../../../store";
import { PrimaryTypography } from "../../molecules/primary-typography";
import { SearchInput } from "../../molecules/search";
import { SelectInput } from "../../molecules/select-input";
import { Form } from "../form";

export interface FilterProps {
  sx?: SxProps;
  showTitle?: boolean;
}

export const Filter: FC<FilterProps> = ({ sx = {}, showTitle = true }) => {
  const theme = useTheme();
  const [{ sameOrigin }, setState] = useState({ sameOrigin: true });
  const navigate = useNavigate();
  const {
    filterer,
    mappers: { SelectedOfficeOption },
  } = useRentCarService();

  const {
    rentValidation,
    originOffices,
    originOffice,
    destinyOffices,
    destinyOffice,
    searchDestinyOffice,
    searchOriginOffice,
    endDate,
    startDate,
    startHour,
    endHour,
  } = useStore((state) => ({
    ...state.rentData.selectedOffice,
    rentValidation: state.rentData.rentValidation,
  }));

  const origins = originOffices
    .map(SelectedOfficeOption)
    .concat({ label: "", value: null });
  const destinies = destinyOffices
    .map(SelectedOfficeOption)
    .concat({ label: "", value: null });

  useEffect(() => {
    filterer.clear();
  }, []);

  useEffect(() => {
    filterer.setState({
      destinyOffice: null,
      searchDestinyOffice: "",
      destinyOffices: [],
    });
  }, [sameOrigin]);

  const active =
    rentValidation.endHour.valid &&
    rentValidation.startHour.valid &&
    !!originOffice &&
    (sameOrigin ? true : !!destinyOffice);

  return (
    <Form
      disabledSubmit={!active}
      handleSubmit={() => navigate(Routes.SEARCH_CAR_PAGE)}
      saveContent="Buscar"
      sx={sx}
    >
      <Grid container>
        {showTitle && (
          <Grid item xs={12}>
            <Box sx={{ pt: 1, pb: 1, pl: 2 }}>
              <PrimaryTypography variant="h6">
                Encuentra lo que buscas
              </PrimaryTypography>
            </Box>
          </Grid>
        )}
        <Grid item xs={12}>
          <SearchInput
            AutocompleteProps={{
              noOptionsText: "Sin coincidencias",
              sx: { p: 1 },
              options: origins,
              onInputChange: (_, value, reason) => {
                reason === "input"
                  ? filterer.onSearchOrigin(value)
                  : filterer.setState({
                      originOffices: [],
                      searchOriginOffice: "",
                      originOffice: null,
                    });
              },
              onChange: (e, opt) =>
                opt &&
                filterer.setState({
                  originOffice: opt?.value,
                  searchOriginOffice: opt?.label,
                }),
              value: {
                value: originOffice,
                label: searchOriginOffice,
              },
            }}
            TextFieldProps={{
              label: "Origen",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            sx={{
              pl: 2,
            }}
            label="Devolver el coche en la misma oficina"
            control={
              <Checkbox
                checked={sameOrigin}
                onChange={() => setState({ sameOrigin: !sameOrigin })}
              />
            }
          />
        </Grid>
        {!sameOrigin && (
          <Grid item xs={12}>
            <SearchInput
              AutocompleteProps={{
                noOptionsText: "Sin coincidencias",
                sx: { p: 1 },
                options: destinies,
                onInputChange: (_, value, reason) => {
                  reason === "input"
                    ? filterer.onSearchDestiny(value)
                    : filterer.setState({
                        destinyOffices: [],
                        searchDestinyOffice: "",
                      });
                },

                onChange: (e, opt) =>
                  opt &&
                  filterer.setState({
                    destinyOffice: opt?.value,
                    searchDestinyOffice: opt?.label,
                  }),
                value: {
                  value: destinyOffice,
                  label: searchDestinyOffice,
                },
              }}
              TextFieldProps={{
                label: "Destino",
                placeholder: "Busca una oficina de destino",
              }}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={6}>
          <Box pl={1} display="flex" flexDirection={"column"}>
            <FormLabel>Fecha de recogida</FormLabel>
            <DatePicker
              value={startDate && moment(startDate).toDate()}
              minDate={moment().toDate()}
              maxDate={
                endDate ? moment(endDate).subtract(1, "day").toDate() : null
              }
              onChange={(value) =>
                filterer.setState({
                  startDate: value ? moment(value).format("YYYY-MM-DD") : null,
                })
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{
              mt: { md: 0.8, xs: 4 },
              pt: 2,
              pb: 2,
              pl: 1,
              pr: 1,
            }}
          >
            <InputLabel id="devolution-time-label">Hora de recogida</InputLabel>
            <SelectInput
              fullWidth
              onChange={(e) => filterer.setState({ startHour: e.target.value })}
              labelId="devolution-time-label"
              id="rent-time"
              label="Hora de recogida"
              items={HoursOptions}
              value={startHour}
              error={!rentValidation.startHour.valid}
            />
          </FormControl>
        </Grid>
        {!rentValidation.startHour.valid && (
          <Grid xs={12}>
            <Box
              sx={{ width: 1, px: 1, display: "flex", justifyContent: "end" }}
            >
              <Typography variant="body2" color={theme.palette.error.dark}>
                Fuera de horario de oficina
              </Typography>
            </Box>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={6}>
          <Box pl={1} display="flex" flexDirection={"column"}>
            <FormLabel>Fecha de devolución</FormLabel>
            <DatePicker
              value={endDate && moment(endDate).toDate()}
              minDate={
                startDate ? moment(startDate).add(1, "day").toDate() : null
              }
              onChange={(value) =>
                filterer.setState({
                  endDate: value ? moment(value).format("YYYY-MM-DD") : null,
                })
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{
              mt: { md: 0.8, xs: 4 },
              py: 2,
              px: 1,
            }}
          >
            <InputLabel id="devolution-time-label">
              Hora de devolución
            </InputLabel>
            <SelectInput
              onChange={(e) => filterer.setState({ endHour: e.target.value })}
              labelId="devolution-time-label"
              id="rent-time"
              label="Hora de devolución"
              items={HoursOptions}
              value={endHour}
              error={!rentValidation.endHour.valid}
            />
          </FormControl>
        </Grid>
        {!rentValidation.endHour.valid && (
          <Grid xs={12}>
            <Box
              sx={{ width: 1, px: 1, display: "flex", justifyContent: "end" }}
            >
              <Typography variant="body2" color={theme.palette.error.dark}>
                Fuera de horario de oficina
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Form>
  );
};
