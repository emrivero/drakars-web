import { Error } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { CustomTypography } from "../../../molecules/custom-typography";

export const NotFoundTemplate: FC = () => {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center" flexDirection="column" mt={10}>
      <Box>
        <Error sx={{ fontSize: 64 }} color={"error"} />
      </Box>
      <CustomTypography type="comic" variant="h1">
        404
      </CustomTypography>
      <Typography
        color={theme.palette.error.main}
        variant="h4"
        fontWeight={600}
      >
        ¡Ups! Esta página no existe
      </Typography>
    </Box>
  );
};
