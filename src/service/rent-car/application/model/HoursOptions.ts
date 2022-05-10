export const HoursOptions: { label: string; value: string }[] = Array.from(
  { length: 45 },
  (_, i) => {
    const hours = `${Math.floor(i / 4) + 7}`;
    const minutes = `${(i % 4) * 15}`;
    return {
      label: `${hours.length < 2 ? "0" + hours : hours}:${
        minutes.length < 2 ? minutes + "0" : minutes
      }`,
      value: `${hours.length < 2 ? "0" + hours : hours}:${
        minutes.length < 2 ? minutes + "0" : minutes
      }`,
    };
  }
);
