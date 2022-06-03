import { TableGridColumn } from "../../../../components/organism/table-grid";

export interface VehicleGridRow {
  fullName: string;
  seats: string;
  type: string;
  doors: string;
  year: string;
  fuel: string;
  pricePerDay: string;
  office: string;
}

export const vehicleColumns: TableGridColumn[] = [
  {
    field: "id",
    label: "Identificador ",
  },
  {
    field: "fullName",
    label: "Modelo",
  },
  {
    field: "active",
    label: "Estado",
  },
  // {
  //   field: "type",
  //   label: "Categoría",
  // },

  // {
  //   field: "doors",
  //   label: "Nº de puertas",
  // },
  // {
  //   field: "year",
  //   label: "Año de fabricación",
  // },
  {
    field: "fuel",
    label: "Combustible",
  },
  {
    field: "pricePerDay",
    label: "Precio por día",
  },
  {
    field: "office",
    label: "Oficina",
  },
];
