export const MarkType = [
  "Alfa Romeo",
  "Audi",
  "BMW",
  "Citroën",
  "Dacia",
  "Daewoo",
  "Fiat",
  "Ford",
  "Honda",
  "Hyundai",
  "Kia",
  "Lexus",
  "Mercedes",
  "Nissan",
  "Opel",
  "Peugeot",
  "Renault",
  "Seat",
  "Skoda",
  "Toyota",
  "Volkswagen",
  "Volvo",
  "Mini",
  "Mitsubishi",
  "Ferrari",
  "Mazda",
];

export const MarkTypeOptions: { label: string; value: string }[] = MarkType.map(
  (v) => ({ label: v, value: v })
);
