import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  SxProps,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryTypography } from "../../molecules/primary-typography";
import { SelectInput } from "../../molecules/select-input";
import { Form } from "../form";

export interface FilterProps {
  sx?: SxProps;
  showTitle?: boolean;
}

export const Filter: FC<FilterProps> = ({ sx = {}, showTitle = true }) => {
  const [{ sameOrigin }, setState] = useState({ sameOrigin: true });
  const navigate = useNavigate();
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
              value={""}
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
              value={""}
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
              labelId="devolution-time-label"
              id="rent-time"
              label="Hora de devolución"
              items={[
                { label: "10:00", value: "10:00", key: "1" },
                { label: "10:30", value: "10:30", key: "2" },
              ]}
              value="10:30"
            />
          </FormControl>
        </Grid>
      </Grid>
    </Form>
  );
};
