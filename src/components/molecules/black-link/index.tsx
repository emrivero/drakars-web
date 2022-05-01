import { styled } from "@mui/material/styles";
import { MuiLink, MuiLinkType } from "../link";

export const BlackLink = styled(MuiLink)<MuiLinkType>(({ theme }) => ({
  color: "#000",
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));
