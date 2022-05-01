import { Link, LinkProps } from "@mui/material";
import * as React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

export type MuiLinkType = RouterLinkProps & LinkProps;

export const MuiLink: React.FC<MuiLinkType> = ({ children, ...rest }) => {
  return (
    <Link component={RouterLink} {...rest}>
      {children}
    </Link>
  );
};
