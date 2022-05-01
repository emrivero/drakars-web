import { styled } from "@mui/material/styles";
import { MuiLink, MuiLinkType } from "../link";

export const WhiteLink = styled(MuiLink)<MuiLinkType>(() => ({
  color: "#fff",
  textDecoration: "none",
}));
