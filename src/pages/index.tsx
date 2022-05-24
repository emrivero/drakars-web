import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { ConfirmProvider } from "material-ui-confirm";
import { SnackbarProvider } from "notistack";
import { FC } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "../styles/Calendar.css";
import "../styles/DatePicker.css";
import theme from "../theme";
import { AdminWebApp } from "./admin";
import { ClientWebApp } from "./client";

export const WebApp: FC = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={theme.themeClient}>
        <ConfirmProvider>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/home/*" element={<ClientWebApp />} />
              <Route path="/admin/*" element={<AdminWebApp />} />
            </Routes>
          </BrowserRouter>
        </ConfirmProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
};
