import { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Link from "../link";

export const WhiteLink = styled(Link)<BoxProps>(({ theme }) => ({
  color: "#fff",
  textDecoration: "none",
}));
