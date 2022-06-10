import { Search } from "@mui/icons-material";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC, useState } from "react";
import { FilterService } from "../../../service/base/application/FilterService";
import { FilterVehicle } from "../../../service/vehicle/application/model/filter-vehicle";
import { FilterIcon } from "../../atoms/filter-icon";
import { CustomTypography } from "../../molecules/custom-typography";

export interface CarFilterProps {
  sx?: SxProps;
  filter: FilterVehicle;
  paginator?: FilterService<FilterVehicle>;
}

export type SelectVehicleTypeEvent = SelectChangeEvent<
  "" | "small" | "medium" | "large" | "premium"
>;

export const CarFilter: FC<CarFilterProps> = ({
  sx = {},
  filter,
  paginator,
}) => {
  const { search, type, seats, fuel, sort, transmission } = filter;
  const theme = useTheme();
  const [isVisible, setVisibility] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid container alignItems={"center"} sx={sx}>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Box
          sx={{
            width: { sm: "70%", xs: "90%" },
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <TextField
            onChange={(e) => paginator.onFilter({ search: e.target.value })}
            value={search}
            sx={{ flexGrow: 0.9 }}
            placeholder="Introduce marca o modelo de vehículo"
            InputProps={{
              type: "search",
              endAdornment: <Search />,
            }}
          />
          <Box display={{ xs: "none", md: "block" }}>
            <IconButton
              size="large"
              sx={{ border: "2px solid #efefef" }}
              onClick={() => setVisibility(!isVisible)}
            >
              <FilterIcon fontSize="medium" color="primary" />
            </IconButton>
          </Box>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        md={2}
        sx={{
          mt: 4,
          visibility: isVisible || matches ? "visible" : "hidden",
          opacity: isVisible || matches ? 1 : 0,
          transition: "visibility 0.5s, opacity 0.5s ease-out",
        }}
      >
        <FormControl sx={{ px: 0.5, width: "100%" }} variant="filled">
          <InputLabel id="type-filter">
            <CustomTypography color={theme.palette.primary.main}>
              Tipo
            </CustomTypography>
          </InputLabel>
          <Select
            fullWidth
            onChange={(e: SelectChangeEvent) => {
              const value = e.target.value as
                | ""
                | "small"
                | "medium"
                | "large"
                | "premium";
              paginator.onFilter({ type: value });
            }}
            labelId="type-filter"
            value={type}
            label="Type"
          >
            <MenuItem value={""}>Cualquiera</MenuItem>
            <MenuItem value={"small"}>Pequeño</MenuItem>
            <MenuItem value={"medium"}>Mediano</MenuItem>
            <MenuItem value={"large"}>Familiar</MenuItem>
            <MenuItem value={"premium"}>Premium</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={2}
        sx={{
          mt: 4,
          visibility: isVisible || matches ? "visible" : "hidden",
          opacity: isVisible || matches ? 1 : 0,
          transition: "visibility 0.5s, opacity 0.5s ease-out",
        }}
      >
        <FormControl variant="filled" sx={{ width: "100%", px: 0.5 }}>
          <InputLabel id="seats-filter">
            <CustomTypography color={theme.palette.primary.main}>
              Asientos
            </CustomTypography>
          </InputLabel>
          <Select
            onChange={(e: SelectChangeEvent) => {
              const value = e.target.value as "" | "2" | "4" | "5" | "6";
              paginator.onFilter({ seats: value });
            }}
            labelId="seats-filter"
            value={seats}
            label="Seats"
          >
            <MenuItem value={""}>Cualquiera</MenuItem>
            <MenuItem value={2}>2 o más</MenuItem>
            <MenuItem value={4}>4 o más</MenuItem>
            <MenuItem value={5}>5 o más</MenuItem>
            <MenuItem value={6}>6 o más</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={2}
        sx={{
          mt: 4,
          visibility: isVisible || matches ? "visible" : "hidden",
          opacity: isVisible || matches ? 1 : 0,
          transition: "visibility 0.5s, opacity 0.5s ease-out",
        }}
      >
        <FormControl variant="filled" sx={{ width: "100%", px: 0.5 }}>
          <InputLabel id="seats-filter">
            <CustomTypography color={theme.palette.primary.main}>
              Combustible
            </CustomTypography>
          </InputLabel>
          <Select
            labelId="seats-filter"
            value={fuel}
            label="Seats"
            onChange={(e: SelectChangeEvent) => {
              const value = e.target.value as
                | ""
                | "fuel"
                | "diesel"
                | "electric";
              paginator.onFilter({ fuel: value });
            }}
          >
            <MenuItem value={""}>Cualquiera</MenuItem>
            <MenuItem value={"fuel"}>Gasolina</MenuItem>
            <MenuItem value={"diesel"}>Diesel</MenuItem>
            <MenuItem value={"electric"}>Electrico</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={3}
        sx={{
          mt: 4,
          visibility: isVisible || matches ? "visible" : "hidden",
          opacity: isVisible || matches ? 1 : 0,
          transition: "visibility 0.5s, opacity 0.5s ease-out",
        }}
      >
        <FormControl variant="filled" sx={{ width: "100%", px: 0.5 }}>
          <InputLabel id="order-filter">
            <CustomTypography color={theme.palette.primary.main}>
              Orden
            </CustomTypography>
          </InputLabel>
          <Select
            onChange={(e: SelectChangeEvent) => {
              const value = e.target.value as "better" | "cheap" | "expensive";
              paginator.onFilter({ sort: value });
            }}
            labelId="order-filter"
            value={sort}
            label="order"
          >
            <MenuItem value={"cheap"}>Precio más bajo</MenuItem>
            <MenuItem value={"expensive"}>Precio más alto</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={3}
        sx={{
          mt: 4,
          visibility: isVisible || matches ? "visible" : "hidden",
          opacity: isVisible || matches ? 1 : 0,
          transition: "visibility 0.5s, opacity 0.5s ease-out",
        }}
      >
        <FormControl variant="filled" sx={{ width: "100%", px: 0.5 }}>
          <InputLabel id="marchas-filter">
            <CustomTypography color={theme.palette.primary.main}>
              Marchas
            </CustomTypography>
          </InputLabel>
          <Select
            labelId="marchas-filter"
            value={transmission}
            label="Marchas"
            onChange={(e: SelectChangeEvent) => {
              const value = e.target.value as "" | "manual" | "automatic";
              paginator.onFilter({ transmission: value });
            }}
          >
            <MenuItem value={""}>Cualquiera</MenuItem>
            <MenuItem value={"manual"}>Manual</MenuItem>
            <MenuItem value={"automatic"}>Automático</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};
