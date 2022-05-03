import { Box, Grid, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { PrimaryBox } from "../../molecules/primary-box";

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
    <Box
      sx={{
        borderTop: `2px solid ${theme.palette.secondary.main}`,
        position: "relative",
        mt: 4,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -25,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <PrimaryBox
          sx={{
            position: "relative",
            py: 1,
            px: 3,
            display: "block",
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" color={"white"}>
            {title}
          </Typography>
        </PrimaryBox>
      </Box>
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
    </Box>
  );
};
