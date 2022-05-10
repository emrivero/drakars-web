import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  SxProps,
  TextField,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [{ sameOrigin }, setState] = useState({ sameOrigin: true });
  const navigate = useNavigate();
  const {
    filterer,
    mappers: { SelectedOfficeOption },
  } = useRentCarService();

  const {
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
  } = useStore((state) => state.selectedOffice);

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

  return (
    <Form
      handleSubmit={() => navigate("/rent/search-car")}
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
            <FormControl
              fullWidth
              sx={{
                p: 2,
              }}
            >
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
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            sx={{
              pt: 2,
              pb: 2,
              pl: 2,
              pr: 1,
            }}
          >
            <TextField
              type="date"
              label="Fecha de recogida"
              onChange={({ currentTarget }) =>
                filterer.setState({ startDate: currentTarget.value })
              }
              value={startDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{
              pt: 2,
              pb: 2,
              pl: 1,
              pr: 1,
            }}
          >
            <InputLabel id="devolution-time-label">Hora de recogida</InputLabel>
            <SelectInput
              fullWidth
              onChange={(e, v) =>
                filterer.setState({ startHour: e.target.value })
              }
              labelId="devolution-time-label"
              id="rent-time"
              label="Hora de recogida"
              items={HoursOptions}
              value={startHour}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            sx={{
              pt: 2,
              pb: 2,
              pl: 2,
              pr: 1,
            }}
          >
            <TextField
              type="date"
              label="Fecha de devolución"
              onChange={(e) => filterer.setState({ endDate: e.target.value })}
              value={endDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{
              pt: 2,
              pb: 2,
              pl: 1,
              pr: 1,
            }}
          >
            <InputLabel id="devolution-time-label">Hora de recogida</InputLabel>
            <SelectInput
              onChange={(e) => filterer.setState({ endHour: e.target.value })}
              labelId="devolution-time-label"
              id="rent-time"
              label="Hora de devolución"
              items={HoursOptions}
              value={endHour}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Form>
  );
};
