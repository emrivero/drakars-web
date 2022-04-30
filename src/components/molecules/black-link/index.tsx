import { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Link from "../link";

export const BlackLink = styled(Link)<BoxProps>(({ theme }) => ({
  color: "#000",
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));
