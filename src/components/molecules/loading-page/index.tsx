import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";

export const LoadingPage: FC = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
      }}
    >
      <CircularProgress size={64} />
    </Box>
  );
};
