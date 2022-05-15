import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AuthClientEvent } from "@react-keycloak/core/lib/types";
import axios from "axios";
import { ConfirmProvider } from "material-ui-confirm";
import { SnackbarProvider } from "notistack";
import { FC } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ClientClient } from "../service/user/client/client";
import "../styles/Calendar.css";
import "../styles/DatePicker.css";
import theme from "../theme";
import { AdminWebApp } from "./admin";
import { ClientWebApp } from "./client";

const eventLogger = (event: AuthClientEvent, error: unknown) => {
  console.log("onKeycloakEvent", event, error);
};

const tokenLogger = (tokens: { token: string }) => {
  axios.defaults.headers.common.Authorization = `Bearer ${tokens?.token}`;
  if (tokens?.token) {
    new ClientClient().post("", {});
  }
};
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
