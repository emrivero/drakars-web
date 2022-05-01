import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { PrimaryTypography } from "../primary-typography";

export interface FaqItemProps {
  title: string;
}
export const FaqItem: FC<FaqItemProps> = ({ title, children }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <PrimaryTypography variant="h5">{title}</PrimaryTypography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{children}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
