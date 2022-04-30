import { Box, BoxProps, styled } from "@mui/material";

export const PrimaryBox = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));
