import { Search } from "@mui/icons-material";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  TextField,
  useTheme,
} from "@mui/material";
import { FC, useState } from "react";
import { FilterIcon } from "../../atoms/filter-icon";
import { CustomTypography } from "../../molecules/custom-typography";

export interface CarFilterProps {
  sx?: SxProps;
}

export const CarFilter: FC<CarFilterProps> = ({ sx = {} }) => {
  const theme = useTheme();
  const [isVisible, setVisibility] = useState(false);
  return (
    <Grid container alignItems={"center"} sx={sx}>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Box
          sx={{ width: "70%", display: "flex", justifyContent: "space-around" }}
        >
          <TextField
            sx={{ flexGrow: 0.9 }}
            placeholder="Introduce marca o modelo de vehículo"
            InputProps={{
              type: "search",
              endAdornment: <Search />,
            }}
          />
          <IconButton
            size="large"
            sx={{ border: "2px solid #efefef" }}
            onClick={() => setVisibility(!isVisible)}
          >
            <FilterIcon fontSize="medium" color="primary" />
          </IconButton>
        </Box>
      </Grid>

      <Grid
        xs={12}
        sx={{
          mt: 4,
          visibility: isVisible ? "visible" : "hidden",
          opacity: isVisible ? 1 : 0,
          transition: "visibility 0.5s, opacity 0.5s ease-in",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <FormControl sx={{ flexGrow: 1 / 2, px: 0.5 }} variant="filled">
            <InputLabel id="type-filter">
              <CustomTypography color={theme.palette.primary.main}>
                Tipo
              </CustomTypography>
            </InputLabel>
            <Select
              labelId="type-filter"
              value={"any"}
              label="Type"
              onChange={() => null}
            >
              <MenuItem value={"any"}>Cualquiera</MenuItem>
              <MenuItem value={"small"}>Pequeño</MenuItem>
              <MenuItem value={"medium"}>Mediano</MenuItem>
              <MenuItem value={"familiar"}>Familiar</MenuItem>
              <MenuItem value={"premium"}>Premium</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ flexGrow: 1 / 2, px: 0.5 }}>
            <InputLabel id="seats-filter">
              <CustomTypography color={theme.palette.primary.main}>
                Asientos
              </CustomTypography>
            </InputLabel>
            <Select
              labelId="seats-filter"
              value={"any"}
              label="Seats"
              onChange={() => null}
            >
              <MenuItem value={"any"}>Cualquiera</MenuItem>
              <MenuItem value={"small"}>2 o más</MenuItem>
              <MenuItem value={"medium"}>4 o más</MenuItem>
              <MenuItem value={"familiar"}>5 o más</MenuItem>
              <MenuItem value={"premium"}>6 o más</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ flexGrow: 1 / 2, px: 0.5 }}>
            <InputLabel id="seats-filter">
              <CustomTypography color={theme.palette.primary.main}>
                Combustible
              </CustomTypography>
            </InputLabel>
            <Select
              labelId="seats-filter"
              value={"any"}
              label="Seats"
              onChange={() => null}
            >
              <MenuItem value={"any"}>Cualquiera</MenuItem>
              <MenuItem value={"small"}>Gasolina</MenuItem>
              <MenuItem value={"medium"}>Diesel</MenuItem>
              <MenuItem value={"familiar"}>Electrico</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ flexGrow: 1 / 2, px: 0.5 }}>
            <InputLabel id="seats-filter">
              <CustomTypography color={theme.palette.primary.main}>
                Orden
              </CustomTypography>
            </InputLabel>
            <Select
              labelId="seats-filter"
              value={"better"}
              label="Seats"
              onChange={() => null}
            >
              <MenuItem value={"small"}>Precio más bajo</MenuItem>
              <MenuItem value={"medium"}>Precio más alto</MenuItem>
              <MenuItem value={"better"}>Mejor valorados</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ flexGrow: 1 / 2, px: 0.5 }}>
            <InputLabel id="marchas-filter">
              <CustomTypography color={theme.palette.primary.main}>
                Marchas
              </CustomTypography>
            </InputLabel>
            <Select
              labelId="marchas-filter"
              value={"any"}
              label="Marchas"
              onChange={() => null}
            >
              <MenuItem value={"any"}>Cualquiera</MenuItem>
              <MenuItem value={"medium"}>Manual</MenuItem>
              <MenuItem value={"better"}>Automático</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
};
