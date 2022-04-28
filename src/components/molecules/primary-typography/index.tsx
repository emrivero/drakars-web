import { styled, Typography, TypographyProps } from "@mui/material";

export const PrimaryTypography = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    color: theme.palette.primary.main,
  })
);
