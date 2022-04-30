import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import { PrimaryTypography } from "../../molecules/primary-typography";
import { SelectInput } from "../../molecules/select-input";
import { Form } from "../form";

export const Filter: FC = () => {
  const [{ sameOrigin }, setState] = useState({ sameOrigin: true });
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
      {!sameOrigin && (
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
                placeholder="Introduce lugar de entrega"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </FormControl>
      )}
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
          value={""}
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
          label="Fecha de entrega"
          value={""}
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
        <InputLabel id="rent-time-label">Hora de entrega</InputLabel>
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
