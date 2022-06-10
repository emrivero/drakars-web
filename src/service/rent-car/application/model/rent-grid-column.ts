import { TableGridColumn } from "../../../../components/organism/table-grid";

export type RentGridRow = {
  originAddress: string;
  destinyAddress: string;
  status: string;
  fullNameVehicle: string;
  fullNameUser: string;
  email: string;
  dni: string;
  reference: string;
};

export const rentColumns: TableGridColumn[] = [
  {
    field: "fullNameUser",
    label: "Cliente",
  },
  {
    field: "email",
    label: "Email",
  },
  {
    field: "fullNameVehicle",
    label: "Vehículo",
  },

  {
    field: "startDate",
    label: "Inicio del alquiler",
  },
  {
    field: "endDate",
    label: "Fin del alquiler",
  },
  {
    field: "status",
    label: "Estado",
  },
];
