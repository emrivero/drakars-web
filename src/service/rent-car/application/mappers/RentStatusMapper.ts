export const RentStatusMapper = (value: string) => {
  const mapper = {
    pending: "Pendiente",
    checkedin: "Entregado",
    checkedout: "Devuelto",
    delayed: "Retrasado",
    canceled: "Cancelado",
  };

  const mapped = mapper[value];

  return mapped || "";
};
