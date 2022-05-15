import { AuthClientEvent } from "@react-keycloak/core/lib/types";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import axios from "axios";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingPage } from "../../components/molecules/loading-page";
import keycloakCfg from "../../config/keycloak";
import { ClientClient } from "../../service/user/client/client";
import AdminHome from "./home";
import { ListOffices } from "./offices";
import { AddOffice } from "./offices/AddOffice";
import { GeneralStats } from "./statistics/general";
import { OfficesStats } from "./statistics/offices";
import { UserStats } from "./statistics/users";
import { VehiclesStats } from "./statistics/vehicles";
import { ListVehicles } from "./vehicles";
import { AddVehicle } from "./vehicles/AddVehicle";

const eventLogger = (event: AuthClientEvent, error: unknown) => {
  console.log("onKeycloakEvent", event, error);
};

const tokenLogger = (tokens: { token: string }) => {
  axios.defaults.headers.common.Authorization = `Bearer ${tokens?.token}`;
  if (tokens?.token) {
    new ClientClient().post("", {});
  }
};

export const AdminWebApp: FC = () => {
  return (
    <ReactKeycloakProvider
      authClient={keycloakCfg}
      initOptions={{
        onLoad: "login-required",
        flow: "standard",
        checkLoginIframe: false,
      }}
      onEvent={eventLogger}
      onTokens={tokenLogger}
      LoadingComponent={<LoadingPage />}
    >
      <Routes>
        <Route path="">
          <Route path="" element={<AdminHome />} />
          <Route path="offices">
            <Route path="" element={<ListOffices />} />
            <Route path="add" element={<AddOffice />} />
          </Route>
          <Route path="vehicles">
            <Route path="" element={<ListVehicles />} />
            <Route path="add" element={<AddVehicle />} />
          </Route>
          <Route path="users">
            <Route path="" element={<ListOffices />} />
            <Route path="add" element={<AddOffice />} />
          </Route>
          <Route path="statistics">
            <Route path="general" element={<GeneralStats />} />
            <Route path="users" element={<UserStats />} />
            <Route path="vehicles" element={<VehiclesStats />} />
            <Route path="offices" element={<OfficesStats />} />
          </Route>
          <Route path="*" element={<>not found admin</>}></Route>
        </Route>
      </Routes>
    </ReactKeycloakProvider>
  );
};
