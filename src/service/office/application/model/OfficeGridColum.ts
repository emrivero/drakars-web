import { TableGridColumn } from "../../../../components/organism/table-grid";

export interface OfficeGridRow {
  name: string;
  address: string;
  zipCode: string;
  municipality: string;
  city: string;
}

export const officeColumns: TableGridColumn[] = [
  {
    field: "name",
    label: "Nombre",
  },
  {
    field: "address",
    label: "Dirección",
  },
  {
    field: "zipCode",
    label: "Código postal",
  },
  {
    field: "municipality",
    label: "Municipio",
  },
  {
    field: "city",
    label: "Provincia",
  },
];
