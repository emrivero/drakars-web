import { Box, Grid, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { OfficeVm } from "../../../service/office/client/view/OfficeVm";
import { Upper } from "../../atoms/transforms/upper";
import { SectionHeader } from "../../molecules/section";

export interface OfficeSectionProps {
  title: string;
  offices?: OfficeVm[];
}

export const OfficeSection: FC<OfficeSectionProps> = ({
  title,
  offices = [],
}) => {
  const theme = useTheme();
  return (
    <SectionHeader title={title} color={theme.palette.secondary.main}>
      <Box sx={{ mb: 4, py: 4, px: 1 }}>
        <Grid container>
          {offices.map((office) => {
            return (
              <Grid
                item
                key={office.id}
                md={4}
                sm={6}
                xs={12}
                sx={{
                  my: 1,
                }}
              >
                <Box
                  sx={{
                    width: "95%",
                    backgroundColor: "#fafafa",
                    border: "1px solid #efefef",
                    px: 3,
                    py: 1,
                  }}
                >
                  <Typography>
                    <Upper>{office.title}</Upper>
                  </Typography>
                  <Typography>
                    {office.address}, {office.zipCode}
                  </Typography>
                  <Typography>Teléfono: {office.phone}</Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </SectionHeader>
  );
};
