import { Button, ButtonProps, styled } from "@mui/material";

export const NoHoverButton = styled(Button)<ButtonProps>(
  ({ theme, color }) => ({
    "&:hover": {
      backgroundColor: theme.palette[color].main,
    },
  })
);
