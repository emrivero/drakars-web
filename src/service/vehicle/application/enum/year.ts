export const VehicleYearsOption: { label: string; value: number }[] =
  Array.from({ length: 20 }, (_, index) => ({
    label: `${2002 + index}`,
    value: 2002 + index,
  }));
