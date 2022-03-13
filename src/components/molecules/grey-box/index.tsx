import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const GreyBox = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.grey[700],
  color: "#fff",
}));
