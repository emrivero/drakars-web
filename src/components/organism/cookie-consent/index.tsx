import { Box, Button, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { NoHoverButton } from "./no-hover-button";

export const CookieConsent: FC = () => {
  return (
    <Box
      sx={{
        height: "5em",
        backgroundColor: "#000",
        opacity: 0.9,
        width: { sm: "100%" },
        position: "sticky",
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Grid container>
        <Grid item sm={10}>
          <Typography variant="h6" align="center" sx={{ color: "#fff" }}>
            Utilizamos cookies para mostrarte ofertas personalizadas, realizar
            análisis y mejorar tu experiencia en nuestro sitio.
          </Typography>
        </Grid>
        <Grid item sm={1}>
          <Button color="secondary">Rechazar</Button>
        </Grid>
        <Grid item sm={1}>
          <NoHoverButton variant="contained" color="secondary">
            Aceptar
          </NoHoverButton>
        </Grid>
      </Grid>
    </Box>
  );
};
