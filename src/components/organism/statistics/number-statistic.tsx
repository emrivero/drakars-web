import { Box, Typography, useTheme } from "@mui/material";
import { FC } from "react";

interface NumberStatisticProp {
  value: number;
  title: string;
}

export const NumberStatistic: FC<NumberStatisticProp> = ({ value, title }) => {
  const theme = useTheme();
  let formated = `${value}`;

  if (value > 999) {
    const digit = value / 1000;
    formated = `${digit.toFixed(2)}K`;
  }

  if (value > 999999) {
    const digit = value / 1000000;
    formated = `${digit.toFixed(2)}M`;
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.dark,
        color: "#fff",
        display: "inline-block",
        px: 4,
        py: 4,
      }}
    >
      <Typography variant="h5" align="center">
        {title}
      </Typography>
      <Typography variant="h3" align="center">
        {formated}
      </Typography>
    </Box>
  );
};
