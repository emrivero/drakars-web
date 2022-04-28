import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { FC } from "react";
import { PrimaryTypography } from "../../molecules/primary-typography";
import { SelectInput } from "../../molecules/select-input";
import { Form } from "../form";

export const Filter: FC = () => {
  return (
    <Form handleSubmit={() => null} saveContent="Buscar">
      <Box sx={{ pt: 1, pb: 1, pl: 2 }}>
        <PrimaryTypography variant="h6">
          Encuentra lo que buscas
        </PrimaryTypography>
      </Box>
      <FormControl
        fullWidth
        sx={{
          p: 2,
        }}
      >
        <Autocomplete
          fullWidth
          freeSolo
          id="select-origin-office"
          disableClearable
          options={[{ label: "Oficina 1" }, { label: "Oficina 2" }]}
          renderInput={(params) => (
            <TextField
              fullWidth
              {...params}
              placeholder="Introduce lugar de recogida"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </FormControl>
      <FormControl
        fullWidth
        sx={{
          p: 2,
        }}
      >
        <Autocomplete
          fullWidth
          freeSolo
          id="select-origin-office"
          disableClearable
          options={[{ label: "Oficina 1" }, { label: "Oficina 2" }]}
          renderInput={(params) => (
            <TextField
              fullWidth
              {...params}
              placeholder="Introduce lugar de devolución"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </FormControl>
      <FormControl
        sx={{
          pt: 2,
          pb: 2,
          pl: 2,
          pr: 1,
          w: "50%",
        }}
      >
        <TextField
          fullWidth
          type="date"
          label="Fecha de recogida"
          value={null}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
      <FormControl
        variant="outlined"
        sx={{
          pt: 2,
          pb: 2,
          pl: 1,
          pr: 1,
          width: "45%",
        }}
      >
        <InputLabel id="devolution-time-label">Hora de recogida</InputLabel>
        <SelectInput
          fullWidth
          labelId="devolution-time-label"
          id="rent-time"
          label="Hora de recogida"
          items={[
            { label: "10:00", value: "10:00", key: "1" },
            { label: "10:30", value: "10:30", key: "2" },
          ]}
          value="10:30"
        />
      </FormControl>
      <FormControl
        sx={{
          pt: 2,
          pb: 2,
          pl: 2,
          pr: 1,
          w: "50%",
        }}
      >
        <TextField
          fullWidth
          type="date"
          label="Fecha de devolución"
          value={null}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
      <FormControl
        sx={{
          pt: 2,
          pb: 2,
          pl: 1,
          pr: 1,
          width: "45%",
        }}
      >
        <InputLabel id="rent-time-label">Hora de recogida</InputLabel>
        <SelectInput
          fullWidth
          labelId="rent-time-label"
          id="rent-time"
          label="Hora de devolución"
          items={[
            { label: "10:00", value: "10:00", key: "1" },
            { label: "10:30", value: "10:30", key: "2" },
          ]}
          value="10:30"
        />
      </FormControl>
    </Form>
  );
};
