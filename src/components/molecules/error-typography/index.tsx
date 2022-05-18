import { styled, Typography, TypographyProps } from "@mui/material";
import { FC } from "react";

const ErrorTypographyComponent = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    color: theme.palette.error.main,
  })
);

export const ErrorTypography: FC<TypographyProps> = (props) => {
  return (
    <ErrorTypographyComponent variant="caption" {...props}>
      {props.children}
    </ErrorTypographyComponent>
  );
};
