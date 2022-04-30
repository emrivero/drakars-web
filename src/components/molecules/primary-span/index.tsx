import { styled, TypographyProps } from "@mui/material";

export const PrimarySpan = styled("span")<TypographyProps>(({ theme }) => ({
  color: theme.palette.primary.main,
}));
