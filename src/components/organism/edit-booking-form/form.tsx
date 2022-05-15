import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";
import { FC } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { useRentCarService } from "../../../service/rent-car/application";
import { HoursOptions } from "../../../service/rent-car/application/model/HoursOptions";
import { useStore } from "../../../store";
import { SearchInput } from "../../molecules/search";
import { SelectInput } from "../../molecules/select-input";
import { Form } from "../form";

export const EditBookingForm: FC = () => {
  const theme = useTheme();
  const {
    editor,
    mappers: { SelectedOfficeOption },
  } = useRentCarService();

  const { startDate } = useStore((state) => state.rentConfirmData);

  const {
    destinyOffice,
    endDate,
    endHour,
    validation,
    destinyOffices,
    searchDestinyOffice,
  } = useStore((state) => state.editRentData);

  const destinies = destinyOffices
    .map(SelectedOfficeOption)
    .concat({ label: "", value: null });

  return (
    <Form paperProps={{ elevation: 0 }} showActions={false}>
      <Grid container>
        <Grid item xs={12}>
          <SearchInput
            AutocompleteProps={{
              noOptionsText: "Sin coincidencias",
              sx: { p: 1 },
              options: destinies,
              onInputChange: (_, value, reason) => {
                if (reason === "input") {
                  editor.onSearchDestiny(value);
                }

                if (reason === "clear") {
                  editor.setState({
                    destinyOffices: [],
                    searchDestinyOffice: "",
                  });
                }
              },

              onChange: (e, opt) =>
                opt &&
                editor.setState({
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
        <Grid item xs={12} sm={12} md={6}>
          <Box pl={1} display="flex" flexDirection={"column"}>
            <FormLabel>Fecha de devolución</FormLabel>
            <DatePicker
              value={endDate && moment(endDate).toDate()}
              minDate={
                startDate ? moment(startDate).add(1, "day").toDate() : null
              }
              onChange={(value) =>
                editor.setState({
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
              onChange={(e) => editor.setState({ endHour: e.target.value })}
              labelId="devolution-time-label"
              id="rent-time"
              label="Hora de devolución"
              items={HoursOptions}
              value={endHour}
              error={!validation.endHour.valid}
            />
          </FormControl>
        </Grid>
        {!validation.endHour.valid && (
          <Grid xs={12}>
            <Box
              sx={{ width: 1, px: 1, display: "flex", justifyContent: "end" }}
            >
              <Typography variant="body2" color={theme.palette.error.dark}>
                {validation.endHour.textError}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Form>
  );
};
