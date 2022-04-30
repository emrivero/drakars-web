import { Box, BoxProps, styled } from "@mui/material";

export const SecondaryBox = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));
