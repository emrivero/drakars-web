import { styled } from "@mui/material";
import React from "react";

export const PrimaryIcon = (component: React.FunctionComponent) =>
  styled(component)(({ theme }) => ({
    color: theme.palette.primary.main,
  }));
