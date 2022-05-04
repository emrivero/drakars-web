import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { PrimaryBox } from "../primary-box";

export interface SectionHeaderProps {
  title: string;
  color: string;
}

export const SectionHeader: FC<SectionHeaderProps> = ({
  children,
  title,
  color,
}) => {
  return (
    <Box
      sx={{
        borderTop: `2px solid ${color}`,
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
      {children}
    </Box>
  );
};
