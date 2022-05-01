import { amber, grey, indigo, red } from "@mui/material/colors";
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
    black: {
      main: string;
    };
  };
}

const themeClient = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      dark: grey[900],
      light: "white",
    },
    secondary: {
      main: amber[500],
      dark: "#111939",
    },
    error: {
      main: red.A400,
    },
  },
});

const themeAdmin = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      dark: grey[900],
    },
    secondary: {
      main: amber[500],
      dark: "#111939",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiAccordionSummary: {
      styleOverrides: {
        expandIconWrapper: {
          color: grey[400],
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "#111939",
          color: grey[400],
        },
      },
    },
  },
});

export default { themeClient, themeAdmin };
