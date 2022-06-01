import { AuthClientEvent } from "@react-keycloak/core/lib/types";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import axios from "axios";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingPage } from "../../components/molecules/loading-page";
import keycloakCfg from "../../config/keycloak-admin";
import AdminHome from "./home";
import { ListOffices } from "./offices";
import { AddOffice } from "./offices/AddOffice";
import { Rents } from "./rents";
import { CreateRent } from "./rents/AddRent";
import { RentManage } from "./rents/ManageRent";
import { AdminUsers } from "./users/admins";
import { ClientUsers } from "./users/clients";
import { EditorUsers } from "./users/editors";
import { ListVehicles } from "./vehicles";
import { AddVehicle } from "./vehicles/AddVehicle";
import { EditVehicle } from "./vehicles/EditVehicle";

const eventLogger = (event: AuthClientEvent, error: unknown) => {
  console.log("onKeycloakEvent", event, error);
};

const tokenLogger = (tokens: { token: string }) => {
  axios.defaults.headers.common.Authorization = `Bearer ${tokens?.token}`;
  // KeyStore.adminApiKey = `Bearer ${tokens?.token}`;
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
          <Route path="rents">
            <Route path="" element={<Rents />} />
            <Route path="manage" element={<RentManage />} />
            <Route path="add" element={<CreateRent />} />
          </Route>
          <Route path="vehicles">
            <Route path="" element={<ListVehicles />} />
            <Route path="add" element={<AddVehicle />} />
            <Route path="edit" element={<EditVehicle />} />
          </Route>
          <Route path="user">
            <Route path="admins" element={<AdminUsers />} />
            <Route path="editors" element={<EditorUsers />} />
            <Route path="clients" element={<ClientUsers />} />
          </Route>
          <Route path="*" element={<>not found admin</>}></Route>
        </Route>
      </Routes>
    </ReactKeycloakProvider>
  );
};
