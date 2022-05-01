import { styled, Typography, TypographyProps } from "@mui/material";

export interface CustomTypographyProps extends TypographyProps {
  type?: "roboto" | "open" | "acme" | "comic";
}

export const CustomTypography = styled(Typography)<CustomTypographyProps>(
  ({ theme, type = "roboto" }) => {
    const fontFamily: Record<CustomTypographyProps["type"], string> = {
      roboto: `"Roboto","Helvetica","Arial",sans-serif`,
      acme: `"Acme","Helvetica","Arial",sans-serif`,
      open: `"Open","Helvetica","Arial",sans-serif`,
      comic: `"Comic Neue","Helvetica","Arial",sans-serif`,
    };

    return {
      fontFamily: fontFamily[type],
    };
  }
);
