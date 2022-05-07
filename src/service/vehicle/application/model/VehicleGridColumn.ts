import { TableGridColumn } from "../../../../components/organism/table-grid";

export const vehicleColumns: TableGridColumn[] = [
  {
    field: "id",
    label: "ID ",
  },
  {
    field: "fullName",
    label: "Modelo",
  },
  {
    field: "address",
    label: "Dirección",
  },
  {
    field: "seats",
    label: "Nº de asientos",
  },
  {
    field: "type",
    label: "Categoría",
  },

  {
    field: "doors",
    label: "Nº de puertas",
  },
  {
    field: "year",
    label: "Año de fabricación",
  },
  {
    field: "fuel",
    label: "Combustible",
  },
  {
    field: "pricePerDay",
    label: "Precio por día",
  },
];
