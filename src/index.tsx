import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AuthClientEvent } from "@react-keycloak/core/lib/types";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import axios from "axios";
import ReactDOM from "react-dom";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import keycloak from "./config/keycloak";
import AboutUs from "./pages/about/about-us";
import Covid19 from "./pages/about/covid19";
import Faq from "./pages/about/faq";
import AdminHome from "./pages/admin";
import Home from "./pages/home";
import { AditionalServices } from "./pages/rent/aditional-services";
import { Confirm } from "./pages/rent/confirm";
import { LocationDate } from "./pages/rent/location-date";
import { SearchCar } from "./pages/rent/search-car";
import { ManageBooking } from "./pages/services/manage-booking";
import { Offices } from "./pages/services/offices";
import { RentCar } from "./pages/services/rent-car";
import theme from "./theme";

const eventLogger = (event: AuthClientEvent, error: unknown) => {
  console.log("onKeycloakEvent", event, error);
};

const tokenLogger = (tokens: { token: string }) => {
  axios.defaults.headers.common.Authorization = `Bearer ${tokens?.token}`;
  if (tokens?.token) {
    // createUser();
  }
};

ReactDOM.render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={{
      onLoad: "check-sso",
      flow: "standard",
      checkLoginIframe: false,
    }}
    onEvent={eventLogger}
    onTokens={tokenLogger}
  >
    <ThemeProvider theme={theme.themeClient}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services">
            <Route path="offices" element={<Offices />} />
            <Route path="rent-car" element={<RentCar />} />
            <Route path="manage-booking" element={<ManageBooking />} />
          </Route>
          <Route path="/rent">
            <Route path="search-car" element={<SearchCar />} />
            <Route path="location-date" element={<LocationDate />} />
            <Route path="confirm" element={<Confirm />} />
            <Route path="aditional-services" element={<AditionalServices />} />
          </Route>

          <Route path="/admin" element={<AdminHome />} />
          <Route path="/about">
            <Route path="about-us" element={<AboutUs />} />
            <Route path="covid19" element={<Covid19 />} />
            <Route path="faq" element={<Faq />} />
          </Route>
          <Route path="/vehicles"></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </ReactKeycloakProvider>,
  document.querySelector("#root")
);
