import { styled, TypographyProps } from "@mui/material";

export const PrimarySpan = styled("span")<TypographyProps>(
  ({ theme, fontWeight }) => ({
    color: theme.palette.primary.main,
    fontWeight: fontWeight as string,
  })
);
