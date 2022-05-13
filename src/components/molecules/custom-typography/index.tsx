import { styled, Theme, Typography, TypographyProps } from "@mui/material";
export interface CustomTypographyProps extends TypographyProps {
  type?: "roboto" | "open" | "acme" | "comic";
  customColor?: (theme: Theme) => string;
}

export const CustomTypography = styled(Typography)<CustomTypographyProps>(
  ({ type = "roboto", customColor = () => "#000", theme }) => {
    const fontFamily: Record<CustomTypographyProps["type"], string> = {
      roboto: `"Roboto","Helvetica","Arial",sans-serif`,
      acme: `"Acme","Helvetica","Arial",sans-serif`,
      open: `"Open","Helvetica","Arial",sans-serif`,
      comic: `"Comic Neue","Helvetica","Arial",sans-serif`,
    };

    return {
      fontFamily: fontFamily[type],
      color: customColor(theme),
    };
  }
);
