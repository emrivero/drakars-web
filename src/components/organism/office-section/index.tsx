import { Box, Grid, useTheme } from "@mui/material";
import { FC } from "react";
import { SectionHeader } from "../../molecules/section";

export interface OfficeSectionProps {
  title: string;
  offices?: string[];
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
                key={office}
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
                  {office}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </SectionHeader>
  );
};
