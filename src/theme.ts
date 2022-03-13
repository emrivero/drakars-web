import { deepPurple, green, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export interface Theme {
  palette: {
    primary: {
      main: string;
    };
    secondary: {
      main: string;
    };
    error: {
      main: string;
    };
  };
}

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple.A400,
    },
    secondary: {
      main: green[300],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
