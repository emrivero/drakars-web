import { styled, Typography, TypographyProps } from "@mui/material";

export const SecondaryTypography = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    color: theme.palette.secondary.main,
  })
);
