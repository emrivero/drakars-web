import { AuthClientEvent } from "@react-keycloak/core/lib/types";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import axios from "axios";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingPage } from "../../components/molecules/loading-page";
import keycloakCfg from "../../config/keycloak";
import { ClientClient } from "../../service/user/client/client";
import { NotFoundPage } from "./404";
import AboutUs from "./about/about-us";
import Covid19 from "./about/covid19";
import Faq from "./about/faq";
import Home from "./home";
import { AditionalServices } from "./rent/aditional-services";
import { Confirm } from "./rent/confirm";
import { LocationDate } from "./rent/location-date";
import { SearchCar } from "./rent/search-car";
import { RentSuccess } from "./rent/success";
import { EditBooking } from "./services/edit-booking";
import { ManageBooking } from "./services/manage-booking";
import { Offices } from "./services/offices";
import { RentCar } from "./services/rent-car";

const eventLogger = (event: AuthClientEvent, error: unknown) => {
  console.log("onKeycloakEvent", event, error);
};

const tokenLogger = (tokens: { token: string }) => {
  axios.defaults.headers.common.Authorization = `Bearer ${tokens?.token}`;
  if (tokens?.token) {
    new ClientClient().post("", {});
  }
};

export const ClientWebApp: FC = () => {
  return (
    <ReactKeycloakProvider
      authClient={keycloakCfg}
      initOptions={{
        onLoad: "check-sso",
        flow: "standard",
        checkLoginIframe: false,
      }}
      onEvent={eventLogger}
      onTokens={tokenLogger}
      LoadingComponent={<LoadingPage />}
    >
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/services">
          <Route path="offices" element={<Offices />} />
          <Route path="rent-car" element={<RentCar />} />
          <Route path="manage-booking" element={<ManageBooking />} />
          <Route path="edit-booking" element={<EditBooking />} />
        </Route>
        <Route path="/rent">
          <Route path="search-car" element={<SearchCar />} />
          <Route path="location-date" element={<LocationDate />} />
          <Route path="confirm" element={<Confirm />} />
          <Route path="aditional-services" element={<AditionalServices />} />
          <Route path="success" element={<RentSuccess />} />
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>

        <Route path="/about">
          <Route path="about-us" element={<AboutUs />} />
          <Route path="covid19" element={<Covid19 />} />
          <Route path="faq" element={<Faq />} />
        </Route>
        <Route path="/vehicles"></Route>
      </Routes>
    </ReactKeycloakProvider>
  );
};
