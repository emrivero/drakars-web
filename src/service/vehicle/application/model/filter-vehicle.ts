export interface FilterVehicle {
  search: string;
  type: "" | "small" | "medium" | "large" | "premium";
  seats: "" | "2" | "4" | "5" | "6";
  fuel: "" | "fuel" | "diesel" | "electric";
  sort: "better" | "cheap" | "expensive";
  transmission: "" | "manual" | "automatic";
  "office.id": string;
}
